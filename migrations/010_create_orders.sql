BEGIN;

CREATE TYPE order_status AS ENUM (
    'PENDING',
    'PAID', 
    'PREPARING',
    'COMPLETED', 
    'CANCELLED'
);

CREATE TABLE orders(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL,
    shipping_address VARCHAR NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    status order_status NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP(3) NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT now()
);

ALTER TABLE orders ADD FOREIGN KEY (customer_id) REFERENCES customers (user_id) ON DELETE RESTRICT;

COMMIT;