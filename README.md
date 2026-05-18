#  Inventory Management System (Full-Stack Product & CSV Pipeline)

This project is a full-stack Inventory Management System I developed to simulate how modern retail and warehouse businesses manage products, inventory operations, pricing, and bulk data processing through integrated frontend and backend systems.

The system was designed to replicate real-world inventory workflows commonly used in retail, e-commerce, and supply chain environments where businesses need centralized product management, scalable inventory tracking, and efficient bulk data ingestion processes.

The project combines backend API development, frontend dashboard engineering, authentication systems, and CSV data pipelines into a production-style business application.

---

#  Project Objectives

The main objectives of the project were to:

- Build a scalable full-stack inventory management platform
- Develop RESTful APIs for inventory operations
- Implement secure login authentication and route protection
- Create a responsive inventory dashboard with real-time updates
- Build a CSV ingestion pipeline for bulk product uploads
- Simulate enterprise-style retail inventory workflows

---

#  Key Features

- Product creation, updating, and deletion (CRUD operations)
- Inventory tracking and product management
- Secure login authentication system
- Protected route access control
- Real-time frontend and backend synchronization
- CSV bulk product upload pipeline
- Profit margin calculations
- Product search and filtering
- Interactive analytics dashboard
- Responsive enterprise-style UI

---

#  Technologies Used

## Backend Development
- FastAPI
- Python
- REST APIs
- Pandas

## Frontend Development
- React
- JavaScript
- Axios
- HTML
- CSS

## Data Processing
- CSV Processing
- Data Validation
- Data Transformation
- Inventory Data Pipelines

---

#  System Architecture

The system follows a full-stack architecture where the frontend communicates with the backend through RESTful APIs.

## Backend (FastAPI)
I developed a FastAPI backend responsible for:
- Product CRUD operations
- Inventory management
- API endpoint handling
- CSV file uploads
- Data validation and processing

The backend was structured to simulate scalable enterprise inventory systems used in modern retail environments.

---

## Frontend (React Dashboard)
I built a responsive React dashboard featuring:
- Dynamic inventory tables
- Product search functionality
- Modal-based product creation
- Real-time inventory updates
- Profit calculations
- Inventory analytics visualization

The dashboard was designed to provide a clean and professional user experience similar to commercial inventory platforms.

---

#  Authentication & Security

To simulate real-world enterprise access control systems, I implemented:
- Login authentication workflows
- Protected routes using React Router
- User session management
- Token-based authentication using local storage
- Context API for global authentication state management

This ensured that unauthorized users could not access protected inventory pages without authentication.

---

#  CSV Ingestion Pipeline

One of the core features of the project is the CSV bulk upload system.

I developed a scalable CSV ingestion pipeline using Pandas that:
- Parses uploaded inventory files
- Cleans and validates product data
- Normalizes column structures
- Handles missing or inconsistent values
- Converts uploaded records into structured inventory entries

This functionality simulates how real businesses process supplier and warehouse inventory data at scale.

---

#  System Capabilities

| Feature | Functionality |
|---|---|
| Inventory Operations | Full CRUD support |
| Authentication | Login & Protected Routes |
| Data Processing | CSV Upload & Validation |
| Dashboard | Real-Time Inventory Analytics |
| Product Tracking | SKU, Category & Pricing Management |
| Frontend Framework | React |
| Backend Framework | FastAPI |

---

#  Business Impact

This project demonstrates how inventory operations can be digitized into a centralized and scalable business system.

The platform helps:
- Reduce reliance on spreadsheets
- Minimize manual inventory errors
- Improve operational efficiency
- Centralize product management workflows
- Support scalable inventory tracking
- Enable structured bulk inventory processing

The system reflects how modern businesses manage products across retail and warehouse operations.

---

#  Real-World Learnings

Through this project, I strengthened my understanding of:
- Full-stack application development
- RESTful API design
- Frontend and backend integration
- Authentication and protected routing
- Data ingestion pipelines
- Inventory system architecture
- Real-world business workflow simulation

The project also improved my ability to design scalable systems that combine data processing, user interfaces, and backend services into a unified application.

---

# 📂 Project Structure

```bash
inventory-management-system/
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── models/
│   ├── schemas/
│   └── main.py
│
├── inventory-frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── services/
│
├── requirements.txt
├── package.json
└── README.md
```

---

#  Installation & Setup

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/inventory-management-system.git
cd inventory-management-system
```

---

# Backend Setup

## Create Virtual Environment

```bash
python -m venv venv
```

---

## Activate Environment

### Windows
```bash
venv\Scripts\activate
```

### Mac/Linux
```bash
source venv/bin/activate
```

---

## Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## Run FastAPI Backend

```bash
uvicorn main:app --reload
```

---

# Frontend Setup

## Navigate to Frontend

```bash
cd inventory-frontend
```

---

## Install Frontend Dependencies

```bash
npm install
```

---

## Run React Frontend

```bash
npm start
```

---

#  Future Improvements

Planned future enhancements include:
- Database integration (PostgreSQL/MySQL)
- JWT authentication
- Cloud deployment
- Supplier management module
- Inventory forecasting using machine learning
- Sales tracking and reporting
- Multi-user role management
- Advanced analytics dashboards

---

#  Author

Rutendo Simango 
Data Science | Machine Learning | Full-Stack Analytics

GitHub: :contentReference[oaicite:0]{index=0}

---

#  License

This project was developed for educational, portfolio, and research purposes.
