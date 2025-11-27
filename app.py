from flask import Flask
from application.database import db
from application.models import User,Role
from application.config import local_development_config
from flask_security import Security,SQLAlchemyUserDatastore

def create_app():
    app=Flask(__name__)
    app.config.from_object(local_development_config)
    db.init_app(app)
    datastore=SQLAlchemyUserDatastore(db,User,Role)
    app.security=Security(app,datastore)
    app.app_context().push()
    return app

app=create_app()

if __name__=="__main__":
    app.run()