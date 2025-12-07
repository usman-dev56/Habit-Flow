# Habit Flow - Full Stack MERN Application
A beautiful, responsive habit tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js). Track your daily habits, visualize progress, and build consistency with streaks and analytics.

# Screenshots

*Home Page
<img width="1354" height="637" alt="Screenshot 2025-12-07 154126" src="https://github.com/user-attachments/assets/7dd0d831-48a0-43da-a3a0-d0476585b411" />


*Regester Page
<img width="1340" height="631" alt="Screenshot 2025-12-07 161644" src="https://github.com/user-attachments/assets/73258e71-7dac-47b4-89a6-0db95e08b9d1" />



*Login Page
<img width="1357" height="636" alt="Screenshot 2025-12-07 154028" src="https://github.com/user-attachments/assets/329ebbeb-c6d1-4f2a-9295-ca67d5d5c589" />


*Dashboard
<img width="1341" height="635" alt="Screenshot 2025-12-07 162252" src="https://github.com/user-attachments/assets/7ed8dddd-c1c4-4b9c-8a6d-20b6f28b7112" />



*Analytics
<img width="1359" height="631" alt="image" src="https://github.com/user-attachments/assets/a9cf7576-4168-42ec-8c45-df567cf98f84" />

<img width="1351" height="641" alt="Screenshot 2025-12-07 162342" src="https://github.com/user-attachments/assets/232d83b1-7c03-47df-9a84-7c3135c646c3" />


# Features
*Core Features
User Authentication - Secure login/register with JWT
Habit Management - Create, track, and delete habits
Streak Tracking - Visual streak counters with best records
Progress Analytics - Charts and statistics for habit performance
Dark/Light Mode - Theme toggle for comfortable viewing
Responsive Design - Works on desktop, tablet, and mobile

*Analytics Dashboard
Completion rate tracking
Daily progress visualization
Habit performance comparison
Streak history charts
Consistency metrics


# Project Structure
 habit-flow/
├── backend/
│   ├── index.js              # Main server file
│   ├── package.json
│   ├── .env                  # Environment variables
│   ├── models/               # MongoDB schemas
│   │   ├── User.js
│   │   ├── Habit.js
│   │   └── HabitLog.js
│   └── routes/               # API routes
│       ├── auth.js
│       └── habits.js
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── utils/           # Utilities
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md

# Tech Stack
 * Frontend:
    * React with latest Vite
    * Tailwind CSS for styling
    * Framer Motion for animations
    * Recharts for data visualization
    * React Router for navigation
    * Axios for API calls

* Backend:
   * Node.js with Express
   * MongoDB with Mongoose
   * JWT for authentication
   * Bcrypt for password hashing
   * CORS enabled

# Acknowledgments
* Icons from Lucide React
* Charts from Recharts
* Animations from Framer Motion
* UI components inspired by modern design systems

⭐ Star this repo if you find it helpful! ⭐

Made with ❤️ by Usman
