import os
import json
from azure.cognitiveservices.language.textanalytics import TextAnalyticsClient
from msrest.authentication import CognitiveServicesCredentials
import sys

def get_weighted_data(article_id, json_article, tags_list, max_tags=None):
    tags = dict()
    for word in json_article.split():
        if word in tags_list:
            if word in tags:
                tags[word] +=1
            else:
                tags[word] = 1

    sorted_tags =  sorted(tags.items(), key=lambda x: x[1], reverse=True)
    sorted_tags = [list(elem) for elem in sorted_tags]
    if max_tags is not None:
        sorted_tags = sorted_tags[:max_tags]
    return json.dumps({'id': article_id, 'tags': sorted_tags})

def detect_language(text_analytics, document):
    response = text_analytics.detect_language(documents=document)
    lan = response.documents[0].detected_languages[0].name
    if lan in u'English':
        document[0]['language'] = 'en'
    
def get_tags(text_analytics, document):
    if 0 in document and not document[0].has_key('language'):
        detect_language(text_analytics, document)

    response = text_analytics.entities(documents=document)
    tags = []
    if 0 in response.documents:
        for entity in response.documents[0].entities:
            tag = dict()
            tag['NAME'] = entity.name
            tag['Type'] = entity.type
            if tag['Type'] == u'DateTime' or tag['Type'] == u'Other':
                continue

            tag['Sub-type'] = entity.sub_type
            matches = []
            for match in entity.matches:
                match_dict = dict()
                match_dict['Offset'] = match.offset
                match_dict['Length'] = match.length
                match_dict['Score'] = match.entity_type_score
                matches.append(match_dict)
            tags.append(tag)
        document[0]['tags'] = tags

def get_sentiment(text_analytics, document):
    if 0 in document and not document[0].has_key('language'):
        detect_language(text_analytics, document)

    response = text_analytics.sentiment(documents=document)
    document[0]['sentiment score'] = response.documents[0].score
    

def main(documents):
    key_var_name = 'TEXT_ANALYTICS_SUBSCRIPTION_KEY'
    if not key_var_name in os.environ:
        raise Exception('Please set/export the environment variable: {}'.format(key_var_name))
    subscription_key = os.environ[key_var_name]

    endpoint_var_name = 'TEXT_ANALYTICS_ENDPOINT'
    if not endpoint_var_name in os.environ:
        raise Exception('Please set/export the environment variable: {}'.format(endpoint_var_name))
    endpoint = os.environ[endpoint_var_name]

    credentials = CognitiveServicesCredentials(subscription_key)
    text_analytics = TextAnalyticsClient(endpoint=endpoint, credentials=credentials)
    get_tags(text_analytics, documents)
    get_sentiment(text_analytics, documents)
    
    print(json.dumps(document))
    sys.stdout.flush()

if __name__ == "__main__":
    os.environ["TEXT_ANALYTICS_SUBSCRIPTION_KEY"] = '70cc9edd41284fbeae3d022a83353937'
    os.environ["TEXT_ANALYTICS_ENDPOINT"] = 'https://ilana.cognitiveservices.azure.com/'
    if len(sys.argv) < 2:
        print("article json is missing")
    # document = json.loads('[{"id":"1626045727","author":"Tovah Lazaroff","source":"https://www.jpost.com/Arab-Israeli-Conflict/IDF-disperses-Palestinian-protest-againt-Israeli-annexation-plans-603221","summary":"At one point during the demonstration, some of the activists went up to the roof and stood on the edge, waving Palestinian flags.","title":"IDF disperses Palestinian protest against Israeli annexation plans","image":"https://images.jpost.com/image/upload/f_auto,fl_lossy/t_Article2016_ControlFaceDetect/446180","date":"2019-09-28T22:26:00.000Z","text":"The IDF on Saturday dispersed a Palestinian protest against Israeli plans to annex the Jordan Valley and the Megilot region of the Dead Sea.\\r\\nvar cont = `Join Jerusalem Post Premium Plus now for just $5 and upgrade your experience with an ads-free website and… [+123 chars]","tags":null,"decisions":null,"sentiment":null}]')
    else:
        document = json.loads(sys.argv[1])
    main(document)