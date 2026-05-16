from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    sku: str
    category: str
    price: float
    cost: float


class ProductResponse(ProductCreate):
    id: int

    class Config:
        orm_mode = True