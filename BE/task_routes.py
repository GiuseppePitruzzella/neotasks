# task / | id | name | type = { todo, progress, done } | id_project | 

from app import app
from app import db, Task # , Task

from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from os import environ

@app.route('/api/flask/tasks', methods=['POST']) # Create a new Task
def create_task():
    try:
        data = request.get_json() # Get data from request
        new_task = Task(name = data['name'], description = data['description'], type = data['type'], id_project = data['id_project']) # Create new task using Task model
        db.session.add(new_task) # Add new task using SQLAlchemy
        db.session.commit() # Commit this session

        return jsonify({ # Return the new obj itself to handle ID
            'id' : new_task.id,
            'name' : new_task.name,
            'description' : new_task.description,
            'type' : new_task.type,
            'id_project' : new_task.id_project
        }), 201 # HTTP Code
    except Exception as e:
        return make_response(jsonify({'message' : 'Error creating new Task : ', 'error' : str(e)}), 500)
    
@app.route('/api/flask/tasks', methods=['GET']) # Get all Tasks
def get_tasks():
    try:
        tasks = Task.query.all() # Get all Tasks from table
        tasks_data = [{ 'id' : task.id, 'name' : task.name, 'description' : task.description, 'type' : task.type, 'id_project' : task.id_project } for task in tasks]
        return jsonify(tasks_data), 200
    except Exception as e:
        return make_response(jsonify({'message' : 'Error getting all Tasks : ', 'error' : str(e)}), 500)

@app.route('/api/flask/tasks/<id>', methods=['GET']) # Get all Tasks
def get_task(id):
    try:
        task = Task.query.filter_by(id = id).first() # Get Task by its ID
        if task:
            return make_response(jsonify({'task' : task.json()}), 200)
        return make_response(jsonify({'message' : 'Task not found!'}), 404)
    except Exception as e:
        return make_response(jsonify({'message' : 'Error creating new Task : ', 'error' : str(e)}), 500)

@app.route('/api/flask/tasks/<id>', methods=['PUT']) # Get all Tasks
def update_task(id):
    try:
        task = Task.query.filter_by(id = id).first() # Get Task by its ID
        if task:
            data = request.get_json()
            task.name = data['name']
            task.description = data['description']
            task.type = data['type']
            task.id_project = data['id_project']
            db.session.commit()
            return make_response(jsonify({'message' : 'Task updated!'}), 200)
        return make_response(jsonify({'message' : 'Task not found!'}), 404)
    except Exception as e:
        return make_response(jsonify({'message' : 'Error creating new Task : ', 'error' : str(e)}), 500)

@app.route('/api/flask/tasks/<id>', methods=['DELETE']) # Get all Tasks
def delete_task(id):
    try:
        task = Task.query.filter_by(id = id).first() # Get Task by its ID
        if task:
            db.session.delete(task)
            db.session.commit()
            return make_response(jsonify({'message' : 'Task deleted!'}), 200)
        return make_response(jsonify({'message' : 'Task not found!'}), 404)
    except Exception as e:
        return make_response(jsonify({'message' : 'Error creating new Task : ', 'error' : str(e)}), 500)