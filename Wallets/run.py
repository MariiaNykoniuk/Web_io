import base64
from functools import wraps

from flask import Flask, request, abort, jsonify, Response, render_template
from flask_bcrypt import check_password_hash
from flask_cors import CORS
from marshmallow import ValidationError
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask_login import logout_user
from .database import db, bcrypt
from flask_httpauth import HTTPBasicAuth
from .Models import User, UserData
from .Controllers.UserController import UserController
from .Controllers.WalletController import WalletController
from .Controllers.TransactionController import TransactionController

app = Flask(__name__)
CORS(app)
auth = HTTPBasicAuth()
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
manager = Manager(app)
migrate = Migrate(app, db)
manager.add_command('db', MigrateCommand)
db.init_app(app)
bcrypt.init_app(app)


@app.errorhandler(404)
def http_404_handler(error):
    return jsonify(error=str(error)), 404

@app.errorhandler(401)
def http_401_handler(error):
    return jsonify(error=str(error)), 401

@app.errorhandler(400)
def http_400_handler(error):
    return jsonify(error=str(error)), 400


@app.errorhandler(405)
def http_405_handler(error):
    return jsonify(error=str(error)), 405


@auth.verify_password
def verify_password(email, password):

    user = User.query.filter_by(email=email).first()
    if user is None:
        abort(404, description="User not found")
    if not bcrypt.check_password_hash(user.password, password):
        abort(401, description="Password is wrong")
        # return jsonify(message="The user logged in", status=200)
    return True


# http://localhost:5000/api/v1/hello-world-17
@app.route("/api/v1/hello-world-17")
def hello_world():
    return "Hello World 17 (^_^)"


# http://127.0.0.1:5000/user?email=ex1@ex.com&first_name=ex1&last_name=ex1&password=ex1
@app.route("/user", methods=['POST'])
def create_user():
    user_data = request.args
    return UserController().create_user(user_data)


# http://127.0.0.1:5000/login
@app.route("/login", methods=['GET'])
# @auth.login_required
def login_user():
    user_data = request.args
    return UserController().login(user_data)
    #return jsonify(message="The user was login", status=200)


# http://127.0.0.1:5000/user/logout
@app.route("/user/logout", methods=['GET'])
@auth.login_required()
def logout_user():
    return jsonify(message="You are logout", status=200)


# http://127.0.0.1:5000/user?email=ex1@ex.com&first_name=ex1&last_name=ex1&password=ex1
@app.route("/user", methods=['PUT'])
@auth.login_required()
def update_user():
    curr_user = auth.current_user()
    user = User.query.filter_by(email=curr_user).first()
    user_data = request.args
    return UserController().update_user(user_data, user.id)


# http://127.0.0.1:5000/user/1
# ???????????????????????
@app.route("/user/<id>", methods=['GET'])
#@auth.login_required
def show_user(id):
    # curr_user = auth.current_user()
    user = User.query.filter_by(id=id).first()
    return UserController().show_user(user.id)


# http://127.0.0.1:5000/user
@app.route("/user", methods=['DELETE'])
@auth.login_required
def delete_user():
    curr_user = auth.current_user()
    user = User.query.filter_by(email=curr_user).first()
    return UserController().delete_user(user.id)


# http://127.0.0.1:5000/wallet?name=ex1&owner_id=1&funds=10
@app.route("/wallet", methods=['POST'])
# @auth.login_required
def create_wallet():
    wallet_data = request.args
    return WalletController().create_wallet(wallet_data)


# http://127.0.0.1:5000/wallet/1
'''@app.route("/wallets/list", methods=['GET'])
@auth.login_required()
def list_of_wallets():
    #user = format(auth.current_user())
    #id = User(user).id
    return WalletController().show_list_of_wallets(auth.current_user())'''


@app.route("/wallets/list", methods=['GET'])
@auth.login_required()
def list_of_wallets():
    curr_user = auth.current_user()
    user = User.query.filter_by(email=curr_user).first()
    return WalletController().show_list_of_wallets(user.id)


# http://127.0.0.1:5000/wallet/1
@app.route("/wallet/<int:wallet_id>", methods=['GET'])
@auth.login_required
def show_wallet(wallet_id):
    curr_user = auth.current_user()
    user = User.query.filter_by(email=curr_user).first()
    return WalletController().show_wallet(wallet_id, user.id)


# http://127.0.0.1:5000/wallet/1
@app.route("/wallet/<int:wallet_id>", methods=['PUT'])
@auth.login_required
def update_wallet(wallet_id):
    wallet_data = request.args
    curr_user = auth.current_user()
    user = User.query.filter_by(email=curr_user).first()
    return WalletController().update_wallet(wallet_data, wallet_id, user.id)


# http://127.0.0.1:5000/wallet/1
@app.route("/wallet/<int:wallet_id>", methods=['DELETE'])
@auth.login_required
def deleted_wallet(wallet_id):
    curr_user = auth.current_user()
    user = User.query.filter_by(email=curr_user).first()
    return WalletController().delete_wallet(wallet_id, user.id)


# ---------------TRANSACTIONS--------------------

# http://127.0.0.1:5000/transaction/3?to_wallet=1&amount=20
@app.route("/transaction/<int:wallet_id>", methods=['POST'])
@auth.login_required
def create_transaction(wallet_id):
    curr_user = auth.current_user()
    user = User.query.filter_by(email=curr_user).first()
    transaction_data = request.args
    return TransactionController().create_transaction(transaction_data, wallet_id, user.id)


# http://127.0.0.1:5000/transaction/3
@app.route("/transaction/<int:wallet_id>", methods=['GET'])
@auth.login_required
def show_transactions(wallet_id):
    curr_user = auth.current_user()
    user = User.query.filter_by(email=curr_user).first()
    return TransactionController().show_transactions(wallet_id, user.id)


if __name__ == '__main__':
    app.run()

# server = WSGIServer(('127.0.0.1', 5000), app)
# server.serve_forever()
