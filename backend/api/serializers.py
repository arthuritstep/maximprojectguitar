from decimal import Decimal, InvalidOperation


class GuitarSerializer:
    def serialize(self, guitar):
        return {
            "id": guitar.id,
            "name": guitar.name,
            "brand": guitar.brand,
            "description": guitar.description,
            "price": float(guitar.price),
            "stock": guitar.stock,
            "image_url": guitar.image_url,
            "created_at": guitar.created_at.isoformat() if guitar.created_at else None,
            "updated_at": guitar.updated_at.isoformat() if guitar.updated_at else None,
        }

    def serialize_list(self, guitars):
        return [self.serialize(guitar) for guitar in guitars]

    def validate(self, data):
        name = str(data.get("name", "")).strip()
        brand = str(data.get("brand", "")).strip()
        description = str(data.get("description", "")).strip()
        price_raw = data.get("price")
        stock_raw = data.get("stock", 0)
        image_url = str(data.get("image_url", "")).strip()

        if not name or not brand or price_raw in (None, ""):
            raise ValueError("name, brand and price are required")

        try:
            price = Decimal(str(price_raw))
        except (InvalidOperation, TypeError, ValueError):
            raise ValueError("price must be a valid number")

        try:
            stock = int(stock_raw)
        except (TypeError, ValueError):
            raise ValueError("stock must be a number")

        return {
            "name": name,
            "brand": brand,
            "description": description,
            "price": price,
            "stock": max(stock, 0),
            "image_url": image_url,
        }
