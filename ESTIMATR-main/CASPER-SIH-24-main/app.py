import requests
import json
import pandas as pd
from flask import jsonify
import jwt
import datetime
from flask_cors import CORS
from bs4 import BeautifulSoup
from flask import Flask, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, logout_user, login_required, UserMixin, current_user
from flask_bcrypt import Bcrypt
import serpapi
from flask import make_response
from functools import wraps
import os
from dotenv import load_dotenv
load_dotenv()



search_term = []
search_category =[]
app = Flask(__name__)
CORS(app, supports_credentials=True,origins=["http://localhost:5173"])
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///user_information.sqlite?timeout=5"
app.config["SECRET_KEY"] = "Enter your secret key"


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


class Users(UserMixin, db.Model):
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(250), unique=True, nullable=False)
        password_hash = db.Column(db.String(250), nullable=False)

with app.app_context():
        db.create_all()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token')
        if not token:
            return jsonify({'message': 'Unauthorized'}), 401
        try:
            jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
        return f(*args, **kwargs)
    return decorated

products_list = []

def SearchAndResponse(search_term):
    global soup
    flat_terms = [item for sublist in search_term for item in sublist] if isinstance(search_term[0], list) else search_term
    search_query = " ".join(flat_terms)
    search_url = f"https://www.amazon.in/s?k={search_query.replace(' ', '+')}"
    print(search_url)
    HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
    }

    response = requests.get(search_url, headers=HEADERS)
    soup = BeautifulSoup(response.content, 'html.parser')
    return soup


def ProductScraping(soup):
    global products_list
    products_list = []
    products = soup.find_all("div", {"data-component-type": "s-search-result"})

    sl_counter = 1
    for product in products:
        h2 = product.find("h2")
        if h2:
            title = h2.text.strip()
            a_tag = product.find("a")
            link = "https://www.amazon.in" + a_tag["href"] if a_tag else "N/A"
        else:
            continue  # Skip if no title

        try:
            ratings = product.find("span", class_="a-icon-alt").text
        except:
            ratings = "N/A"

        try:
            price = product.find("span", class_="a-price-whole").text
        except:
            price = "N/A"

        products_list.append([sl_counter, title, price, ratings, link])
        sl_counter += 1

    return products_list


def ServiceScraping(soup):
    global products_list
    products_list = ['Under Development']

    span_page = soup.find_all('h3', {'class':'tAxDx'})

    return products_list

def jsonInfoDump(products_list):
    with open('product_details.json', 'w') as f:
        json.dump(products_list, f)


def Webpage():
    global app
    global search_term
    global search_category

   
    
@app.route('/register', methods=["POST"])    
def register():
        data = request.json
        username = data.get("username")
        password = data.get("password")
        confirm_password = data.get("confirm_password")
        
        if not username or not password or not confirm_password:
           return jsonify({"message": "Username, passeord and confirm_password are required"}), 400

        existing_user = Users.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({"success": False, "message": "Username already exists."}), 400

        if password != confirm_password:
           return jsonify({"success": False, "message": "Passwords do not match."}), 400

        hashed = bcrypt.generate_password_hash(password).decode('utf-8')
        print(hashed)
        user = Users(username=username, password_hash=hashed)

        db.session.add(user)
        db.session.commit()
        return jsonify({"success": True, "message": "Registration successful!"}), 200

   

@app.route('/login', methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = Users.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password_hash, password):
        token = jwt.encode({
            "user": username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.config["SECRET_KEY"], algorithm="HS256")
        resp = make_response(jsonify({"message": "Login successful"}))
        resp.set_cookie("token", token, httponly=True, samesite='Lax',secure=True)
        return resp
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401


@app.route('/logout', methods=['POST'])
def logout():
    resp = make_response(jsonify({"message": "Logged out successfully"}))
    resp.delete_cookie("token")
    return resp


@app.route('/home', methods=['GET'])
@token_required
def home():
    return jsonify({"success": True, "message": "Authenticated"})



@app.route('/searchinput')
@token_required
def searchinput():
    search_term.clear()
    search_category.clear()
    return jsonify({"status": "ok"})
    


@app.route('/search', methods=['POST'])
@token_required
def search():
    data = request.json
    item_name = data.get("item_name")
    item_type = data.get("item_type")
    make = data.get("make")
    model = data.get("model")

    # Keep your existing search logic
    # Example: search_term, ServiceScraping/ProductScraping etc.

    products = ProductScraping(soup)  # after scraping, collect product list

    return jsonify({
        "status": "success",
        "products": products,
        "query": { "item_name": item_name, "item_type": item_type, "make": make, "model": model }
    })

@app.route('/results')
def results():
        item_name = request.args.get('item_name')
        item_type = request.args.get('item_type')
        make = request.args.get('make')
        model = request.args.get('model')

        if item_name is not None:
            search_term.append([item_name, model, make])
            search_category.append(item_type)

        SearchAndResponse(search_term)

        if item_type == 'Other Services':
            ServiceScraping(soup)
        else:
            ProductScraping(soup)
            jsonInfoDump(products_list)

            with open('product_details.json', 'r') as f:
                product_details = json.load(f)

        # Cleaning functions
            def clean_price(p):
                try:
                    return float(str(p).replace('₹', '').replace(',', '').strip())
                except:
                    return 0.0

            def clean_rating(r):
                try:
                    return float(str(r).split()[0])
                except:
                    return 0.0

            # Sorting logic
            sort_by = request.args.get('sort_by', 'price')
            sort_direction = request.args.get('sort_direction', 'asc')
            reverse = (sort_direction == 'desc')

            if sort_by == 'price':
                product_details.sort(key=lambda x: clean_price(x[2]), reverse=reverse)
            elif sort_by == 'ratings':
                product_details.sort(key=lambda x: clean_rating(x[3]), reverse=reverse)

            # Format prices after sorting
            for product in product_details:
                try:
                    product[2] = f"₹{clean_price(product[2]):,.2f}"
                except:
                    product[2] = "N/A"

            # Pagination
            page = request.args.get('page', 1, type=int)
            per_page = 20
            start = (page - 1) * per_page
            end = start + per_page

            if start >= len(product_details):
                start = max(0, len(product_details) - per_page)
                page = (len(product_details) + per_page - 1) // per_page

            if end > len(product_details):
                end = len(product_details)

            current_products = product_details[start:end]
            total_pages = (len(product_details) + per_page - 1) // per_page

            return jsonify({
            "products": current_products,
            "page": page,
            "total_pages": total_pages,
            "item_name": search_term[-1][0],
            "item_type": search_category[-1],
            "make": search_term[-1][2],
            "model": search_term[-1][1],
            "sort_by": sort_by,
            "sort_direction": sort_direction
            })

                            
if __name__ == '__main__':
    app.run(debug=True)

