from flask import Flask, render_template, request
from decimal import *
getcontext().prec = 2
app = Flask(__name__)
from forex_python.converter import CurrencyRates


# Do I need @app.route to use this at index.html?

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/convertpage')
def convert_currency():
    """Handle GET requests like /search?term=fun"""
    c = CurrencyRates()
    
    starting_currency = request.args["currency1"]
    ending_currency = request.args["currency2"]
    currency_amount = request.args["amount-input"]
    results = c.convert(starting_currency,ending_currency, Decimal(currency_amount))
    results = "{:.2f}".format(Decimal(results))
    print (results)
    return f"<h1>Current Currency is {starting_currency}, desired currency is {ending_currency} and currency amount is {currency_amount}</h1><h1> Converted amount is {results}</h1>"
