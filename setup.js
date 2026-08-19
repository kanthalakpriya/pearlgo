const fs = require('fs');
const path = require('path');

const projectStructure = {
  'CeylonGuide/README.md': `# CeylonGuide\nExplore Sri Lanka. Travel with Trust. A premium marketplace connecting tourists with verified local tour guides.\n\n## Setup Instructions\n1. Database Setup: Run database/schema.sql\n2. Backend: cd backend -> npm install -> npm run dev\n3. Frontend: cd frontend -> npm install -> npm run dev`,
  
  'CeylonGuide/.env.example': `PORT=5000\nDATABASE_URL=postgresql://postgres:password@localhost:5432/ceylonguide\nJWT_SECRET=your_super_secret_jwt_key_here\nPAYMENT_API_KEY=test_payment_key_placeholder\nCOMMISSION_PERCENTAGE=10`,
  
  'CeylonGuide/database/schema.sql': `-- SQL Schema for CeylonGuide\nCREATE EXTENSION IF NOT EXISTS "uuid-ossp";\n\nCREATE TYPE user_role AS ENUM ('TOURIST', 'GUIDE', 'ADMIN');\n\nCREATE TABLE users (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    email VARCHAR(255) UNIQUE NOT NULL,\n    password_hash VARCHAR(255) NOT NULL,\n    role user_role NOT NULL\n);\n\n-- Add other tables (bookings, chat, etc.) as detailed in the project specs.`,
  
  'CeylonGuide/backend/package.json': `{\n  "name": "ceylonguide-backend",\n  "version": "1.0.0",\n  "main": "server.js",\n  "scripts": {\n    "dev": "nodemon server.js"\n  },\n  "dependencies": {\n    "bcrypt": "^5.1.1",\n    "cors": "^2.8.5",\n    "dotenv": "^16.4.5",\n    "express": "^4.19.2",\n    "jsonwebtoken": "^9.0.2",\n    "pg": "^8.11.5"\n  },\n  "devDependencies": {\n    "nodemon": "^3.1.0"\n  }\n}`,
  
  'CeylonGuide/backend/server.js': `require('dotenv').config();\nconst express = require('express');\nconst cors = require('cors');\n\nconst app = express();\napp.use(cors());\napp.use(express.json());\n\napp.get('/', (req, res) => {\n  res.send('CeylonGuide API is running...');\n});\n\n// Add your authentication, payment, and chat routes here\n\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT, () => console.log('Backend running on port ' + PORT));`,
  
  'CeylonGuide/frontend/package.json': `{\n  "name": "ceylonguide-frontend",\n  "private": true,\n  "version": "0.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "axios": "^1.6.8",\n    "lucide-react": "^0.368.0",\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "react-router-dom": "^6.22.3"\n  },\n  "devDependencies": {\n    "@vitejs/plugin-react": "^4.2.1",\n    "autoprefixer": "^10.4.19",\n    "postcss": "^8.4.38",\n    "tailwindcss": "^3.4.3",\n    "vite": "^5.2.0"\n  }\n}`,
  
  'CeylonGuide/frontend/tailwind.config.js': `export default {\n  content: [\n    "./index.html",\n    "./src/**/*.{js,ts,jsx,tsx}",\n  ],\n  theme: {\n    extend: {\n      colors: {\n        forest: '#1E3F20',\n        ocean: '#005C8A',\n        sand: '#E6DCC8',\n        gold: '#D4AF37'\n      }\n    },\n  },\n  plugins: [],\n}`,
  
  'CeylonGuide/frontend/src/App.jsx': `import { BrowserRouter, Routes, Route } from 'react-router-dom';\nimport LandingPage from './pages/LandingPage';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path="/" element={<LandingPage />} />\n      </Routes>\n    </BrowserRouter>\n  );\n}\nexport default App;`,
  
  'CeylonGuide/frontend/src/pages/LandingPage.jsx': `import React from 'react';\n\nexport default function LandingPage() {\n  return (\n    <div className="min-h-screen bg-forest flex items-center justify-center text-white">\n      <div className="text-center">\n        <h1 className="text-6xl font-bold mb-4">Explore Sri Lanka.</h1>\n        <h2 className="text-4xl text-gold mb-8">Travel with Trust.</h2>\n        <button className="bg-gold text-forest px-8 py-3 rounded-full font-bold">Plan Your Trip</button>\n      </div>\n    </div>\n  );\n}`
};

console.log("Creating CeylonGuide project structure...");

Object.entries(projectStructure).forEach(([filePath, content]) => {
  const fullPath = path.join(__dirname, filePath);
  const dirName = path.dirname(fullPath);
  
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Created: ${filePath}`);
});

console.log("\\n✅ Success! All files have been organized.");
console.log("Now you can cd into 'CeylonGuide' and start coding!");