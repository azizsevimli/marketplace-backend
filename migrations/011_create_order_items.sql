BEGIN;

CREATE TYPE order_item_status AS ENUM(
    'PENDING',
    'CONFIRMED',
    'PREPARING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED'
);

CREATE TABLE order_items(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL,
    store_id UUID NOT NULL,
    product_id UUID NOT NULL,
    quantity INT NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL GENERATED ALWAYS AS (quantity * unit_price) STORED,
    status order_item_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP(3) NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ON order_items (order_id, product_id);

ALTER TABLE order_items ADD FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE;
ALTER TABLE order_items ADD FOREIGN KEY (store_id) REFERENCES stores (id) ON DELETE RESTRICT;
ALTER TABLE order_items ADD FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT;

COMMIT;