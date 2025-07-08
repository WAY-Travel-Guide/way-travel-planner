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
│
├── backend/                       # Backend microservices and gateway
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

