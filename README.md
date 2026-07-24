# RenewCred - Production-Ready Headless CMS & Dynamic Public Web Application

A full-stack, production-ready Content Management System (CMS) and public web application designed for **RenewCred**. Built as a decoupled, block-based headless platform that allows administrators to dynamically construct, edit, and publish rich content (headers, multi-paragraph text, structured lists, LaTeX mathematical formulas, and data tables) that populates the public frontend in real-time.

---

## 🌟 Key Highlights & Features

- **Block-Based Content Model**: Flexible JSON schema supporting headers (`h1`, `h2`, `h3`), paragraphs, bulleted/numbered lists, interactive data tables, and LaTeX mathematical equations.
- **LaTeX Math Support**: Integrated KaTeX formula parsing (e.g. continuous compounding formula $A = P e^{rt}$ and variance equations $\sigma$).
- **Redux Toolkit State Management**: Clean separation between global application state (Authentication JWT, Page Store, active editing buffers) and local component view states.
- **Admin Panel Dashboard**: Authenticated, responsive admin dashboard for managing page routes, block order, site statistics, and live block previews.
- **Public Dynamic Frontend**: Modern, responsive landing page and dynamic route renderer fetching layout blocks live from the Express REST API.
- **Dockerized Infrastructure**: Single-command container orchestration (`docker-compose up`) launching MongoDB, API backend, Admin dashboard, and Public website.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Backend API** | Express.js (Node.js), Mongoose, JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, CORS, Dotenv |
| **Database** | MongoDB (Document Store for block-based content schemas) |
| **Admin Frontend** | React.js (Vite), Redux Toolkit, React Router DOM, Lucide Icons, Tailwind CSS, KaTeX |
| **Public Frontend** | React.js (Vite), Redux Toolkit, React Router DOM, KaTeX (`react-katex`), Tailwind CSS |
| **Containerization** | Docker, Docker Compose |

---

## 📁 Repository & Directory Architecture

```
renewCred_Assesment/
├── docker-compose.yml           # Container orchestration config
├── .env.example                 # Root environment variables reference
├── README.md                    # System documentation
│
├── backend/                     # Express.js REST API Server
│   ├── Dockerfile
│   ├── package.json
│   ├── .env
│   └── src/
│       ├── config/db.js         # MongoDB connection handler
│       ├── models/              # Mongoose schemas (Admin, Page, Block)
│       ├── middleware/auth.js   # JWT verification guard
│       ├── controllers/         # Auth & Content business logic
│       ├── routes/              # Express API route handlers
│       ├── seed.js              # Initial database seed script
│       └── server.js            # Express server entry point & auto-seeder
│
├── admin-frontend/              # Admin CMS Dashboard (Vite + React + Redux)
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── store/               # Redux slices (authSlice, contentSlice)
│       ├── components/          # BlockEditor, Navbar, Sidebar, ProtectedRoute
│       ├── pages/               # Login, Dashboard, PageBuilder
│       └── main.jsx
│
└── public-frontend/             # Dynamic Public Website (Vite + React + Redux)
    ├── Dockerfile
    ├── package.json
    └── src/
        ├── store/               # Redux content slice
        ├── components/          # BlockRenderer, Header, Footer, HeroBanner, DynamicPage
        └── main.jsx
```

---

## 🔑 Default Evaluation Credentials & Sample Data

Upon launching the application, default admin credentials and rich sample pages (with mathematical equations, financial tier comparison tables, and feature lists) are **automatically seeded** into MongoDB:

| Metric | Details |
| :--- | :--- |
| **Admin Panel URL** | `http://localhost:3001` |
| **Public Website URL** | `http://localhost:3000` |
| **Backend API URL** | `http://localhost:5000/api/v1` |
| **Admin Email** | `admin@renewcred.com` |
| **Admin Password** | `admin123` |

---

## 🚀 Quick Start & Installation

### Option A: Running with Docker Compose (Recommended)

Make sure Docker Desktop is installed and running on your machine:

```bash
# 1. Clone or navigate to the project directory
cd renewCred_Assesment

# 2. Build and start all services in detached mode
docker-compose up --build -d

# 3. Access the web applications:
# Admin Panel:   http://localhost:3001
# Public Site:   http://localhost:3000
# Backend API:   http://localhost:5000/api/v1/health
```

To stop the containers:
```bash
docker-compose down
```

---

### Option B: Running Locally (Node.js & Local MongoDB)

Prerequisites: Node.js (v18+) and a running MongoDB instance (`mongodb://localhost:27017/renewcred`).

#### 1. Setup Backend API
```bash
cd backend
npm install
npm run dev
```
*(The server will start on port 5000 and auto-seed default admin credentials and sample pages).*

#### 2. Setup Admin Dashboard
Open a new terminal:
```bash
cd admin-frontend
npm install
npm run dev
```
*(The admin dashboard will run on `http://localhost:3001`).*

#### 3. Setup Public Frontend
Open another terminal:
```bash
cd public-frontend
npm install
npm run dev
```
*(The public frontend will run on `http://localhost:3000`).*

---

## 📐 Architectural Decisions & Design Rationale

### 1. Block-Based Content Model vs Flat Text
Traditional flat HTML text fields suffer from formatting lock-in and security risks (XSS). We implemented a **Block-Based JSON Content Model**:
- Each page contains an ordered sequence of typed content blocks (`header`, `paragraph`, `list`, `table`, `equation`, `quote`).
- This decouples data storage from presentation logic, enabling the public frontend's `BlockRenderer` to safely translate blocks into native, accessible React components and KaTeX formulas.

### 2. State Management Strategy (Redux Toolkit vs Local State)
- **Redux Toolkit**: Used for global session state (`authSlice`), JWT tokens, active page listing (`contentSlice`), and API sync thunks. This ensures single-source-of-truth authentication across routes and seamless updates across screens.
- **Local Component State**: Used for transient UI inputs (such as active typing buffers inside `BlockEditor` row builders or form field toggles) before committing changes to Redux and the backend API.

### 3. LaTeX Mathematical Equation Rendering
To meet the rich content requirements, we utilized KaTeX (`react-katex`). LaTeX math strings configured by administrators (e.g. compounding formulas $A = Pe^{rt}$) are parsed into styled inline or block elements with horizontal scroll fallback for small screens.

---

## 🔌 Core API Endpoints

### Authentication Routes (`/api/v1/auth`)
- `POST /api/v1/auth/login`: Authenticates administrator & returns JWT token.
- `GET /api/v1/auth/me`: Verifies active JWT session token (Protected).

### Content Management Routes (`/api/v1/content`)
- `GET /api/v1/content/pages`: Fetches all dynamic pages (Public).
- `GET /api/v1/content/pages/slug/:slug`: Fetches page content by URL slug (Public).
- `GET /api/v1/content/pages/:id`: Fetches single page details by ID (Public).
- `POST /api/v1/content/pages`: Creates a new page with content blocks (Protected).
- `PUT /api/v1/content/pages/:id`: Updates existing page content & blocks (Protected).
- `DELETE /api/v1/content/pages/:id`: Deletes page record (Protected).

---

## 🛡️ License & Author
Created for the **RenewCred Frontend Engineering Assessment** by **Sanjay**.
