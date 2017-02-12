import json
from flask import Flask
from flask_cors import CORS, cross_origin
from PIL import Image
import os
from os.path import isfile, join

app = Flask(__name__)
CORS(app)

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
    path = 'imgs/Packages/'
    group_list = {}
    print(os.listdir(path))
    for group in os.listdir(path):
        if (group[0] != '.'):
            img_list = [img for img in os.listdir(path + group + "/") if img[0] != '.']
            group_list[group] = img_list
    return json.dumps(group_list)


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

if __name__ == "__main__":
    app.run()

