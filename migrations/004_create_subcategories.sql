BEGIN;

CREATE TABLE subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID NOT NULL,
    title VARCHAR NOT NULL,
    slug VARCHAR NOT NULL,
    created_at TIMESTAMP(3) NOT NULL DEFAULT now(),
    updated_at TIMESTAMP(3) NOT NULL DEFAULT now()
);

ALTER TABLE subcategories ADD FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE CASCADE;

CREATE UNIQUE INDEX ON subcategories (parent_id, slug);

COMMIT;