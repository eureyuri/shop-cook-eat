import firebase_admin
from firebase_admin import credentials, firestore
import json

cred = credentials.Certificate("../shop-eat-cook-firebase-adminsdk-ue0eu-57919a5ee7.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
food_ref = db.collection('food_data')

f = open('foodkeeper.json')
data = json.load(f)

# p = data['sheets'][2]['data'][10]
# print(len(data['sheets'][2]['data']))


def get_detail(_item, index, detail):
    try:
        return _item[index][detail]
    except IndexError:
        return None

# print(data['sheets'][2]['data'][0])


for item in data['sheets'][2]['data']:
    try:
        _id = str(get_detail(item, 0, 'ID'))
        name = get_detail(item, 2, 'Name')

        pantry_min = get_detail(item, 5, 'Pantry_Min')
        pantry_max = get_detail(item, 6, 'Pantry_Max')
        pantry_metric = get_detail(item, 7, 'Pantry_Metric')
        pantry_min_dop = get_detail(item, 9, 'DOP_Pantry_Min')
        pantry_max_dop = get_detail(item, 10, 'DOP_Pantry_Max')
        pantry_metric_dop = get_detail(item, 11, 'DOP_Pantry_Metric')

        fridge_min = get_detail(item, 16, 'Refrigerate_Min')
        fridge_max = get_detail(item, 17, 'Refrigerate_Max')
        fridge_metric = get_detail(item, 18, 'Refrigerate_Metric')
        fridge_min_dop = get_detail(item, 20, 'DOP_Refrigerate_Min')
        fridge_max_dop = get_detail(item, 21, 'DOP_Refrigerate_Max')
        fridge_metric_dop = get_detail(item, 22, 'DOP_Refrigerate_Metric')

        freezer_min = get_detail(item, 30, 'Freeze_Min')
        freezer_max = get_detail(item, 31, 'Freeze_Max')
        freezer_metric = get_detail(item, 32, 'Freeze_Metric')
        freezer_min_dop = get_detail(item, 34, 'DOP_Freeze_Min')
        freezer_max_dop = get_detail(item, 35, 'DOP_Freeze_Max')
        freezer_metric_dop = get_detail(item, 36, 'DOP_Freeze_Metric')

        food_ref.document(_id).set({
            # u'id': _id,
            u'name': name,
            u'pantry_min': pantry_min,
            u'pantry_max': pantry_max,
            u'pantry_metric': pantry_metric,
            u'pantry_min_dop': pantry_min_dop,
            u'pantry_max_dop': pantry_max_dop,
            u'pantry_metric_dop': pantry_metric_dop,
            u'fridge_min': fridge_min,
            u'fridge_max': fridge_max,
            u'fridge_metric': fridge_metric,
            u'fridge_min_dop': fridge_min_dop,
            u'fridge_max_dop': fridge_max_dop,
            u'fridge_metric_dop': fridge_metric_dop,
            u'freezer_min': freezer_min,
            u'freezer_max': freezer_max,
            u'freezer_metric': freezer_metric,
            u'freezer_min_dop': freezer_min_dop,
            u'freezer_max_dop': freezer_max_dop,
            u'freezer_metric_dop': freezer_metric_dop,
        })

    except Exception as e:
        print(f"An Error Occurred: {e}")
