# 🚀 AI Flow Builder (MERN + React Flow)

A full-stack MERN application that visualizes an AI prompt-response workflow using React Flow. Users can input a prompt, run the flow to get an AI-generated response, and save interactions to a MongoDB database.

---

## 🧠 Features

- Interactive flow-based UI using React Flow
- AI response generation via OpenRouter API
- Backend API built with Express.js
- MongoDB Atlas integration for data persistence
- Save prompt-response interactions
- Production deployment using Render

---

## 🏗️ Tech Stack

**Frontend**
- React (Vite)
- @xyflow/react (React Flow)
- Axios
- Lucide Icons

**Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)

**AI**
- OpenRouter API (Mistral / Gemini free models)

**Deployment**
- Render (Frontend + Backend)
- MongoDB Atlas

---

## 📁 Project Structure


ai-flow-app/
│
├── client/ # React frontend
│ ├── src/
│ └── .env
│
├── server/ # Express backend
│ ├── routes/
│ ├── models/
│ └── .env
│
└── README.md


---

## ⚙️ Environment Variables

### 🔐 Backend (`server/.env`)


PORT=5000
MONGODB_URI=your_mongodb_connection_string
OPENROUTER_API_KEY=your_api_key
FRONTEND_URL=http://localhost:5173


---

### 🌐 Frontend (`client/.env`)


VITE_API_URL=http://localhost:5000/api


---

## 🚀 Local Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/ai-flow-app.git
cd ai-flow-app
2️⃣ Backend Setup
cd server
npm install
node server.js
3️⃣ Frontend Setup
cd client
npm install
npm run dev
💡 Usage
Enter a prompt in the Input Node
Click Run Flow
View AI response in Result Node
Click Save to store in database
🌍 Deployment
Backend (Render)
Add environment variables:
MONGODB_URI=your_production_mongo_uri
OPENROUTER_API_KEY=your_api_key
FRONTEND_URL=https://your-frontend-url.onrender.com
Frontend (Render Static Site)
Add:
VITE_API_URL=https://your-backend-url.onrender.com/api
🗄️ Database
MongoDB Atlas used for storage
Data stored in collection:
Database: aiflow
Collection: interactions
🔐 Security Notes
Never commit .env files
API keys should be stored in environment variables
Rotate keys if exposed
Use .gitignore to exclude sensitive files
📌 API Endpoints
POST /api/ask-ai

Generate AI response

{
  "prompt": "What is AI?"
}
POST /api/save

Save interaction

{
  "prompt": "...",
  "response": "..."
}
🧪 Future Improvements
Authentication (JWT)
Flow customization (multiple nodes)
History dashboard
Rate limiting
Better error handling UI
👤 Author

Ritik Kumar

📄 License

This project is for evaluation and demonstration purposes.


---

### Thankyou I am waiting for your reply