from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import environ

app = Flask(__name__)
CORS(app) # Enable CORS for all routes
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL') # It's in compose.yml
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    job = db.Column(db.String(120), unique=True, nullable=False)

    def json(self):
        return { 'id' : self.id, 'name' : self.name, 'email' : self.email, 'job' : self.job }

class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(240), unique=True, nullable=False)

    def json(self):
        return { 'id' : self.id, 'name' : self.name, 'description' : self.description }
    
class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    type = db.Column(db.Integer, unique=False, nullable=False)
    id_project = db.Column(db.Integer, db.ForeignKey('projects.id'))

    def json(self):
        return { 'id' : self.id, 'name' : self.name, 'type' : self.email, 'id_project' : self.id_project }

db.create_all()

# Create a test route
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message' : 'Server is running!'})

@app.route('/api/flask/users', methods=['POST']) # Create a new User
def create_user():
    try:
        data = request.get_json() # Get data from request
        new_user = User(name = data['name'], email = data['email'], job = data['job']) # Create new user using User model
        db.session.add(new_user) # Add new user using SQLAlchemy
        db.session.commit() # Commit this session

        return jsonify({ # Return the new obj itself to handle ID
            'id' : new_user.id,
            'name' : new_user.name,
            'email' : new_user.email,
            'job' : new_user.job
        }), 201 # HTTP Code
    except Exception as e:
        return make_response(jsonify({'message' : 'Error creating new User : ', 'error' : str(e)}), 500)
    
@app.route('/api/flask/users', methods=['GET']) # Get all Users
def get_users():
    try:
        users = User.query.all() # Get all Users from table
        users_data = [{ 'id' : user.id, 'name' : user.name, 'email' : user.email, 'job' : user.job } for user in users]
        return jsonify(users_data), 200
    except Exception as e:
        return make_response(jsonify({'message' : 'Error getting all Users : ', 'error' : str(e)}), 500)
    
@app.route('/api/flask/users/<id>', methods=['GET']) # Get all Users
def get_user(id):
    try:
        user = User.query.filter_by(id = id).first() # Get User by its ID
        if user:
            return make_response(jsonify({'user' : user.json()}), 200)
        return make_response(jsonify({'message' : 'User not found!'}), 404)
    except Exception as e:
        return make_response(jsonify({'message' : 'Error creating new User : ', 'error' : str(e)}), 500)

@app.route('/api/flask/users/<id>', methods=['PUT']) # Get all Users
def update_user(id):
    try:
        user = User.query.filter_by(id = id).first() # Get User by its ID
        if user:
            data = request.get_json()
            user.name = data['name']
            user.email = data['email']
            user.job = data['job']
            db.session.commit()
            return make_response(jsonify({'message' : 'User updated!'}), 200)
        return make_response(jsonify({'message' : 'User not found!'}), 404)
    except Exception as e:
        return make_response(jsonify({'message' : 'Error creating new User : ', 'error' : str(e)}), 500)

@app.route('/api/flask/users/<id>', methods=['DELETE']) # Get all Users
def delete_user(id):
    try:
        user = User.query.filter_by(id = id).first() # Get User by its ID
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response(jsonify({'message' : 'User deleted!'}), 200)
        return make_response(jsonify({'message' : 'User not found!'}), 404)
    except Exception as e:
        return make_response(jsonify({'message' : 'Error creating new User : ', 'error' : str(e)}), 500)
    
# @app.route('/api/flask/projects', methods=['POST']) # Create a new User
# def create_project():
#     try:
#         data = request.get_json() # Get data from request
#         new_user = User(name = data['name'], email = data['email'], job = data['job']) # Create new user using User model
#         db.session.add(new_user) # Add new user using SQLAlchemy
#         db.session.commit() # Commit this session

#         return jsonify({ # Return the new obj itself to handle ID
#             'id' : new_user.id,
#             'name' : new_user.name,
#             'email' : new_user.email,
#             'job' : new_user.job
#         }), 201 # HTTP Code
#     except Exception as e:
#         return make_response(jsonify({'message' : 'Error creating new User : ', 'error' : str(e)}), 500)