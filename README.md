# AI Flow MERN Application

A full-stack MERN application that uses React Flow to visualize an AI prompt-response interaction using the OpenRouter AI API.

## Features
- **Frontend**: React (Vite) + `@xyflow/react` + Vanilla CSS glassmorphism
- **Backend**: Node.js + Express + MongoDB
- **AI Integration**: OpenRouter (`mistralai/mistral-7b-instruct:free`)

## Setup Instructions

### Prerequisites
- Node.js installed (v16+)
- MongoDB installed and running locally on port `27017`

### 1. Backend Setup
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd ai-flow-app/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the `.env` file in the `server` directory with your actual OpenRouter API key:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/aiflow
   OPENROUTER_API_KEY=your_actual_api_key_here
   ```
4. Start the backend Express server:
   ```bash
   node server.js
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd ai-flow-app/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### Usage
- Open your browser to `http://localhost:5173`.
- Type a prompt in the **Input Node**.
- Click **Run Flow** at the top right to send the prompt to the AI.
- The response will appear in the **Result Node**.
- Click **Save to DB** to store the interaction in your local MongoDB instance.
