from ..Models import User, UserData, User_Data
from marshmallow import ValidationError
from ..database import db, bcrypt
from flask import jsonify, abort


class UserController:
    def create_user(self, user_data=None):
        email = user_data.get('email')
        if User.query.filter_by(email=email).first() is None:
            first_name = user_data.get('first_name')
            last_name = user_data.get('last_name')
            password = user_data.get('password')

            hash_password = bcrypt.generate_password_hash(password)
            try:
                UserData().load(user_data)
            except ValidationError:
                abort(400, description="Invalid Group")
            #if password != password2:
            #    return jsonify(message="Something went wrong", status=404)
            new_user = User(email, first_name, last_name, hash_password)
            db.session.add(new_user)
            db.session.commit()
            # jsonify(message="The user was created", status=200)
            print(new_user.id)
            # return str(new_user.id)
            return {"id": new_user.id}
        else:
            # return jsonify(message="User with this email exist", status=404)
            abort(400, description="User with this email exist")

    def login(self, request_data=None):
        email = request_data.get('email')
        password = request_data.get('password')
        if email and password:
            user = User.query.filter_by(email=email).first()
            #if bcrypt.check_password_hash(user.password, password):
            #    return jsonify(message="The user logged in", status=200)
            #else:
            #    abort(400, description="Something went wrong")
                # return jsonify(message="Something went wrong", status=404)
            if user is None:
                abort(404, description="User not found")
            if not bcrypt.check_password_hash(user.password, password):
                abort(401, description="Password is wrong")
            else:
                # return jsonify(message="The user logged in", status=200)
                return {"id": user.id}

    def update_user(self, user_data=None, user_id=None):
        updated_user = User.query.get(user_id)
        if User.query.filter_by(id=user_id).first() is None:
            abort(404, description="User not found")
        updated_user.email = user_data.get('email')
        updated_user.first_name = user_data.get('first_name')
        updated_user.last_name = user_data.get('last_name')
        updated_password = user_data.get('password')
        try:
            UserData().load(user_data)
        except ValidationError:
            abort(400, description="Invalid Group")
        updated_user.password = bcrypt.generate_password_hash(updated_password)
        db.session.commit()
        return jsonify(message="The user was edited", status=200)

    def show_user(self, user_id=None):
        showed_user = User.query.get(user_id)
        if User.query.filter_by(id=user_id).first() is None:
            abort(404, description="User not found")
        return jsonify(User_Data().dump(showed_user))

    def delete_user(self, user_id=None):
        deleted_user = User.query.get(user_id)
        if User.query.filter_by(id=user_id).first() is None:
            abort(404, description="User not found")
        db.session.delete(deleted_user)
        db.session.commit()
        return jsonify(message="The user was deleted", status=200)
