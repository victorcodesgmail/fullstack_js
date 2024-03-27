CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250) ,
    contactNumber VARCHAR(20) ,
    email VARCHAR(50),
    password VARCHAR(250),
    status VARCHAR(20),
    role VARCHAR(20),
    UNIQUE (email)

);


INSERT INTO users (name, contactNumber, email, password, status, role) 
VALUES ('Admin', '1234567890', 'john@example.com', 'admin', 'true', 'admin');


-- mysql -u victor -p


CREATE TABLE  category(
    id INT AUTO_INCREMENT  NOT NULL,
    name VARCHAR(250) NOT NULL,
    primary KEY(id)

);