BEGIN;

CREATE TYPE payment_status AS ENUM ( 'PENDING', 'SUCCESS', 'FAILED' );

CREATE TABLE payments(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID UNIQUE NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    status payment_status NOT NULL DEFAULT 'PENDING',
    transaction_id UUID UNIQUE NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMP(3) NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT now()
);

ALTER TABLE payments ADD FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE RESTRICT;

COMMIT;