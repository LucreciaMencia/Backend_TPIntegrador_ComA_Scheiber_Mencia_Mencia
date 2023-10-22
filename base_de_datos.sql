CREATE TABLE IF NOT EXISTS rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(20) NOT NULL
)ENGINE=InnoDB;

INSERT INTO rol VALUES (1, "Comensal");
INSERT INTO rol VALUES (2, "Restaurante");

CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    nickname VARCHAR(30) UNIQUE NOT NULL,
    mail VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS restaurante (
    id_usuario INT PRIMARY KEY,
    nombre_resto VARCHAR(50) NOT NULL,
    descripcion_resto TEXT NOT NULL,
    horario VARCHAR(50) NOT NULL,
    contacto VARCHAR(15),
    ubicacion VARCHAR(100),
    valoracion_resto FLOAT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS comida(
    id_comida INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    precio_comida FLOAT NOT NULL,
    nombre_comida VARCHAR(255) NOT NULL,
    descripcion_comida TEXT NOT NULL,
    promedio_estrellas FLOAT,
    FOREIGN KEY (id_usuario) REFERENCES restaurante(id_usuario)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS comensal(
    id_usuario INT PRIMARY KEY, 
    nombre_comensal VARCHAR (30) NOT NULL,
    apellido_comensal VARCHAR (30) NOT NULL,
    puntos_disp INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS valoracion(
    id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_comida INT NOT NULL,
    puntaje INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES comensal(id_usuario),
    FOREIGN KEY (id_comida) REFERENCES comida(id_comida)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS imagen(
id_imagen INT AUTO_INCREMENT PRIMARY KEY,
id_comida INT NOT NULL,
ruta VARCHAR (255),
FOREIGN KEY (id_comida) REFERENCES comida(id_comida)
)ENGINE=InnoDB;
