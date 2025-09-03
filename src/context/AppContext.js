import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  user: {
    name: 'Guest User',
    points: 120,
    totalWins: 25,
    moodIntegrationEnabled: false,
  },
  tasks: [
    {
      id: '1',
      name: 'Review morning emails',
      pointValue: 10,
      boostLevel: 'easy',
      timeEstimate: 15,
      energyRequired: 3,
      completed: false,
      dueDate: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Complete project proposal',
      pointValue: 25,
      boostLevel: 'hard',
      timeEstimate: 90,
      energyRequired: 8,
      completed: false,
      dueDate: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Take a 10-minute walk',
      pointValue: 5,
      boostLevel: 'easy',
      timeEstimate: 10,
      energyRequired: 2,
      completed: true,
      dueDate: new Date().toISOString(),
    },
  ],
  rewards: [
    {
      id: '1',
      name: '15-minute social media break',
      pointCost: 15,
      type: 'timed',
      icon: '📱',
    },
    {
      id: '2',
      name: 'Favorite coffee treat',
      pointCost: 30,
      type: 'experience',
      icon: '☕',
    },
    {
      id: '3',
      name: 'Watch one episode',
      pointCost: 50,
      type: 'experience',
      icon: '📺',
    },
  ],
  currentEnergyLevel: 6,
  settings: {
    moodTracking: true,
    minimalCelebrations: false,
    reducedMotion: false,
  },
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, {
          id: Date.now().toString(),
          ...action.payload,
          completed: false,
          createdAt: new Date().toISOString(),
        }],
      };
    
    case 'COMPLETE_TASK':
      const updatedTasks = state.tasks.map(task => 
        task.id === action.payload ? { ...task, completed: true, completedAt: new Date().toISOString() } : task
      );
      const completedTask = state.tasks.find(t => t.id === action.payload);
      return {
        ...state,
        tasks: updatedTasks,
        user: {
          ...state.user,
          points: state.user.points + (completedTask?.pointValue || 0),
          totalWins: state.user.totalWins + 1,
        },
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case 'ADD_REWARD':
      return {
        ...state,
        rewards: [...state.rewards, {
          id: Date.now().toString(),
          ...action.payload,
        }],
      };

    case 'REDEEM_REWARD':
      const reward = state.rewards.find(r => r.id === action.payload);
      if (!reward || state.user.points < reward.pointCost) {
        return state;
      }
      return {
        ...state,
        user: {
          ...state.user,
          points: state.user.points - reward.pointCost,
        },
      };

    case 'UPDATE_ENERGY':
      return {
        ...state,
        currentEnergyLevel: action.payload,
      };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
        user: { ...state.user, ...action.payload },
      };

    case 'DISMISS_MOOD_BANNER':
      return {
        ...state,
        user: { ...state.user, moodIntegrationEnabled: true },
      };

    default:
      return state;
  }
}

// Context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};