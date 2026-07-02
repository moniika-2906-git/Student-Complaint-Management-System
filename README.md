# 🎯 Smart Complaint Management System

A full-stack web application that streamlines complaint submission, tracking, and resolution — with role-based access for **Users**, **Staff**, and **Admin**.

---

## 🚀 Live Demo
The project Link is [https://student-complaint-management-system-chi.vercel.app/]
- **Frontend:** (https://student-complaint-management-system-chi.vercel.app/)
- **Backend API:** (https://student-complaint-management-system-1hvh.onrender.com)

---

## 📌 Features

### 👤 User
- Register & login securely with JWT authentication
- Submit complaints with title, description, and category
- Track complaint status in real-time
- View complaint history

### 🛠️ Staff
- View complaints assigned by admin
- Update complaint status (In Progress / Resolved)
- Add resolution notes

### 🔐 Admin
- Dashboard with complaint & user statistics
- Assign complaints to staff members
- Manage all users and complaints
- View system-wide analytics

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js (Vite) | UI Framework |
| Axios | HTTP Client |
| React Router | Client-side Routing |
| Tailwind CSS | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API Server |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| bcrypt | Password Hashing |
| Nodemon | Development Server |

### Deployment
| Service | Usage |
|---|---|
| Render | Backend Hosting |
| Vercel / Netlify | Frontend Hosting |
| MongoDB Atlas | Cloud Database |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-complaint-management-system.git
cd smart-complaint-management-system
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/complaints?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend:

```bash
nodemon app.js
```

---

### 3. Frontend Setup

```bash
cd complaint-system
npm install
```

Create a `.env` file inside `complaint-system/`:

```env
VITE_API_URL=https://your.bacakend.render.com
```

Start the frontend:

```bash
npm run dev
```

---

## 🌐 API Endpoints

### Auth Routes
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/stats` | Get user stats | Admin |

### Complaint Routes
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/complaints` | Submit complaint | User |
| GET | `/api/complaints` | Get all complaints | Admin |
| GET | `/api/complaints/stats` | Complaint statistics | Admin |
| PATCH | `/api/complaints/:id/assign` | Assign to staff | Admin |
| PATCH | `/api/complaints/:id/status` | Update status | Staff |

### Stats Routes
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/stats/complaints` | Complaint stats | Admin |
| GET | `/api/stats/users` | User stats | Admin |
| GET | `/api/test` | Health check | Public |

---

## 🚢 Deployment

### Backend on Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Set **Root Directory** to `server`
5. Set **Build Command:** `npm install`
6. Set **Start Command:** `node app.js`
7. Add Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT` = `5000`
8. Add Render IP ranges to MongoDB Atlas Network Access:
   - `74.220.58.0/24`
   - `74.220.50.0/24`

### Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Set **Root Directory** to `client`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com`
5. Deploy!

---

## 🔒 Environment Variables Summary

### Server (`/.env`)
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `PORT` | Server port (default: 5000) |

### Complaint-system (`/complaint-system/.env`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---



## 👩‍💻 Author

**Monika** — [GitHub](https://github.com/moniika-2906-git) ·

---

> ⭐ If you found this project useful, please give it a star on GitHub!
