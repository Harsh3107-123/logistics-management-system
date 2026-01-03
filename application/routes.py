from flask import current_app as app,jsonify,request,render_template
from .models import transaction
from application.database import db
from flask_security import auth_required,roles_required,current_user,login_user
from werkzeug.security import check_password_hash,generate_password_hash


#This is our entry point for vue app
@app.route("/")
def home():
    return render_template("index.html")

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

@app.route("/api/login",methods=["POST"])
def user_login():
    body=request.get_json()
    email=body["email"]
    password=body["password"]
    if not email:
        return jsonify({
            "message":"Email is required"
        }),400#bad request
        
    user=app.security.datastore.find_user(email=email)
    if user:
        if check_password_hash(user.password,password):
            # if current_user:
            #     return jsonify({
            #         "message":"Already logged in"
            #     }),400
            login_user(user)
            return jsonify({
                "id":user.id,
                "username":user.username,
                "auth-token":user.get_auth_token()
            })
        else:
            return jsonify({
                "message":"Incorrect password"
            }),400# bad request
    else:
        return jsonify({
            "message":"User not found"
        })
            
#405 means method not allowed
@app.route("/api/register",methods=["POST"])
def create_user():
    credentials=request.get_json()
    if not app.security.datastore.find_user(email=credentials["email"]):
        app.security.datastore.create_user(email=credentials["email"],
                                           username=credentials["username"],
                                           password=generate_password_hash(credentials["password"]),
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
    
@app.route("/api/pay/<int:trans_id>")
@auth_required("token")
@roles_required("user")
def payment(trans_id):
    trans=transaction.query.get(trans_id)
    trans.internal_status="paid"
    db.session.commit()
    return jsonify({
        "message":"payment successfull"
    }),200

@app.route("/api/delivery/<int:trans_id>",methods=["POST"])
@auth_required("token")
@roles_required("user")
def delivery(trans_id):
    trans=transaction.query.get(trans_id)
    data=request.get_json()
    trans.delivery_status=data["delivery_status"]
    db.session.commmit()
    return jsonify({
        "message":"delivery status updated"
    }),200
    
@app.route("/api/review/<int:trans_id>",methods=["POST"])
@auth_required("token")
@roles_required("admin")
def review(trans_id):
    body=request.get_json()
    trans=transaction.query.get(trans_id)
    trans.delivery=body["delivery"]
    trans.amount=body["amount"]
    trans.internal_status="pending"
    db.session.commit()
    return {
        "message":"transaction reviewed!"
    },200
