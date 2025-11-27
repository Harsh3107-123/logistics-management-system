class config():
    DEBUG=False
    SQLALCHEMY_TRACK_MODIFICATION=True
    
class local_development_config(config):
    DEBUG=True
    SQLALCHEMY_DATABASE_URI="sqlite:///logistics.db"
    
    
    SECRET_KEY="this is a secret key" #THIS IS USED FOR HASHING USER CREDENTIALS IN THE SESSION 
    SECURITY_PASSWORD_HASH="bcrypt" #This specifies the mechanism/algorithm used for hashing user passwords before storing them in the database . This prevents even developers from seeing plain text passwords
    SECURITY_PASSWORD_SALT="THIS IS A SALT ADDED IN THE PASSWORD" #It's "very similar to a secret key" in that it's a random value, but its specific role is to help in hashing the password by adding complexity and uniqueness to each password hash.

# Here's why it's important:

# Even if two users have the same password, adding a unique salt to each password before hashing will result in completely different hashes.
# This protects against attacks like "rainbow table" lookups, where pre-computed hashes are used to find passwords.
    
    WTF_CSRF_ENABLED=False
    SECURITY_TOKEN_AUTHENTICATION_HEADER="Authentication Token"