import datetime

from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS, cross_origin

import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firestore DB
cred = credentials.Certificate("shop-eat-cook-firebase-adminsdk-ue0eu-57919a5ee7.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
shopping_list_ref = db.collection('shopping_list')
fridge_list_ref = db.collection('fridge_list')
food_data_ref = db.collection('food_data')

app = Flask(__name__)

# https://stackoverflow.com/questions/25594893/how-to-enable-cors-in-flask
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/", methods=["GET"])
@cross_origin()
def index():
    return redirect(url_for('show_shopping'))


@app.route("/shopping", methods=["GET"])
@cross_origin()
def show_shopping():
    try:
        shopping_list = [doc.to_dict() for doc in shopping_list_ref.stream()]
        return jsonify(shopping_list)
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route("/fridge", methods=["GET"])
@cross_origin()
def show_fridge():
    try:
        fridge_list = [doc.to_dict() for doc in fridge_list_ref.stream()]
        return jsonify(fridge_list)
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route("/add_shopping", methods=["POST"])
@cross_origin()
def add_shopping():
    try:
        name = request.json["name"]
        quantity = request.json["quantity"]
        unit = request.json["unit"]

        shopping_list_ref.add({
            u'name': name,
            u'quantity': quantity,
            u'unit': unit
        })
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return f"An Error Occurred: {e}"


@app.route("/finish_shopping", methods=["POST"])
@cross_origin()
def finish_shopping():
    try:
        ids = request.json["ids"]
        for _id in ids:
            # Get details of item associated with id
            details = shopping_list_ref.document(_id).get().to_dict()
            details['expire'] = get_expire(details['name'], datetime.datetime.strptime(datetime.date.today(), "%m/%d/%y"))

            # Add item to fridge
            fridge_list_ref.add(details)

            # delete from shopping
            shopping_list_ref.document(_id).delete()

        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return f"An Error Occurred: {e}"


def get_time_delta(num, unit):
    if unit == 'Days':
        return datetime.timedelta(days=num)
    elif unit == 'Weeks':
        return datetime.timedelta(days=num*7)
    elif unit == 'Months':
        # TODO: should check relative delta
        # https://stackoverflow.com/questions/546321/how-do-i-calculate-the-date-six-months-from-the-current-date-using-the-datetime
        return datetime.timedelta(days=num * 7 * 4)


# TODO: add logic
def get_expire(name, bought_date):
    item = food_data_ref.where(u'name', u'==', name).stream()
    expire_date = None

    for i in item:
        data = i.to_dict()
        break

    try:
        if data['fridge_max']:
            expire_date = bought_date + get_time_delta(data['fridge_max'], data['fridge_metric'])
        elif data['fridge_max_dop']:
            expire_date = bought_date + get_time_delta(data['fridge_max_dop'], data['fridge_metric_dop'])
        elif data['freezer_max']:
            expire_date = bought_date + get_time_delta(data['freezer_max'], data['freezer_metric'])
        elif data['freezer_max_dop']:
            expire_date = bought_date + get_time_delta(data['freezer_max_dop'], data['freezer_metric_dop'])
        elif data['pantry_max']:
            expire_date = bought_date + get_time_delta(data['pantry_max'], data['pantry_metric'])
        elif data['pantry_max_dop']:
            expire_date = bought_date + get_time_delta(data['pantry_max_dop'], data['pantry_metric_dop'])
    except Exception as e:
        print(e, '-- metric is not valid')
        return None

    if expire_date is None:
        return None

    return expire_date


@app.route("/add_fridge", methods=["POST"])
@cross_origin()
def add_fridge():
    try:
        name = request.json["name"]
        quantity = request.json["quantity"]
        unit = request.json["unit"]

        expire = request.json["expire_date"]
        if expire is None:
            bought_date = request.json["bought_date"]
            bought_date = datetime.datetime.strptime(bought_date, "%m/%d/%y")
            expire = get_expire(name, bought_date)

        fridge_list_ref.add({
            u'name': name,
            u'quantity': quantity,
            u'unit': unit,
            u'expire': expire
        })
        return jsonify({"success": True})
    except Exception as e:
        print(e)
        return f"An Error Occurred: {e}"


@app.route("/edit_shopping", methods=["POST"])
@cross_origin()
def edit_shopping():
    try:
        _id = request.json['id']
        shopping_list_ref.document(_id).update({
            u'name': request.json['name'],
            u'quantity': request.json['quantity'],
            u'unit': request.json['unit'],
        })
        return jsonify({"success": True})
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route("/edit_fridge", methods=["POST"])
@cross_origin()
def edit_fridge():
    try:
        _id = request.json['id']
        fridge_list_ref.document(_id).update({
            u'name': request.json['name'],
            u'quantity': request.json['quantity'],
            u'unit': request.json['unit'],
            u'expire': request.json['expire']
        })
        return jsonify({"success": True})
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/delete_shopping', methods=['POST', 'DELETE'])
@cross_origin()
def delete_shopping():
    try:
        _id = request.json['id']
        shopping_list_ref.document(_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/delete_fridge', methods=['POST', 'DELETE'])
@cross_origin()
def delete_fridge():
    try:
        _id = request.json['id']
        fridge_list_ref.document(_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


app.run(host='localhost', port=5000)
