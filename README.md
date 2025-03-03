# 🌍 Globetrotter Challenge

Globetrotter Challenge is an interactive web application that tests users' knowledge of world geography through an engaging quiz format. Players are presented with clues about different locations around the world and must guess the correct destination.

### Live Url: https://globetrotter-client-production.up.railway.app/
### Backend: https://github.com/shadan-asad/globetrotter-server

## 📋 Features

- **Interactive Geography Quiz**: Test your knowledge with challenging geography questions
- **User Authentication**: Register to track your progress and stats
- **Game Statistics**: View your performance metrics (correct answers, incorrect answers, total games played)
- **Challenge Friends**: Create custom challenges and share them with friends
- **Leaderboard**: Compare your performance with other players

## 🛠️ Technology Stack

- **Frontend**: Angular 19
- **UI Components**: Angular Material
- **State Management**: RxJS
- **Styling**: SCSS
- **Animations**: Angular Animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Angular CLI (v19 or higher)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/shadan-asad/globetrotter-client.git
cd globetrotter-client
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment**

The application uses environment files to manage API URLs for different environments. These are located in `src/environments/`.

- `environment.ts`: Default environment configuration
- `environment.development.ts`: Development environment configuration
- `environment.production.ts`: Production environment configuration

Update the API URLs in these files to point to your backend service:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://your-api-url.com/api'
};
```

4. **Start the development server**

```bash
npm start
```

The application will be available at `http://localhost:4200/`.

### Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📱 Application Structure

- **Components**
  - `HomeComponent`: Landing page with app introduction
  - `GameComponent`: Main game interface where users answer geography questions
  - `GameResultComponent`: Displays results after answering a question
  - `UserRegistrationComponent`: User registration form
  - `ChallengeComponent`: Interface for creating and accepting challenges
  - `LeaderboardComponent`: Displays top players and scores

- **Services**
  - `ApiService`: Handles all API communication
  - `AuthService`: Manages user authentication and session
  - `GameService`: Manages game state and logic

- **Models**
  - `User`: User profile and statistics
  - `Game`: Game questions and responses
  - `Destination`: Geographic location data

## 🔄 API Integration

The application communicates with a backend API for:
- User registration and authentication
- Fetching game questions
- Submitting answers
- Creating and joining challenges
- Retrieving leaderboard data

## 🧪 Running Tests

```bash
npm test
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
