from app import app
from app import db, Project # , Task

from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from os import environ

@app.route('/api/flask/projects', methods=['POST']) # Create a new Project
def create_project():
    try:
        data = request.get_json() # Get data from request
        new_project = Project(name = data['name'], description = data['description']) # Create new project using Project model
        db.session.add(new_project) # Add new project using SQLAlchemy
        db.session.commit() # Commit this session

        return jsonify({ # Return the new obj itself to handle ID
            'id' : new_project.id,
            'name' : new_project.name,
            'description' : new_project.description
        }), 201 # HTTP Code
    except Exception as e:
        return make_response(jsonify({'message' : 'Error creating new Project : ', 'error' : str(e)}), 500)
    
@app.route('/api/flask/projects', methods=['GET']) # Get all Projects
def get_projects():
    try:
        projects = Project.query.all() # Get all Projects from table
        projects_data = [{ 'id' : project.id, 'name' : project.name, 'description' : project.description } for project in projects]
        return jsonify(projects_data), 200
    except Exception as e:
        return make_response(jsonify({'message' : 'Error getting all Projects : ', 'error' : str(e)}), 500)
    







# @app.route('/api/flask/projects/<id>', methods=['GET']) # Get all Projects
# def get_project(id):
#     try:
#         project = Project.query.filter_by(id = id).first() # Get Project by its ID
#         if project:
#             return make_response(jsonify({'project' : project.json()}), 200)
#         return make_response(jsonify({'message' : 'Project not found!'}), 404)
#     except Exception as e:
#         return make_response(jsonify({'message' : 'Error creating new Project : ', 'error' : str(e)}), 500)

# @app.route('/api/flask/projects/<id>', methods=['PUT']) # Get all Projects
# def update_project(id):
#     try:
#         project = Project.query.filter_by(id = id).first() # Get Project by its ID
#         if project:
#             data = request.get_json()
#             project.name = data['name']
#             project.email = data['email']
#             project.job = data['job']
#             db.session.commit()
#             return make_response(jsonify({'message' : 'Project updated!'}), 200)
#         return make_response(jsonify({'message' : 'Project not found!'}), 404)
#     except Exception as e:
#         return make_response(jsonify({'message' : 'Error creating new Project : ', 'error' : str(e)}), 500)

# @app.route('/api/flask/projects/<id>', methods=['DELETE']) # Get all Projects
# def delete_project(id):
#     try:
#         project = Project.query.filter_by(id = id).first() # Get Project by its ID
#         if project:
#             db.session.delete(project)
#             db.session.commit()
#             return make_response(jsonify({'message' : 'Project deleted!'}), 200)
#         return make_response(jsonify({'message' : 'Project not found!'}), 404)
#     except Exception as e:
#         return make_response(jsonify({'message' : 'Error creating new Project : ', 'error' : str(e)}), 500)