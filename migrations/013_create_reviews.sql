BEGIN;

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    customer_id UUID NOT NULL,
    product_id UUID NOT NULL,
    order_item_id UUID NOT NULL,
    description VARCHAR NOT NULL,
    star INT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ON reviews (customer_id, order_item_id);

ALTER TABLE reviews ADD FOREIGN KEY (customer_id) REFERENCES customers (user_id) ON DELETE RESTRICT;
ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE RESTRICT;
ALTER TABLE reviews ADD FOREIGN KEY (order_item_id) REFERENCES order_items (id) ON DELETE RESTRICT;

COMMIT;