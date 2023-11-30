DROP DATABASE IF EXISTS MEAL_ORDER;
create database MEAL_ORDER;
use MEAL_ORDER;
DROP TABLE IF EXISTS Customer, Vendor, Meal, `Order`;

CREATE TABLE Customer (
    Customer_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(256) NOT NULL, 
    `Password` VARCHAR(30) NOT NULL, 
    `Name` VARCHAR(20) character SET utf8 NOT NULL, 
    UNIQUE(Email)
)ENGINE=INNODB;

CREATE TABLE Vendor (
    Vendor_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Type` VARCHAR(30) character SET utf8 NOT NULL,
    `Name` VARCHAR(30) character SET utf8 NOT NULL,
    Address VARCHAR(30) character SET utf8 NOT NULL,
    Image_url VARCHAR(8192) character SET utf8,
    `Status` BOOL,
    Email VARCHAR(256) NOT NULL,
    `Password` VARCHAR(30) NOT NULL,
    UNIQUE(Email)
)ENGINE=INNODB;

CREATE TABLE Meal (
    Meal_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Vendor_ID INT NOT NULL,
    Meal_Name VARCHAR(512) character SET utf8 NOT NULL, 
    `Description` VARCHAR(512) character SET utf8,
    Price INT NOT NULL,
    Inventory json NOT NULL, 
    Image_url VARCHAR(8192) NOT NULL,
    Default_Inventory INT NOT NULL,
    FOREIGN KEY (Vendor_ID) REFERENCES Vendor (Vendor_ID) ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE  `Order` (
    Order_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Customer_ID INT NOT NULL,
    Vendor_ID INT NOT NULL,
     `Status` ENUM('IN_CART','WAIT_FOR_APPROVAL', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'CANCELLED_UNCHECKED', 'CANCELLED_CHECKED') NOT NULL,
    Pickup_Time DATETIME NOT NULL,
    Meal_List JSON NOT NULL,
    Cash_Amount INT NOT NULL,
    FOREIGN KEY (Customer_ID) REFERENCES Customer (Customer_ID) ON DELETE CASCADE,
    FOREIGN KEY (Vendor_ID) REFERENCES Vendor (Vendor_ID) ON DELETE CASCADE
)ENGINE=INNODB;


INSERT INTO Customer (Customer_ID, Email, `Password`, `Name`) 
Values (1, '123456@gmail.com', 'euioruoit', 'LLL');
INSERT INTO Vendor 
VALUES (101, '台灣美食', '李記水餃1', '台北市路', 'https://i.imgur.com/JJEN2Su.jpg', 1, '222@gmail.com', 'tttt');  
INSERT INTO Meal
VALUES (10001, 101, '豬肉水餃', '', 10,'{"1":100,"2":50,"3":40,"4":500,"5":600,"6":300,"7":100}','10001.png', 200 );
INSERT INTO Meal
VALUES (10002, 101, '雞肉水餃', '好吃的雞肉水餃', 10,'{"1":30,"2":20,"3":50,"4":0,"5":200,"6":400,"7":200}','10002.png', 100 );

INSERT INTO Vendor 
VALUES (102, '台灣美食', '李記水餃2', '台北市路', 'https://i.imgur.com/JJEN2Su.jpg', 1, '223@gmail.com', 'tttt'); 
INSERT INTO Meal
VALUES (10003, 102, '豬肉水餃', '', 10,'{"1":100,"2":50,"3":40,"4":500,"5":600,"6":300,"7":100}','10001.png', 200 );
INSERT INTO Meal
VALUES (10004, 102, '雞肉水餃', '好吃的雞肉水餃', 10,'{"1":30,"2":20,"3":50,"4":0,"5":200,"6":400,"7":200}','10002.png', 100 );

INSERT INTO Vendor 
VALUES (103, '日本美食', '李記水餃3', '台北市路', 'https://i.imgur.com/JJEN2Su.jpg', 1, '224@gmail.com', 'tttt'); 
INSERT INTO Meal
VALUES (10005, 103, '豬肉水餃', '', 10,'{"1":100,"2":50,"3":40,"4":500,"5":600,"6":300,"7":100}','10001.png', 200 );
INSERT INTO Meal
VALUES (10006, 103, '雞肉水餃', '好吃的雞肉水餃', 10,'{"1":30,"2":20,"3":50,"4":0,"5":200,"6":400,"7":200}','10002.png', 100 );

INSERT INTO `Order`
VALUES (100001, 1, 101, 'PICKED_UP', '2023-1-2 23:59:59', '[{"Meal_ID": 10001, "Amount": 10}, {"Meal_ID": 10002, "Amount": 25}]', 300);
INSERT INTO `Order`
VALUES (100002, 1, 101, 'WAIT_FOR_APPROVAL', '2023-1-23 22:59:59', '[{"Meal_ID": 10001, "Amount": 20}, {"Meal_ID": 10002, "Amount": 45}]', 600);
INSERT INTO `Order`
VALUES (100003, 1, 102, 'CANCELLED_UNCHECKED', '2023-5-31 21:59:59', '[{"Meal_ID": 10003, "Amount": 30}, {"Meal_ID": 10004, "Amount": 65}]', 900);
INSERT INTO `Order`
VALUES (100004, 1, 102, 'CANCELLED_CHECKED', '2023-8-11 22:59:59', '[{"Meal_ID": 10003, "Amount": 30}, {"Meal_ID": 10004, "Amount": 65}]', 900);
INSERT INTO `Order`
VALUES (100005, 1, 102, 'READY_FOR_PICKUP', '2023-8-31 20:59:59', '[{"Meal_ID": 10003, "Amount": 30}, {"Meal_ID": 10004, "Amount": 65}]', 900);
INSERT INTO `Order`
VALUES (100006, 1, 103, 'PICKED_UP', '2023-9-1 21:59:59', '[{"Meal_ID": 10005, "Amount": 30}, {"Meal_ID": 10006, "Amount": 65}]', 350);
INSERT INTO `Order`
VALUES (100007, 1, 103, 'PICKED_UP', '2023-10-30 22:59:59', '[{"Meal_ID": 10005, "Amount": 30}, {"Meal_ID": 10006, "Amount": 65}]', 100);
INSERT INTO `Order`
VALUES (100008, 1, 103, 'IN_CART', '2023-9-30 23:59:59', '[{"Meal_ID": 10005, "Amount": 30}, {"Meal_ID": 10006, "Amount": 65}]', 100);
INSERT INTO `Order`
VALUES (100009, 1, 103, 'PREPARING', '2023-11-30 23:59:59', '[{"Meal_ID": 10005, "Amount": 30}, {"Meal_ID": 10006, "Amount": 65}]', 100);
