# WAY – Smart Travel Route Planner for Russia

![WAY Logo](frontend/public/figure-svgrepo-com.svg)

## 🚀 Short Description

**WAY** is a web-based system that automatically generates personalized travel itineraries across Russia based on user-defined parameters such as travel dates, transportation type, budget, and preferences (e.g., family-friendly, nature, cultural sights).  
The platform visualizes route options on an interactive map and allows users to download their selected itinerary as a PDF file. The system aims to simplify trip planning by offering optimized routes tailored to individual needs.

---

## 📂 Project Structure

<details>
  <summary><b>Expand to see the full structure</b></summary>

```plaintext
way-travel-planner/
├── frontend/                      # Client-side React SPA (user interface)
│   ├── node_modules/              # Installed npm packages (not committed)
│   ├── public/                    # Static files (served as-is)
│   │   ├── figure-svgrepo-com.svg // Main logo for the project
│   │   └── suv-svgrepo-com.svg    // Secondary logo/icon for UI
│   ├── src/                       # Source code of the frontend app
│   │   ├── assets/                # Images, fonts, other static assets for frontend
│   │   ├── components/            # Reusable React components
│   │   │   ├── Log-Reg-Header.jsx // Header with login/register buttons and user info
│   │   │   ├── LoginPage.jsx      // Login form component
│   │   │   ├── MainPage.jsx       // Main landing page (home, welcome)
│   │   │   ├── RegisterPage.jsx   // Registration form component
│   │   │   └── UserPage.jsx       // User profile and dashboard
│   │   ├── App.jsx                // Main React app, routes & global state
│   │   ├── index.css              // Global CSS styles
│   │   └── main.jsx               // React app entrypoint (root render)
│   ├── package.json               // Frontend dependencies and scripts
│   ├── package-lock.json          // Dependency versions lock file
│   ├── vite.config.js             // Vite build/configuration file
│   └── .gitignore                 // Files & folders to ignore in Git (frontend)
│
├── backend/                       # Backend microservices and gateway
│   ├── user-service/              # User authentication and management microservice
│   │   ├── user_auth.js           // User login/authentication logic (MongoDB/PostgreSQL)
│   │   ├── user_register.js       // User registration logic (MongoDB/PostgreSQL)
│   │   ├── package.json           // Service dependencies and scripts
│   │   ├── package-lock.json      // Dependency versions lock file
│   │   └── node_modules/          // Installed npm packages (not committed)
│   ├── webapi/                    # Main API gateway (entrypoint for frontend requests)
│   │   ├── index.js               // Express server, routes to microservices
│   │   ├── package.json           // Webapi dependencies and scripts
│   │   ├── package-lock.json      // Dependency versions lock file
│   │   └── node_modules/          // Installed npm packages (not committed)
│   ├── admin-service/             # Admin interface/service (structure only)
│   ├── cache-service/             # Caching microservice (e.g. Redis, structure only)
│   ├── feedback-service/          # Feedback/comments microservice (structure only)
│   ├── geo-data-service/          # Geodata provider microservice (structure only)
│   ├── pdf-generator/             # Service for generating PDF itineraries (structure only)
│   └── route-service/             # Route calculation and optimization microservice (structure only)
│
├── deploy/                        # Deployment configs (not expanded here)
│   ├── k8s/                       # Kubernetes deployment YAMLs
│   ├── nginx/                     # Nginx configs for reverse proxy
│   └── docker/                    # Docker Compose and dev containers
│
├── docs/                          # Project documentation
│
├── .gitignore                     // Global gitignore for the entire project
├── README.md                      // You are here! Project overview and instructions
└── (other config files)           // ESLint, Vite, etc.

