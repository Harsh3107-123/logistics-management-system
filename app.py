from flask import Flask
from application.database import db
from application.models import user,role
from application.resources import api
from application.config import local_development_config
from flask_security import Security,SQLAlchemyUserDatastore
from werkzeug.security import generate_password_hash

def create_app():
    app=Flask(__name__)
    app.config.from_object(local_development_config)
    db.init_app(app)
    api.init_app(app)
    datastore=SQLAlchemyUserDatastore(db,user,role)
    app.security=Security(app,datastore)
    app.app_context().push()
    return app

app=create_app()

with app.app_context():
    db.create_all()
    
    app.security.datastore.find_or_create_role(name="admin",description="Administrator")
    app.security.datastore.find_or_create_role(name="user",description="General user")
    db.session.commit()
    
    if not app.security.datastore.find_user(email="user@admin.com"):
        app.security.datastore.create_user(email="user@admin.com",
                                           username="admin01",
                                           password=generate_password_hash("1234"),
                                           roles=["admin"])
        
    if not app.security.datastore.find_user(email="user@user.com"):
        app.security.datastore.create_user(email="user@user.com",
                                           username="user01",
                                           password=generate_password_hash("1234"),
                                           roles=["user"]
                                           )
    db.session.commit()
from application.routes import *
if __name__=="__main__":
    app.run()