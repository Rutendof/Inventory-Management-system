from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fake database
products = []

# Home route
@app.get("/")
def home():
    return {"message": "Inventory API Running"}


# Get all products
@app.get("/products")
def get_products():
    return products


# Add product
@app.post("/products")
def add_product(product: dict):
    product["id"] = len(products) + 1
    products.append(product)
    return product


# Delete product
@app.delete("/products/{product_id}")
def delete_product(product_id: int):
    global products

    products = [p for p in products if p["id"] != product_id]

    return {"message": "Product deleted"}


# Update product
@app.put("/products/{product_id}")
def update_product(product_id: int, updated_product: dict):

    for product in products:
        if product["id"] == product_id:
            product.update(updated_product)
            return product

    raise HTTPException(status_code=404, detail="Product not found")


# ==============================
# CSV UPLOAD FEATURE
# ==============================
@app.post("/upload-csv")
async def upload_csv(file: UploadFile = File(...)):
    global products

    try:
        # Read uploaded file
        contents = await file.read()

        # Convert CSV to dataframe
        df = pd.read_csv(io.BytesIO(contents))

        # Clean column names
        df.columns = [col.strip().lower() for col in df.columns]

        # REQUIRED COLUMNS
        required_columns = ["name", "sku", "category", "price", "cost"]

        for col in required_columns:
            if col not in df.columns:
                raise HTTPException(
                    status_code=400,
                    detail=f"Missing required column: {col}"
                )

        # Convert dataframe rows to dictionaries
        new_products = df.to_dict(orient="records")

        added_products = []

        for p in new_products:

            # Clean & validate values
            product = {
                "id": len(products) + 1,
                "name": str(p.get("name", "Unnamed Product")),
                "sku": str(p.get("sku", "N/A")),
                "category": str(p.get("category", "Other")),
                "price": float(p.get("price", 0)),
                "cost": float(p.get("cost", 0)),
            }

            products.append(product)
            added_products.append(product)

        return {
            "message": "CSV uploaded successfully",
            "added": len(added_products),
            "total_products": len(products),
            "products": added_products
        }

    except pd.errors.EmptyDataError:
        raise HTTPException(
            status_code=400,
            detail="CSV file is empty"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"CSV upload failed: {str(e)}"
        )