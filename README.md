# ADHD Acclaim - React Native App

A gentle, gamified task and reward system designed specifically for people with ADHD. This app helps users manage tasks based on their current energy levels and celebrates wins without creating pressure.

## What Makes This App Perfect for ADHD Users vs Other Task Apps

Most task management apps are built for neurotypical brains and accidentally harm ADHD users. Here's what makes ADHD Acclaim different:

### **The Fundamental Difference: Understanding Variable Capacity**

**Traditional Apps Assume:**
- Consistent daily performance
- Linear motivation patterns
- Same cognitive resources every day
- Willpower as the primary factor

**ADHD Acclaim Recognizes:**
- Energy levels fluctuate dramatically (1-10 scale tracking)
- Some days deserve MORE credit, not less (2x points for overwhelmed days)
- Brain fog, hyperfocus, and high energy require different approaches
- Executive function varies independent of effort

### **Addressing Core ADHD Challenges Other Apps Ignore**

**1. Time Blindness**
- Most apps: Show due dates, assume time awareness
- ADHD Acclaim: "4h 59m left today" + task estimates (~21min) make time tangible

**2. Working Memory Issues**
- Most apps: Expect users to remember context and next steps
- ADHD Acclaim: Parking Lot for interrupted thoughts, context preservation, "Next Action" highlighting

**3. Task Initiation Paralysis**
- Most apps: Present endless task lists
- ADHD Acclaim: Quick Wins section (≤15min tasks), templates for common ADHD needs, energy-matched suggestions

**4. Executive Function Deficits**
- Most apps: Require users to break down tasks themselves
- ADHD Acclaim: Task breakdown suggestions, auto-filled point values, decision reduction

### **Harmful Patterns Other Apps Use That This Avoids**

**Streak Systems:**
- Traditional: Daily streaks create pressure and shame when broken
- ADHD Acclaim: Cumulative wins (32 achieved) with no time pressure

**All-or-Nothing Metrics:**
- Traditional: Binary completion tracking
- ADHD Acclaim: Effort multipliers, partial credit, mood-based adjustments

**Cognitive Overload:**
- Traditional: Show all tasks simultaneously
- ADHD Acclaim: Progressive reveal (1-3 tasks), "show more" option

**Shame-Based Motivation:**
- Traditional: Red alerts, missed deadline emphasis, guilt
- ADHD Acclaim: "Hey hey! How's today?" supportive language

### **ADHD-Specific Features No Other App Has**

**Energy-Task Matching:**
Automatically surfaces tasks that match current capacity with explanations ("Matches your energy 5/10"). Most apps force you to choose from everything.

**Mood-Aware Point Systems:**
Bad days get MORE points because the effort was actually harder. Revolutionary concept that validates ADHD reality.

**Hyperfocus vs Brain Fog Modes:**
Different task suggestions based on cognitive state. Other apps assume one-size-fits-all productivity.

**Parking Lot for Thoughts:**
Captures interrupted ideas without losing current focus. Addresses ADHD's scattered attention constructively.

### **The Research-Backed Approach**

This app implements findings from ADHD research that other apps ignore:

- **Dopamine dysfunction**: Immediate rewards (50ms feedback) vs delayed gratification
- **Executive function variability**: Smart defaults reduce decision fatigue
- **Rejection sensitivity**: Positive language, no shame messaging
- **Time perception issues**: Visual time representations throughout

### **What Other "ADHD" Apps Get Wrong**

Many apps claim ADHD-friendliness but still use:
- Daily streak requirements (creates pressure)
- Overwhelming feature sets (decision paralysis)
- Traditional productivity assumptions (consistent performance)
- Generic gamification (not targeted to dopamine dysfunction)

### **The Critical Innovation: Compassionate Productivity**

Most productivity apps are built on the assumption that people need external pressure to perform. ADHD Acclaim recognizes that ADHD users already have internal pressure and need external support instead.

The app doesn't try to "fix" ADHD traits - it works with them. Variable energy becomes a feature to optimize around, not a problem to overcome. Hyperfocus gets channeled, brain fog gets accommodated, and every effort gets recognized appropriately.

### **Bottom Line**

This isn't just an ADHD-themed skin on traditional productivity concepts. It's a fundamental reimagining of task management built from ADHD research and user feedback. It addresses the actual neurological differences rather than trying to force ADHD brains into neurotypical productivity patterns.

The result is an app that reduces shame, supports variable capacity, and makes productivity feel achievable rather than punishing - which is exactly what ADHD users need but rarely find in the productivity space.

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

<img width="450" height="733" alt="Screenshot 2025-09-03 at 18 33 19" src="https://github.com/user-attachments/assets/41d8cbb9-95cd-40cc-85c3-674c24696667" />

<img width="505" height="728" alt="Screenshot 2025-09-03 at 18 31 32" src="https://github.com/user-attachments/assets/d13e072a-0497-4086-80fd-beebe72b71d6" />

<img width="509" height="717" alt="Screenshot 2025-09-03 at 18 31 40" src="https://github.com/user-attachments/assets/7e8b3fd8-1c73-42ca-a65e-20c0ba32dc9c" />

<img width="505" height="722" alt="Screenshot 2025-09-03 at 18 31 45" src="https://github.com/user-attachments/assets/ec629069-dec1-4229-95d4-5e723a703b55" />

<img width="499" height="715" alt="Screenshot 2025-09-03 at 18 31 51" src="https://github.com/user-attachments/assets/51ce8d59-0311-465c-a147-b09178e77969" />

<img width="501" height="711" alt="Screenshot 2025-09-03 at 18 32 01" src="https://github.com/user-attachments/assets/606db452-53cf-4946-afde-2363eb850a65" />

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
