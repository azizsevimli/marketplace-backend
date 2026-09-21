BEGIN;

CREATE TYPE user_roles AS ENUM ( 'ADMIN', 'CUSTOMER', 'VENDOR' );

CREATE TYPE vendor_status AS ENUM ( 'PENDING', 'APPROVED', 'REJECTED' );

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(14),
  password_hash VARCHAR NOT NULL,
  role user_roles NOT NULL DEFAULT 'CUSTOMER',
  created_at TIMESTAMP(3) NOT NULL DEFAULT now(),
  updated_at TIMESTAMP(3) NOT NULL DEFAULT now()
);

CREATE TABLE customers (
  user_id UUID PRIMARY KEY,
  address VARCHAR
);

CREATE TABLE admins (
  user_id UUID PRIMARY KEY
);

CREATE TABLE vendors (
  user_id UUID PRIMARY KEY,
  status vendor_status NOT NULL DEFAULT 'PENDING',
  rejected_message VARCHAR
);

ALTER TABLE customers ADD FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE admins ADD FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE vendors ADD FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

COMMIT;