import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius } from '../constants/theme';

const TaskItem = ({ task }) => {
  const { dispatch } = useApp();

  const handleComplete = () => {
    if (!task.completed) {
      dispatch({ type: 'COMPLETE_TASK', payload: task.id });
    }
  };

  const getTimeDisplay = () => {
    if (task.timeEstimate < 60) {
      return `~${task.timeEstimate}min`;
    } else {
      const hours = Math.floor(task.timeEstimate / 60);
      const minutes = task.timeEstimate % 60;
      return minutes === 0 ? `~${hours}h` : `~${hours}h ${minutes}m`;
    }
  };

  const isQuickWin = task.timeEstimate <= 15 && task.boostLevel === 'easy';

  return (
    <View style={[
      styles.container,
      isQuickWin && styles.quickWinContainer,
      task.completed && styles.completedContainer,
    ]}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          task.completed && styles.checkboxCompleted
        ]}
        onPress={handleComplete}
      >
        {task.completed && (
          <Ionicons name="checkmark" size={14} color={colors.white} />
        )}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[
          styles.taskName,
          task.completed && styles.taskNameCompleted
        ]}>
          {task.name}
        </Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Ionicons name="time" size={12} color={colors.textSecondary} />
            <Text style={styles.metaText}>{getTimeDisplay()}</Text>
          </View>

          {isQuickWin && (
            <Text style={styles.badge}>⚡ Quick Win</Text>
          )}
        </View>
      </View>

      <View style={styles.pointsBadge}>
        <Ionicons name="star" size={10} color={colors.secondary} />
        <Text style={styles.pointsText}>{task.pointValue}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickWinContainer: {
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
  },
  completedContainer: {
    opacity: 0.7,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  taskNameCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  badge: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.success,
  },
  pointsBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
  },
});

export default TaskItem;