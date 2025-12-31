# what is flask_restful:It is extenssion of flask library which provides resources to create restful api
from flask_restful import Api,Resource,reqparse
from .models import *
from flask_security import auth_required,roles_required,roles_accepted,current_user

#Api it is a wrapper CREATES API INSTANCE
api=Api()

#reqparse is used in handling request body
#Used to read and validate input sent by the client (JSON, form data, etc.)
parser=reqparse.RequestParser()

parser.add_argument("name")
parser.add_argument("type")
parser.add_argument("date")
parser.add_argument("source")
parser.add_argument("destination")
parser.add_argument("description")

'''Each add_argument():

Declares an expected field

Tells the API: “I am expecting this key from the client”

These fields are optional by default'''

def roles_list(roles):
    role_list=[]
    for role in roles:
        role_list.append(role.name)
    return role_list

# Serialization: Converting an object into a transmittable format like JSON.

# Deserialization: Converting transmitted data back into an object.

# Resource base class  that has inbuilt methods to create an Api endpoints
class TransApi(Resource):
    @auth_required("token")
    @roles_accepted("admin", "user")
    def get(self):
        Transactions=[]
        trans_json=[]
        if "admin" in  roles_list(current_user.roles):
            Transactions=transaction.query.all()
        else:
            Transactions=current_user.transactions
            
        for Transaction in Transactions:
            this_trans={}
            this_trans["id"]=Transaction.id
            this_trans["name"]=Transaction.name
            this_trans["type"]=Transaction.type
            this_trans["date"]=Transaction.date
            this_trans["delivery"]=Transaction.delivery
            this_trans["source"]=Transaction.source
            this_trans["destination"]=Transaction.destination
            this_trans["internal_status"]=Transaction.internal_status
            this_trans["delivery_status"]=Transaction.delivery_status
            this_trans["description"]=Transaction.description
            this_trans["amount"]=Transaction.amount
            this_trans["user_id"]=current_user.id
            trans_json.append(this_trans)
            
        if trans_json:
            return trans_json,200 
        
        return{
                "message":"There are no transaction"
            },404
        
    @auth_required("token")
    @roles_required("user")
    def post(self):
        # data reading happens here
        args=parser.parse_args()
        try:
            Transaction=transaction(name=args["name"],
                                    type=args["type"],
                                    date=args["date"],
                                    source=args["source"],
                                    destination=args["destination"],
                                    description=args["description"],
                                    user_id=current_user.id
                                    )
            db.session.add(Transaction)
            db.session.commit()
            return {
                "message":"transaction created successfully"
            }
        except:
            return{
                "message":"One or more fields are missing"
            },400                   
api.add_resource(TransApi,"/api/get","/api/create")