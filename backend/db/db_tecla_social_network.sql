CREATE DATABASE tecla_social_network;
GO

USE tecla_social_network;
GO

--roles TEXT DEFAULT '[]',
CREATE TABLE Users(
    user_id INT NOT NULL IDENTITY(1,1),
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    email VARCHAR(320) NOT NULL,
    encrypted_password VARCHAR(255) NOT NULL,
    active BIT DEFAULT 1,
    is_admin BIT DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id)
);

