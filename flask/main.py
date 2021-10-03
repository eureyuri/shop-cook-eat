from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import firebase_admin
from firebase_admin import credentials, firestore
import uuid

# Initialize Firestore DB
cred = credentials.Certificate("shop-eat-cook-firebase-adminsdk-ue0eu-57919a5ee7.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
shelf_ref = db.collection('shelf')

app = Flask(__name__)

# https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/", methods=["GET"])
@cross_origin()
def index():
    try:
        shelf = [doc.to_dict() for doc in shelf_ref.stream()]
        return jsonify(shelf)
    except Exception as e:
        return f"An Error Occurred: {e}"


# https://cloud.google.com/community/tutorials/building-flask-api-with-cloud-firestore-and-deploying-to-cloud-run
@app.route("/create", methods=["POST"])
@cross_origin()
def create():
    try:
        title = request.json["title"]
        _id = str(uuid.uuid4())

        shelf_ref.document(_id).set({
            u'id': _id,
            u'title': title,
            u'archive': False
        })
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return f"An Error Occurred: {e}"


@app.route("/update", methods=["POST", "PUT"])
@cross_origin()
def update():
    try:
        _id = request.json['id']
        shelf_ref.document(_id).update({
            u'title': request.json['title']
        })
        return jsonify({"success": True})
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route("/archive", methods=["POST", "PUT"])
@cross_origin()
def archive():
    try:
        _id = request.json['id']
        shelf_ref.document(_id).update({
            u'archive': True
        })
        return jsonify({"success": True})
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/delete', methods=['POST', 'DELETE'])
@cross_origin()
def delete():
    try:
        _id = request.json['id']
        shelf_ref.document(_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


app.run(host='localhost', port=5000)
