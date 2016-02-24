CREATE SCHEMA IF NOT EXISTS `booking`;
USE `booking`;

DROP TABLE IF EXISTS hotel;
CREATE TABLE hotel (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255)
);

DROP TABLE IF EXISTS offer;
CREATE TABLE offer (
  id INT PRIMARY KEY AUTO_INCREMENT,
  hotel_id INT NOT NULL,
  checkin DATE NOT NULL,
  checkout DATE NOT NULL,
  price FLOAT DEFAULT 0,
  status ENUM('valid', 'booked'),
  CONSTRAINT fk_offer_hotel FOREIGN KEY (hotel_id) REFERENCES hotel(id)
);

DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  offer_id INT NOT NULL,
  CONSTRAINT fk_order_offer FOREIGN KEY (offer_id) REFERENCES offer(id) ON DELETE CASCADE
);