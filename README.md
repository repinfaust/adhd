# ADHD Acclaim - React Native App

A gentle, gamified task and reward system designed specifically for people with ADHD. This app helps users manage tasks based on their current energy levels and celebrates wins without creating pressure.

## Features

### Core Functionality
- **Energy-Based Task Matching**: Suggests tasks that match your current energy level
- **Gamified Points System**: Earn points for completing tasks (no streak pressure)
- **Quick Task Templates**: Pre-built task options for common ADHD challenges
- **Mood Integration**: Optional mood tracking for personalized suggestions
- **Visual Energy Meter**: Color-coded progress bar for current energy levels
- **Calendar View**: Schedule and view tasks across different days

### ADHD-Friendly Design
- **Reduced Pressure**: No streak counters or guilt-inducing metrics
- **Accessibility Options**: Respects reduced motion preferences
- **Minimal Celebrations**: Option for shorter, less animated feedback
- **Energy Awareness**: Tasks suggested based on current capacity

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g @expo/cli`

### Installation

1. Clone the repository:
```bash
git clone https://github.com/repinfaust/adhd.git
cd adhd/adhd-rn-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
   - **Web**: Press `w` in terminal or visit http://localhost:8081
   - **iOS**: Press `i` for iOS simulator
   - **Android**: Press `a` for Android emulator
   - **Device**: Scan QR code with Expo Go app

## Integration with Existing React Native Apps

### As a Component Library

1. Copy the `src/` directory to your project
2. Install required dependencies:
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs react-native-modal @expo/vector-icons
```

3. Import and use components:
```javascript
import { AppProvider } from './path/to/src/context/AppContext';
import HomeScreen from './path/to/src/screens/HomeScreen';

// Wrap your app with the provider
<AppProvider>
  <HomeScreen />
</AppProvider>
```

### Individual Components

Import specific components as needed:
```javascript
import { AddTaskModal } from './path/to/src/components/AddTaskModal';
import { useApp } from './path/to/src/context/AppContext';
```

## MongoDB Integration

### Backend Setup

The app currently uses local state management. To connect to MongoDB:

1. **Install MongoDB dependencies** in your backend:
```bash
npm install mongoose express cors dotenv
```

2. **Create API endpoints** (example structure):
```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// Routes
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/users', require('./routes/users'));
app.use('/api/rewards', require('./routes/rewards'));
```

3. **Create MongoDB schemas**:
```javascript
// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  boostLevel: { type: String, enum: ['easy', 'medium', 'hard'] },
  pointValue: Number,
  energyRequired: Number,
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: Date,
  notes: String,
  mood: String,
  targetDate: Date
});

module.exports = mongoose.model('Task', taskSchema);
```

### Frontend Integration

Update the app context to use API calls:

```javascript
// services/api.js
const API_BASE = 'http://your-backend-url/api';

export const taskService = {
  getTasks: () => fetch(`${API_BASE}/tasks`).then(res => res.json()),
  createTask: (task) => fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  }),
  updateTask: (id, updates) => fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  })
};
```

### Database Configuration

Environment variables needed:
```env
MONGODB_URI=mongodb://localhost:27017/adhd-acclaim
# or for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/adhd-acclaim
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddTaskModal.js  # Task creation modal with templates
│   ├── TaskItem.js      # Individual task display
│   └── RewardItem.js    # Reward display component
├── screens/             # Main app screens
│   ├── HomeScreen.js    # Dashboard with energy tracking
│   ├── TaskScreen.js    # Task management
│   ├── CalendarScreen.js # Calendar view
│   ├── RewardsScreen.js # Rewards management
│   └── ProfileScreen.js # Settings and energy management
├── context/             # State management
│   └── AppContext.js    # Main app state and actions
└── constants/           # Design tokens and theme
    └── theme.js         # Colors, spacing, typography
```

## Customization

### Theme Customization
Edit `src/constants/theme.js` to customize colors and spacing:
```javascript
export const colors = {
  primary: '#6366F1',     // Main purple color
  secondary: '#06B6D4',   // Teal accent
  // ... other theme values
};
```

### Adding New Task Templates
Update the `quickTemplates` array in `AddTaskModal.js`:
```javascript
const quickTemplates = [
  { name: 'Your custom task', icon: 'star' },
  // ... existing templates
];
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m "Description of changes"`
5. Push: `git push origin feature-name`
6. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or feature requests, please open an issue on GitHub.