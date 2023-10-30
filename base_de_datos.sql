CREATE DATABASE IF NOT EXISTS mi_menu;
USE mi_menu;

CREATE TABLE IF NOT EXISTS rol (
    id_rol INT PRIMARY KEY,
    nombre_rol VARCHAR(20) NOT NULL
);

INSERT INTO rol VALUES (1, 'Comensal');
INSERT INTO rol VALUES (2, 'Restaurante');

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    nickname VARCHAR(30) UNIQUE NOT NULL,
    mail VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
) ;

CREATE TABLE IF NOT EXISTS restaurante (
    id_usuario INT PRIMARY KEY,
    nombre_resto VARCHAR(50) NOT NULL,
    descripcion_resto TEXT NOT NULL,
    horario VARCHAR(50) NOT NULL,
    contacto VARCHAR(15),
    ubicacion VARCHAR(100),
    valoracion_resto FLOAT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
) ;

CREATE TABLE IF NOT EXISTS comida(
    id_comida INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    precio_comida FLOAT NOT NULL,
    nombre_comida VARCHAR(255) NOT NULL,
    descripcion_comida TEXT NOT NULL,
    promedio_estrellas FLOAT,
    FOREIGN KEY (id_usuario) REFERENCES restaurante(id_usuario)
) ;

CREATE TABLE IF NOT EXISTS comensal(
    id_usuario INT PRIMARY KEY, 
    nombre_comensal VARCHAR (30) NOT NULL,
    apellido_comensal VARCHAR (30) NOT NULL,
    puntos_disp INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE IF NOT EXISTS valoracion(
    id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_comida INT NOT NULL,
    puntaje INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES comensal(id_usuario),
    FOREIGN KEY (id_comida) REFERENCES comida(id_comida)
);

CREATE TABLE IF NOT EXISTS imagen(
id_imagen INT AUTO_INCREMENT PRIMARY KEY,
id_comida INT NOT NULL,
ruta VARCHAR (255),
FOREIGN KEY (id_comida) REFERENCES comida(id_comida)
);

DELIMITER //
CREATE TRIGGER actualizar_puntos
AFTER INSERT ON valoracion
FOR EACH ROW 
BEGIN
    UPDATE comida
    SET
        promedio_estrellas = (SELECT AVG(puntaje) FROM valoracion WHERE id_comida = NEW.id_comida)
    WHERE id_comida = NEW.id_comida;
END;
//
DELIMITER ;