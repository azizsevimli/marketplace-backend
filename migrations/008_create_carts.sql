BEGIN;

CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID UNIQUE NOT NULL,
    total_price NUMERIC(10,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP(3) NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT now()
);

ALTER TABLE carts ADD FOREIGN KEY (customer_id) REFERENCES customers (user_id) ON DELETE CASCADE;

COMMIT;