from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

app = Flask(
    __name__,
    static_folder="static",
    template_folder="templates"
)

CORS(app)

# SQLite Database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///products.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# =========================
# DATABASE TABLE
# =========================

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "quantity": self.quantity
        }


# Create database automatically
with app.app_context():
    db.create_all()


# =========================
# REACT FRONTEND ROUTES
# =========================

@app.route("/")
def serve_react():
    return send_from_directory(app.template_folder, "index.html")


@app.route("/<path:path>")
def serve_static(path):
    file_path = os.path.join(app.static_folder, path)

    if os.path.exists(file_path):
        return send_from_directory(app.static_folder, path)

    return send_from_directory(app.template_folder, "index.html")


# =========================
# API ROUTES
# =========================

# Health Check
@app.route("/api")
def api_home():
    return jsonify({
        "message": "Product Management API Running"
    })


# GET ALL PRODUCTS
@app.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()

    return jsonify([
        product.to_dict()
        for product in products
    ])


# ADD PRODUCT
@app.route("/products", methods=["POST"])
def add_product():
    data = request.get_json()

    new_product = Product(
        name=data["name"],
        price=float(data["price"]),
        quantity=int(data["quantity"])
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({
        "message": "Product added successfully"
    }), 201


# UPDATE PRODUCT
@app.route("/products/<int:id>", methods=["PUT"])
def update_product(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    data = request.get_json()

    product.name = data["name"]
    product.price = float(data["price"])
    product.quantity = int(data["quantity"])

    db.session.commit()

    return jsonify({
        "message": "Product updated successfully"
    })


# PRODUCT COUNT (for n8n chatbot)
@app.route("/products/count", methods=["GET"])
def count_products():
    count = Product.query.count()

    return jsonify({
        "count": count,
        "message": f"We currently have {count} products registered in the catalog."
    })


# GET SINGLE PRODUCT
@app.route("/products/<int:id>", methods=["GET"])
def get_product(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    return jsonify(product.to_dict())


# DELETE PRODUCT (bonus CRUD endpoint)
@app.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = Product.query.get(id)

    if not product:
        return jsonify({
            "message": "Product not found"
        }), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({
        "message": "Product deleted successfully"
    })


# =========================
# RUN APP
# =========================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)