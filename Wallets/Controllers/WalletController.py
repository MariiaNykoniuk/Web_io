from ..Models import Wallet, User, WalletData, WalletToUpdate, wallets_schema
from ..database import db
from marshmallow import ValidationError
from flask import jsonify, abort


class WalletController:
    def create_wallet(self, wallet_data=None):
        name = wallet_data.get('name')
        owner_id = wallet_data.get('owner_id')
        funds = wallet_data.get('funds')
        if User.query.filter_by(id=owner_id).first() is None:
            abort(404, description="User not found")
        try:
            WalletData().load(wallet_data)
        except ValidationError:
            abort(400, description="Invalid Group")
        new_wallet = Wallet(name, owner_id, funds)
        db.session.add(new_wallet)
        db.session.commit()
        return jsonify(message="The wallet was created", status=200)

    def show_list_of_wallets(self, user_id):
        if User.query.filter_by(id=user_id).first() is None:
            abort(404, description="User not found")
        wallets = Wallet.query.filter_by(owner_id=user_id).all()
        result = wallets_schema.dump(wallets)
        return wallets_schema.jsonify(result)

    def update_wallet(self, wallet_data=None, wallet_id=None, user_id=None):
        updated_wallet = Wallet.query.get(wallet_id)
        if Wallet.query.filter_by(id=wallet_id).first() is None:
            abort(404, description="Wallet not found")
        owner = User.query.get(updated_wallet.owner_id)
        if owner.id != user_id:
            abort(404, description="You are not the owner of this wallet")
        updated_wallet.name = wallet_data.get('name')
        try:
            WalletToUpdate().load(wallet_data)
        except ValidationError:
            abort(400, description="Invalid Group")
        db.session.commit()
        return jsonify(message="The wallet was edited", status=200)

    def show_wallet(self, wallet_id=None, user_id=None):
        showed_wallet = Wallet.query.get(wallet_id)
        if Wallet.query.filter_by(id=wallet_id).first() is None:
            abort(404, description="Wallet not found")
        owner = User.query.get(showed_wallet.owner_id)
        if owner.id != user_id:
            abort(404, description="You are not the owner of this wallet")
        else:
            return jsonify(WalletData().dump(showed_wallet))

    def delete_wallet(self, wallet_id=None, user_id=None):
        deleted_wallet = Wallet.query.get(wallet_id)
        if Wallet.query.filter_by(id=wallet_id).first() is None:
            abort(404, description="Wallet not found")
        owner = User.query.get(deleted_wallet.owner_id)
        if owner.id != user_id:
            abort(404, description="You are not the owner of this wallet")
        db.session.delete(deleted_wallet)
        db.session.commit()
        return jsonify(message="The wallet was deleted", status=200)
