from .database import db
from flask_security import UserMixin,RoleMixin

#These Usermixin and Rolemixn are tiny helper classes which allow is_authenticated,has_role functionality
class user(db.Model,UserMixin):
    #These are the attribute which are neccessary for flask security
    id=db.Column(db.Integer,primary_key=True)
    email=db.Column(db.String,unique=True,nullable=False)
    password=db.Column(db.String,nullable=False)
    fs_uniquifier=db.Column(db.String,unique=True,nullable=False) #for session/ token management 
    active=db.Column(db.Boolean,default="True",nullable=False)# to control the access of the user
    roles=db.relationship("role",backref="users",secondary="userroles")
    username=db.Column(db.String,unique=True,nullable=False)
    transactions=db.relationship("transaction",backref="user")
    #extra attribute in general to the user (can be added)
    #UserRoles(table)-------->user_roles(default behaviour of flasksqlalchemy)
    
class role(db.Model,RoleMixin):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String,nullable=False)
    description=db.Column(db.String)
    
class userroles(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    #Roles----->roles(default behaviour of flask sql alchemy)
    user_id=db.Column(db.Integer,db.ForeignKey("user.id"),nullable=False)
    role_id=db.Column(db.Integer,db.ForeignKey("role.id"),nullable=False)
    
class city(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String,nullable=False)
    
class transaction(db.Model):
    id=id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String,nullable=False)
    type=db.Column(db.String,nullable=False )
    date=db.Column(db.String,nullable=False)
    delivery=db.Column(db.String,nullable=False,default="to be updated")
    source=db.Column(db.String,nullable=False)
    destination=db.Column(db.String,nullable=False)
    internal_status=db.Column(db.String,nullable=False,default="requested")
    delivery_status=db.Column(db.String,nullable=False,default="to be updated")
    description=db.Column(db.String,nullable=False)
    amount=db.Column(db.Integer,default=1000)
    user_id=db.Column(db.Integer,db.ForeignKey("user.id"))
    