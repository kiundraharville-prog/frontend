# Product Management System

## Project Overview

This project is a full-stack Product Management System built with:

- Flask (Backend API)
- React (Frontend UI)
- SQLite Database
- n8n AI Chatbot
- AWS EC2 Deployment

Users can add, view, and edit products through a web dashboard. An AI chatbot connected through n8n can answer inventory questions using live product data.

---

## Features

### Backend (Flask)

- Create Products
- View Products
- Update Products
- Product Count Endpoint
- SQLite Database Storage

### Frontend (React)

- Product Dashboard
- Add New Products
- View Product Inventory
- Edit Existing Products
- Responsive Layout

### AI Chatbot (n8n)

- Connects to Product Database
- Reads Live Inventory Data
- Answers Natural Language Questions

Example:

> How many products do we have in the catalog?

Response:

> We currently have 5 products registered in the catalog.

---

## Technologies Used

- Python
- Flask
- Flask SQLAlchemy
- Flask CORS
- React
- Axios
- SQLite
- n8n
- AWS EC2
- Nginx
- Gunicorn

---

## Project Structure

```text
product-management-system
│
├── backend
│   ├── app.py
│   ├── products.db
│   ├── requirements.txt
│   ├── static
│   └── templates
│
├── frontend
│
├── n8n_workflow.json
│
└── README.md
```

---

## Installation

### Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run Flask:

```bash
python app.py
```

Backend runs on:

```text
http://127.0.0.1:5000
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

## API Endpoints

### Get Products

```http
GET /products
```

### Add Product

```http
POST /products
```

### Update Product

```http
PUT /products/<id>
```

### Get Product Count

```http
GET /products/count
```

---

## AWS Deployment

The application was deployed using:

- AWS EC2
- Nginx Reverse Proxy
- Gunicorn
- Certbot SSL

Live URL:

```text
https://capstone-yourname.yourdomain.com
```

---

## Author

Kiundra Harville

