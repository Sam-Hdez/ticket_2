CREATE DATABASE tecla_social_network;
GO

USE tecla_social_network;
GO

--roles TEXT DEFAULT '[]',
CREATE TABLE users(
    user_id INT NOT NULL IDENTITY(1,1),
    first_name VARCHAR(150) NOT NULL, --Para el nombre completo combinar first name y last name
    last_name VARCHAR(60) NOT NULL,
    age INT, --Sí pueden ser null, no se requieren al inicio
    email VARCHAR(320) NOT NULL,
    profile_linkedin VARCHAR(320), --Sí pueden ser null, no se requieren al inicio
    profile_photo VARCHAR,
    job_resume VARCHAR,
    encrypted_password VARCHAR(255) NOT NULL,
    is_admin BIT DEFAULT 0,
    type_feedback BIT DEFAULT 0, --Configuración de feedback 0 Feedback cerrado a su circulo, 1 Feedback abierto/publico.
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(user_id)
);

CREATE TABLE enterprises(
    enterprise_id INT NOT NULL IDENTITY(1,1),
    enterprise_name VARCHAR NOT NULL,
    system_owner BIT DEFAULT 0, -- Bandera que identifica a un propietario de sistema, sus colaboradores deran estar definidos en la tbl MemberEnterprise, el propietario de sistema podra añadir miembros al circulo 3 de un colaborador
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(enterprise_id),
);

CREATE TABLE addresses(
    address_id INT NOT NULL IDENTITY(1,1),
    country VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    street VARCHAR,
    outside_number VARCHAR,
    inside_number VARCHAR,
    home_references VARCHAR,
    user_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(address_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE degrees(
    degree_id INT NOT NULL IDENTITY(1,1),
    user_id INT NOT NULL,
    degree_name VARCHAR NOT NULL,
    institute VARCHAR NOT NULL,
    degree VARCHAR NOT NULL, --college, master's, doctoral, postgraduate
    --degree_type INT NOT NULL, --Seleccionar si fue presencial, en linea, mixto
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(degree_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE hobbies(
    hobby_id INT NOT NULL IDENTITY(1,1),
    hobby_name VARCHAR NOT NULL,
    user_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(hobby_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE catalogs(
    catalog_id INT NOT NULL IDENTITY(1,1),
    catalog_name VARCHAR NOT NULL, -- Conocimientos,  Tecnologías,  Desempeño,  Soft skills,  Entornos profesionales,  Hobbies
    enterprise_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(catalog_id),
    FOREIGN KEY (enterprise_id) REFERENCES enterprises(enterprise_id),
);

--tbl catalogos para copiar y pegar
CREATE TABLE elements_catalogs(
    element_catalog_id INT NOT NULL IDENTITY(1,1),
    catalog_type INT NOT NULL,
    --element_order INT NOT NULL,
    element_name VARCHAR NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(element_catalog_id),
    FOREIGN KEY (catalog_type) REFERENCES catalogs(catalog_id),
);

--Relación incremental 3:1 con respecto a Users. Si en users hay 3 usuarios esta tbl contendrá 15 Circles.
CREATE TABLE users_circles(
    circle_id INT NOT NULL IDENTITY(1,1),
    type_circle INT NOT NULL, --Tipo de circulo 1 amigos, 2 colegas, 3 empleo --Invitación para el tipo de feedback
    user_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(circle_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

--Los que se encuentren en su circulo pueden calificar y dar feedback/recomendaciones
CREATE TABLE members_circle_enterprises(
    relation_circle_id INT NOT NULL IDENTITY(1,1), --Se queda el nombre relation circle porque al final solo los miembros de un circulo con el usuario podran dar feedback
    type_relation INT NOT NULL, --1 Relación directa con el usuario(el usuario o su empresa lo marca dentro de algun circulo) | 2 Colaborador de una empresa
    circle_id INT, -- Para el caso type_relation 2 Circle id debe ser NULL
    enterprise_id INT, -- Para el caso type_relation 1 enterprise_id debe ser NULL
    user_id INT NOT NULL, --El dueño ya es integrante de su circulo
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(relation_circle_id),
    FOREIGN KEY(circle_id) REFERENCES users_circles(circle_id),
    FOREIGN KEY(enterprise_id) REFERENCES enterprises(enterprise_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE skills(
    skill_id INT NOT NULL IDENTITY(1,1),
    type_skill INT NOT NULL, --Puede ser relacional asociado a Catalogs(catalog_type)
    skill_name VARCHAR NOT NULL,
    user_id INT NOT NULL,
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(skill_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id),
);

CREATE TABLE feedbacks(
    feedback_id INT NOT NULL IDENTITY(1,1),
    user_id INT NOT NULL,
    relation_circle_id INT NOT NULL,
    skill_id INT, --Cuando is_general_feedback sea 1 skill_id debe ser null
    points INT NOT NULL, --Máx 5
    feedback TEXT,
    visibility INT NOT NULL, --El usuario dueño del skill puede decidir si mostrar o no el feedback en su perfil, la funcion que cree feedbacks generales debera colocar por default el feedback como publico (1), el usuario posteriormente podra desactivar el comentario solo para él.
    is_general_feedback BIT DEFAULT 1, --Feedback o comentario general, no sobre un skill: 0 comentario sobre skill | 1 Comentario a aparecer al final del perfil
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(feedback_id),
    FOREIGN KEY(relation_circle_id) REFERENCES members_circle_enterprises(relation_circle_id),
    FOREIGN KEY(skill_id) REFERENCES skills(skill_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id),
);

CREATE TABLE hirings(
    hiring_id INT NOT NULL IDENTITY(1,1),
    enterprise_id INT NOT NULL,
    hiring_name VARCHAR NOT NULL,
    hiring_description TEXT NOT NULL,
    soft_skills TEXT NOT NULL,
    hard_skills TEXT NOT NULL,
    we_offer TEXT NOT NULL,
    salary VARCHAR NOT NULL,
    failed_message TEXT NOT NULL, --Mensaje automatico para rechazar una solicitud en cualquier momento
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(hiring_id),
    FOREIGN KEY(enterprise_id) REFERENCES enterprises(enterprise_id)
);

CREATE TABLE applies(
    apply_id INT NOT NULL IDENTITY(1,1),
    hiring_id INT NOT NULL,
    user_id INT NOT NULL,
    apply_status INT NOT NULL, --Definidas por defualt 1 El solicitante aplica a la vacante | 2 La empresa (nivel admin) acepta la solicitud | 0 La empresa rechaza la solicitud o la elimina en alguna parte del proceso | 3 concluye el proceso con contratación
    user_comments TEXT NOT NULL, --Comentarios sobre el proceso del usuario
    enterprise_comments TEXT NOT NULL, --Comentarios sobre el proceso de la empresa
    active BIT DEFAULT 1,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(apply_id),
    FOREIGN KEY(hiring_id) REFERENCES hirings(hiring_id),
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

CREATE TABLE chats(
    
);

-- NOTA: CREAR MIDDLEWARE QUE VERIFIQUE LA PERTENENCIA DE UN USUARIO A UNA EMPRESA Y SI ESE USUARIO TIENE LA BANDERA ACTIVE PARA ACCEDER AL SISTEMA COMO ADMIN
-- Crear tabla para Chats (EN ESPERA)
-- ROBERTO CONFIGURA JIRA
-- ROBERTO FEEDBACK, CATALOGS, ElementsCatalog, Hirings
-- Miguel Enterprise, UserCircles, Members_Circle_Enterprise, Degrees
-- Alberto Users, Skills, Hobbies y Addresses | Postulaciones (relaciona Users con Ofertas laborales)