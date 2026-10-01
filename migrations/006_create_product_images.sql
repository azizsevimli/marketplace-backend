BEGIN;

CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id UUID NOT NULL,
    image_url VARCHAR NOT NULL,
    sort_order INT NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX ON product_images (product_id, sort_order);

ALTER TABLE product_images ADD FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE;

COMMIT;