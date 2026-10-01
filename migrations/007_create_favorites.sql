BEGIN;

CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    customer_id UUID NOT NULL,
    product_id UUID NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ON favorites (customer_id, product_id); 

ALTER TABLE favorites ADD FOREIGN KEY (customer_id) REFERENCES customers (user_id) ON DELETE CASCADE;
ALTER TABLE favorites ADD FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;

COMMIT;