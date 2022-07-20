CREATE TABLE centres(
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    covaxine INTEGER NOT NULL,
    covisheild INTEGER NOT NULL,
    sputnik INTEGER NOT NULL
);