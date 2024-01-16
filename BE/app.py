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

import users_routes, project_routes