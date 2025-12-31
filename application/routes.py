from flask import current_app as app,jsonify,request
from application.database import db
from flask_security import hash_password,auth_required,roles_required,current_user

@app.route("/api/admin")
@auth_required("token")
@roles_required("admin")
def admin_home():
    return jsonify({
        "name":"Admin",
        "message":"Admin has logged in successfully"
    })
    
@app.route("/api/user")
@auth_required("token")
@roles_required("user")
# @roles_required("user","admin") #works as and means both user and admin are required
# @roles_accepted("user","admin") #works as the or means either he should be admin or user
def user_home():
    user=current_user
    return jsonify({
        "name":user.username,
        "email":user.email,
        "password":user.password
        })
    
#405 means method not allowed
@app.route("/api/register",methods=["POST"])
def create_user():
    credentials=request.get_json()
    if not app.security.datastore.find_user(email=credentials["email"]):
        app.security.datastore.create_user(email=credentials["email"],
                                           username=credentials["username"],
                                           password=hash_password(credentials["password"]),
                                           roles=["user"])
        db.session.commit()
        # new entity is created
        return jsonify({
            "message":"User Created Successfully"
        }),201
    #bad request
    return jsonify({
        "message":"User already exists"
    }), 400