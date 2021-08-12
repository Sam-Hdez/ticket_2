CREATE DATABASE tecla_social_network;
GO

USE tecla_social_network;
GO

--roles TEXT DEFAULT '[]',
CREATE TABLE Users(
    user_id INT NOT NULL IDENTITY(1,1),
    first_name VARCHAR(150) NOT NULL, --Para el nombre completo combinar first name y last name
    last_name VARCHAR(60) NOT NULL,
    age INT NOT NULL,
    email VARCHAR(320) NOT NULL,
    profile_linkedin VARCHAR(320) NOT NULL,
    encrypted_password VARCHAR(255) NOT NULL,
    is_admin BIT DEFAULT 0,
    type_feedback BIT DEFAULT 0, --Configuración de feedback 0 Feedback cerrado a su circulo, 1 Feedback abierto/publico.
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id)
);

CREATE TABLE Addresses(
    address_id INT NOT NULL IDENTITY(1,1),
    country VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    user_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(address_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE Hobbies(
    hobby_id INT NOT NULL IDENTITY(1,1),
    hobby_name VARCHAR NOT NULL,
    user_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(hobby_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

--tbl catalogos para copiar y pegar
CREATE TABLE Catalogs(
    catalog_id INT NOT NULL IDENTITY(1,1),
    catalog_type INT NOT NULL, --1 Conocimientos, 2 Tecnologías, 3 Desempeño, 4 Soft skills, 5 Entornos profesionales, 6 Hobbies
    --element_order INT NOT NULL,
    element_name VARCHAR NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(catalog_id),
);

CREATE TABLE UserCircles(
    circle_id INT NOT NULL IDENTITY(1,1),
    type_circle INT NOT NULL, --Tipo de circulo 1 amigos, 2 colegas, 3 empleo
    user_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(circle_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE Enterprise(
    enterprise_id INT NOT NULL IDENTITY(1,1),
    enterprise_name VARCHAR NOT NULL,
    system_owner BIT DEFAULT 1, -- Bandera que identifica a un propietario de sistema, sus colaboradores deran estar definidos en la tbl MemberEnterprise, el propietario de sistema podra añadir miembros al circulo 3 de un colaborador
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(enterprise_id),
);

--Los que se encuentren en su circulo pueden calificar y dar feedback/recomendaciones
CREATE TABLE Members_Circle_Enterprise(
    relation_circle_id INT NOT NULL IDENTITY(1,1), --Se queda el nombre relation circle porque al final solo los miembros de un circulo con el usuario podran dar feedback
    type_relation INT NOT NULL, --1 Relación directa con el usuario(el usuario o su empresa lo marca dentro de algun circulo) | 2 Colaborador de una empresa
    circle_id INT, -- Para el caso type_relation 2 Circle id debe ser NULL
    user_id INT NOT NULL, --El dueño ya es integrante de su circulo
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(relation_circle_id),
    FOREIGN KEY(circle_id) REFERENCES UserCircles(circle_id)
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

CREATE TABLE Skills(
    skill_id INT NOT NULL IDENTITY(1,1),
    type_skill INT NOT NULL, --Puede ser relacional asociado a Catalogs(catalog_type)
    skill_name VARCHAR NOT NULL,
    user_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(skill_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id),
);

CREATE TABLE Feedback(
    feedback_id INT NOT NULL IDENTITY(1,1),
    user_id INT NOT NULL,
    relation_circle_id INT NOT NULL,
    skill_id INT, --Cuando is_general_feedback sea 1 skill_id debe ser null
    points INT NOT NULL,
    feedback TEXT, 
    visibility INT NOT NULL, --El usuario dueño del skill puede decidir si mostrar o no el feedback en su perfil, la funcion que cree feedbacks generales debera colocar por default el feedback como publico (1), el usuario posteriormente podra desactivar el comentario solo para él.
    is_general_feedback BIT DEFAULT 1, --Feedback o comentario general, no sobre un skill: 0 comentario sobre skill | 1 Comentario a aparecer al final del perfil
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(feedback_id),
    FOREIGN KEY(relation_circle_id) REFERENCES Members_Circle_Enterprise(relation_circle_id),
    FOREIGN KEY(skill_id) REFERENCES Skills(skill_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id),
);