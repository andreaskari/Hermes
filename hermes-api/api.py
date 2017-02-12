import json
import pickle
import random
from flask import Flask, request
from flask_cors import CORS, cross_origin
from PIL import Image
import os
from os.path import isfile, join, dirname

# import json
# from os.path import join, dirname
from watson_developer_cloud import SpeechToTextV1

app = Flask(__name__)
CORS(app)

def save_obj(state):
    with open('state.pkl', 'wb') as f:
        pickle.dump(state, f, pickle.HIGHEST_PROTOCOL)

def load_obj():
    with open('state.pkl', 'rb') as f:
        return pickle.load(f)

def reset_state():
    state = {
        "devices": [
            {"name": "3D Printer", "status": "Currently Printing", "data": [100.0]},
            {"name": "Refrigerator", "status": "On", "data": []},
            {"name": "Coffee Machine", "status": "Producing Coffee", "data": [2]},
        ],
        "shoppingcart": [],
        "addedFilament": False,
    }
    save_obj(state)


reset_state()
# exit()

@app.route("/")
def home():
    return '''
    <h1>API</h1>
    <ul>
        <li>
            /
                - Home & current location.
        </li>
        <li>
            /getAllInfo/
                - Returns all info about the system, devices, shopping cart.
        </li>
        <li>
            /getAudioTranslation/
                - Returns the most recent translation of audio.
        </li>
        <li>
            /postAudio/
                - Returns the image pixel data that corresponds to the group and image name passed in.
        </li>
    </ul>
    '''

@app.route("/getAllInfo/")
def get_all_info():
    state = load_obj()
    data = state["devices"][0]["data"]
    print(data)
    print(len(data)-1)
    last_point = data[len(data)-1]
    if last_point < 80.0 and not state["addedFilament"]:
        state["addedFilament"] = True
        state["shoppingcart"].append({"name": "Red 3D Printing Filament", "quantity": 2, "price": "$79.98"})
    state["devices"][0]["data"] = data + [last_point - random.random() * 2.0]
    save_obj(state)
    return json.dumps(state)


@app.route('/getAudioTranslation/')
def get_audio_translation():
    img = Image.open('imgs/Packages/' + group + "/" + image, 'r')
    pixel_list = list(img.getdata())
    # print(pixel_list)
    width, height = img.size
    pixel_matrix = []
    for y in range(height):
        pixel_matrix.append(pixel_list[y * width : (y+1) * width])
    print("height {} should be {}".format(height, len(pixel_matrix)))
    print("width {} should be {}".format(width, len(pixel_matrix[0])))
    # print(pixel_matrix)

    pixels_dict = {"width": width, "height": height, "matrix": pixel_matrix}
    return json.dumps(pixels_dict)

@app.route('/postAudio/', methods=['GET', 'POST'])
def post_audio():
    content = request.get_json(silent=True)
    print(content)
    
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

    with open(join(dirname(__file__), '/Users/andreaskarinam/Desktop/response.wav'), 'rb') as audio_file:
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

    state = load_obj()
    data = state["devices"][0]["data"]
    state["shoppingcart"] = []
    save_obj(state)
    return json.dumps(state)

    return json.dumps({"response": 200})

if __name__ == "__main__":
    app.run()

