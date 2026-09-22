BEGIN;

CREATE TYPE product_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'PASSIVE');

CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID NOT NULL,
    category_id UUID,
    subcategory_id UUID,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    discount_price NUMERIC(10,2) NOT NULL DEFAULT 0,
    stock_quantity INT NOT NULL,
    SKU VARCHAR,
    status product_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP(3) NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ON products (store_id, title);

ALTER TABLE products ADD FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE RESTRICT;
ALTER TABLE products ADD FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;
ALTER TABLE products ADD FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

COMMIT;