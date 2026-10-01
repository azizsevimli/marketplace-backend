BEGIN;

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    unit_price NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL GENERATED ALWAYS AS (quantity * unit_price) STORED,
    created_at TIMESTAMP(3) NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ON cart_items (cart_id, product_id);

ALTER TABLE cart_items ADD FOREIGN KEY (cart_id) REFERENCES carts (id) ON DELETE CASCADE;
ALTER TABLE cart_items ADD FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;

COMMIT;