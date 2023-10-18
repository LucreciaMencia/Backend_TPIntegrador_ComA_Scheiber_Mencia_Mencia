CREATE TABLE rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(20) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    nickname VARCHAR(30) UNIQUE NOT NULL,
    mail VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
) ENGINE=InnoDB;

CREATE TABLE restaurante (
    id_usuario INT PRIMARY KEY,
    nombre_resto VARCHAR(50) NOT NULL,
    descripcion_resto TEXT NOT NULL,
    horario VARCHAR(50) NOT NULL,
    contacto VARCHAR(15),
    ubicacion VARCHAR(100),
    valoracion_resto FLOAT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
) ENGINE=InnoDB;

CREATE TABLE tipo_comida(
    id_tipoComida INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(15) NOT NULL
)ENGINE=InnoDB;

CREATE TABLE comida(
    id_comida INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_tipoComida INT NOT NULL,
    precio_comida FLOAT NOT NULL,
    nombre_comida VARCHAR(255) NOT NULL,
    descripcion_comida TEXT NOT NULL,
    promedio_estrellas FLOAT,
    FOREIGN KEY (id_usuario) REFERENCES restaurante(id_usuario),
    FOREIGN KEY (id_tipoComida) REFERENCES tipo_comida(id_tipoComida)
)ENGINE=InnoDB;

CREATE TABLE comensal(
    id_usuario INT PRIMARY KEY, 
    nombre_comensal VARCHAR (30) NOT NULL,
    apellido_comensal VARCHAR (30) NOT NULL,
    puntos_disp INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
)ENGINE=InnoDB;

CREATE TABLE valoracion(
    id_valoracion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_comida INT NOT NULL,
    comentario TEXT,
    FOREIGN KEY (id_usuario) REFERENCES comensal(id_usuario),
    FOREIGN KEY (id_comida) REFERENCES comida(id_comida)
)ENGINE=InnoDB;

CREATE TABLE promocion(
    id_promocion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    nombre_promo VARCHAR (30) NOT NULL,
    cantidad_disp INT NOT NULL,
    precio_puntos INT NOT NULL,
    descripcion_promo TEXT NOT NULL
)ENGINE=InnoDB;

CREATE TABLE estado(
    id_estado INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    descripcion_estado VARCHAR(15)
)ENGINE=InnoDB;

CREATE TABLE promo_x_comensal(
    token INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario  INT NOT NULL,
    id_promocion INT NOT NULL,
    id_estado INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES comensal(id_usuario),
    FOREIGN KEY(id_promocion) REFERENCES promocion(id_promocion),
    FOREIGN KEY(id_estado) REFERENCES estado(id_estado)
)ENGINE=InnoDB;

INSERT INTO rol VALUES (1, "Comensal");
INSERT INTO rol VALUES (2, "Restaurante");