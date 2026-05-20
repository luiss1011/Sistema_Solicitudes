# Sistema de Solicitudes

Sistema web para la gestión de solicitudes internas de empleados. Permite crear, revisar y aprobar solicitudes con un flujo de estados y control de acceso por roles.

> **En desarrollo activo**

---

## Tecnologías

| Capa          | Tecnología                             |
| ------------- | -------------------------------------- |
| Backend       | Node.js + Express                      |
| Base de datos | MySQL + Sequelize ORM                  |
| Vistas        | EJS (motor de plantillas)              |
| Autenticación | express-session con persistencia en BD |
| Seguridad     | Helmet, bcrypt                         |

---

## Estructura del proyecto

```
├── config/
│   ├── database.js       # Conexión a MySQL con Sequelize
│   └── session.js        # Configuración de sesiones
├── models/
│   ├── index.js          # Relaciones entre modelos
│   ├── Role.js           # Modelo de roles
│   ├── User.js           # Modelo de usuarios
│   └── Solicitud.js      # Modelo de solicitudes
├── routes/
│   └── authRoutes.js     # Rutas de autenticación
├── views/                # Plantillas EJS
├── public/               # CSS, JS e imágenes estáticas
├── app.js                # Configuración de Express
└── server.js             # Punto de entrada
```

---

## Instalación

### Requisitos previos

- Node.js v18 o superior
- MySQL 8

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/luiss1011/Sistema_Solicitudes.git
cd Sistema_Solicitudes

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Arrancar el servidor
node server.js
```

### Variables de entorno (`.env`)

```
DB_HOST=localhost
DB_NAME=nombre_de_tu_bd
DB_USER=tu_usuario
DB_PASSWORD=tu_password
PORT=3000
SESSION_SECRET=cadena_larga_y_aleatoria
```

> 💡 Genera un SESSION_SECRET seguro con:
> `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

---

## 👥 Roles del sistema

| Rol           | Permisos                                  |
| ------------- | ----------------------------------------- |
| `admin`       | Gestión completa del sistema y usuarios   |
| `solicitante` | Crear y consultar sus propias solicitudes |
| `aprobador`   | Revisar, aprobar o rechazar solicitudes   |

---

## 📌 Estados de una solicitud

```
pendiente → aprobada
          → rechazada
          → cancelada
```

---

## 🚀 Funcionalidades

- [x] Estructura base del servidor
- [x] Conexión a base de datos con Sequelize
- [x] Modelos: Role, User, Solicitud
- [x] Relaciones entre modelos (llaves foráneas)
- [x] Sistema de sesiones persistentes en BD
- [ ] Autenticación (login / logout)
- [ ] Hasheo de contraseñas con bcrypt
- [ ] CRUD de solicitudes
- [ ] Panel de administración
- [ ] Control de acceso por rol (middleware)

---

## 👤 Autor

**Tu Nombre**

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [tu-perfil](https://linkedin.com/in/tu-perfil)
