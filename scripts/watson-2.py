import json
from os.path import join, dirname
from watson_developer_cloud import SpeechToTextV1


objectList = ['refrigerator', 'printer', 'coffee']
commandList = ['status', 'buy', 'purchase', 'order', 'add', 'cart']

wordsList = []
jsonWords = []
finalList = []
sentence = ""
speech_to_text = SpeechToTextV1(
    username='e4343ecb-674a-4078-86ae-93c6d4ca8794',
    password='UtIVwPnZR3qv',
    x_watson_learning_opt_out=False
)

print(json.dumps(speech_to_text.models(), indent=2))

print(json.dumps(speech_to_text.get_model('en-US_BroadbandModel'), indent=2))

with open(join(dirname(__file__), '/Users/Attari/Desktop/Hermes/test.wav'), 'rb') as audio_file:
    text_dict = speech_to_text.recognize(
        audio_file, content_type='audio/wav', timestamps=True,
        word_confidence=True)
    wordsList = text_dict['results'][0]['alternatives'][0]['word_confidence']
    for lists in wordsList:
        jsonWords.append(lists[0])

print(jsonWords)
for word in jsonWords:
    if(word in commandList):
        print(word)

for word in jsonWords:
    if(word in objectList):
        print(word)