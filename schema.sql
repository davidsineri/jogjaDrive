
-- Skema Database JogjaDrive (Untuk Referensi Backend)

-- 1. Tabel Kategori
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Tabel Mobil (Armada)
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    name VARCHAR(100) NOT NULL,
    price_per_day DECIMAL(12, 2) NOT NULL,
    passengers INTEGER NOT NULL,
    transmission VARCHAR(20) CHECK (transmission IN ('Manual', 'Automatic')),
    fuel_type VARCHAR(20) CHECK (fuel_type IN ('Bensin', 'Diesel', 'Electric')),
    image_url TEXT,
    features TEXT[], -- Array fitur (untuk PostgreSQL)
    is_available BOOLEAN DEFAULT TRUE
);

-- 3. Tabel Pesanan (Bookings)
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    car_id INTEGER REFERENCES cars(id),
    user_name VARCHAR(100) NOT NULL,
    user_phone VARCHAR(20) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    with_driver BOOLEAN DEFAULT FALSE,
    total_price DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data Awal (Seeding)
INSERT INTO categories (name) VALUES ('City Car'), ('MPV'), ('SUV'), ('Luxury'), ('Van');
