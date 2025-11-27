from .database import db
from flask_security import UserMixin,RoleMixin

class user(db.Model,UserMixin):
    #These are the attribute which are neccessary for flask security
    id=db.Column(db.Integer,primary_key=True)
    email=db.Column(db.String,unique=True,nullable=False)
    password=db.Column(db.String,nullable=False)
    fs_uniquifier=db.Column(db.String,unique=True,nullable=False)
    active=db.Column(db.Boolean,default="True",nullable=False)
    #extra attribute in general to the user
    #UserRoles-------->user_roles(default behaviour of flasksqlalchemy)
    roles=db.relationship("role",backref="users",secondary="userroles")
    
class role(db.Model,RoleMixin):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String,nullable=False,Unique=True)
    description=db.Column(db.String)
    
class userroles(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    #Roles----->roles(default behaviour of flask sql alchemy)
    user_id=db.Column(db.Integer,db.ForeignKey("user.id"),nullable=False)
    role_id=db.Column(db.Integer,db.ForeignKey("role.id"),nullable=False)
    
