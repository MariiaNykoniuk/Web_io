from ..Models import Wallet, Transaction, FundsToSend, transactions_schema, User
from ..database import db
from marshmallow import ValidationError
from flask import jsonify, abort
import datetime


class TransactionController(object):
    def create_transaction(self, transaction_data=None, from_wallet_id=None, user_id=None):
        from_wallet = from_wallet_id
        to_wallet = transaction_data.get('to_wallet')
        amount = transaction_data.get('amount')
        if Wallet.query.filter_by(id=from_wallet_id).first() is None:
            abort(404, description="Owner's wallet not found")
        transaction = Wallet.query.get(from_wallet_id)
        owner = User.query.get(transaction.owner_id)
        if owner.id != user_id:
            abort(404, description="You are not the owner of this wallet")
        if Wallet.query.filter_by(id=to_wallet).first() is None:
            abort(404, description="Recipient's wallet not found")
        try:
            FundsToSend().load(transaction_data)
        except ValidationError:
            abort(400, description="Invalid Group")
        new_transaction = Transaction(from_wallet, to_wallet, amount, datetime.datetime.now())
        db.session.add(new_transaction)
        db.session.commit()
        return jsonify(message="The transaction was created", status=200)

    def show_transactions(self, wallet_id=None, user_id=None):
        if Wallet.query.filter_by(id=wallet_id).first() is None:
            abort(404, description="Wallet not found")
        transaction = Wallet.query.get(wallet_id)
        owner = User.query.get(transaction.owner_id)
        if owner.id != user_id:
            abort(404, description="You are not the owner of this wallet")
        transactions = Transaction.query.filter_by(from_wallet=wallet_id).all()
        result = transactions_schema.dump(transactions)
        return transactions_schema.jsonify(result)
