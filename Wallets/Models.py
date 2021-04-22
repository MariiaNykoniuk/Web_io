from .database import db, ma
from marshmallow import validate, fields


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    password = db.Column(db.String)

    # wallet = db.relationship('Wallet', backref='wallet', lazy='dynamic')

    def __init__(self, email=None, first_name=None, last_name=None, password=None):
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.password = password


class Wallet(db.Model):
    __tablename__ = 'wallet'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    funds = db.Column(db.Integer, nullable=True)
    # trans_from = db.relationship('Transaction', backref='transaction', lazy='dynamic')
    # trans_to = db.relationship('Transaction', backref='transaction', lazy='dynamic')

    trans_from = db.relationship('User', backref='from_user')
    trans_to = db.relationship('User', backref='to_user')

    def __init__(self, name=None, owner_id=None, funds=None, trans_from=None, trans_to=None):
        self.name = name
        self.owner_id = owner_id
        self.funds = funds


class Transaction(db.Model):
    __tablename__ = 'transaction'
    id = db.Column(db.Integer, primary_key=True)
    from_wallet = db.Column(db.Integer, db.ForeignKey('wallet.id'), nullable=True)
    to_wallet = db.Column(db.Integer, db.ForeignKey('wallet.id'), nullable=True)
    amount = db.Column(db.Integer, nullable=True)
    datetime = db.Column(db.DateTime, nullable=True)

    def __init__(self, from_wallet=None, to_wallet=None, amount=None, datetime=None):
        self.from_wallet = from_wallet
        self.to_wallet = to_wallet
        self.amount = amount
        self.datetime = datetime


class UserData(ma.Schema):
    email = fields.String(required=True, validate=validate.Email(), unique=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    password = fields.String(required=True)


class User_Data(ma.Schema):
    id = fields.Integer(required=True, unique=True)
    email = fields.String(required=True, validate=validate.Email(), unique=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)


class WalletData(ma.Schema):
    id = fields.Integer()
    name = fields.String(required=True)
    owner_id = fields.Integer(required=True)
    funds = fields.Integer(required=True)


class WalletToUpdate(ma.Schema):
    name = fields.String()


class TransactionData(ma.Schema):
    from_wallet = fields.Integer(required=True)
    to_wallet = fields.Integer(required=True)
    amount = fields.Integer(required=True)


class FundsToSend(ma.Schema):
    to_wallet = fields.Integer(required=True)
    amount = fields.Integer(required=True)


transactions_schema = TransactionData(many=True)
wallets_schema = WalletData(many=True)
