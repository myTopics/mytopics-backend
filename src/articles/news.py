import os
import json
from azure.cognitiveservices.language.textanalytics import TextAnalyticsClient
from msrest.authentication import CognitiveServicesCredentials

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
    if not document[0].has_key('language'):
        detect_language(text_analytics, document)

    response = text_analytics.entities(documents=document)
    tags = []
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
    if not document[0].has_key('language'):
        detect_language(text_analytics, document)

    response = text_analytics.sentiment(documents=document)
    document[0]['sentiment score'] = response.documents[0].score
    

def main(document):
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
    get_tags(text_analytics, document)
    get_sentiment(text_analytics, document)
    del document[0]['text']
    print json.dumps(document)

if __name__ == "__main__":
    os.environ["TEXT_ANALYTICS_SUBSCRIPTION_KEY"] = '70cc9edd41284fbeae3d022a83353937'
    os.environ["TEXT_ANALYTICS_ENDPOINT"] = 'https://ilana.cognitiveservices.azure.com/'
    document = [
        {
            'id': '1',
            "text": "Microsoft was founded by Bill Gates and Paul Allen on April 4, 1975, to develop and sell BASIC interpreters for the Altair 8800."        }
    ]
    main(document)