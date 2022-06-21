from flask import Flask, jsonify, request
import json
from flask_expects_json import expects_json
import boto3
import os

table_name = os.getenv('TODOTABLE_NAME')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(table_name)

app = Flask(__name__)

schema = {
    'type': 'object',
    'properties': {
        'id': {'type': 'number'},
        'title': {'type': 'string'},
        'done': {'type': 'string'}
    },
    'required': ['id', 'title', 'done']
}


@app.route('/')
def hello_world():
    return jsonify({'message': 'Hello, again'})


@app.route('/ishealthy')
def receive_health_check():
    return "Health check succeed\n"


@app.route('/createtodo', methods=["POST", "OPTIONS"])
@expects_json(schema, force=False)
def create_todo():
    if request.method == 'OPTIONS':
        return "Endpoint Hit: createTodo method = OPTIONS\n"
    elif request.method == 'POST':
        params = request.get_json()
        item = {
            'TodoId': params['id'],
            'title': params['title'],
            'done': params['done']
        }
        table.put_item(Item=item)
        return "Endpoint Hit: createTodo and POST method and parameters is valid\n"


def convert_from_response(item):
    todo = {
        'id': int(item['TodoId']),
        'title': item['title'],
        'done': item['done']
    }
    return todo


@app.route('/alltodo')
def get_alltodo():
    response = table.scan()
    items = response['Items']
    items = list(map(convert_from_response, items))
    items = json.dumps(items)
    return items


@app.route('/updatetodo/<path:todoid>', methods=['POST', 'OPTIONS'])
def update_todo(todoid):
    if request.method == 'OPTIONS':
        return "Endpoint Hit: createTodo method = OPTIONS\n"
    elif request.method == 'POST':
        params = request.get_json()
        table.update_item(
            Key={'TodoId': todoid},
            UpdateExpression="SET title=:title, done=:done",
            ExpressionAttributeValues={
                ":title": params['title'],
                ":done": params['done']
            }
        )
        return "Updated todo\n"


@app.route('/deletetodo/<path:todoid>')
def delete_todo(todoid):
    table.delete_item(
        Key={'TodoId': int(todoid)}
    )
    return "Deleted todo\n"


@app.route('/createtable')
def create_table():
    return "createtable called (nothing to do)\n"


@app.route('/deletetable')
def delete_table():
    return "deletetable called (nothing to do)\n"


if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=10000)
