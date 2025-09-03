import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius } from '../constants/theme';

const CalendarScreen = () => {
  const { state, dispatch } = useApp();
  const { tasks } = state;
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getTasksForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return tasks.filter(task => task.dueDate && task.dueDate.startsWith(dateStr));
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.dayCell}>
          <Text style={styles.dayTextInactive}>
            {new Date(currentDate.getFullYear(), currentDate.getMonth(), -firstDay + i + 1).getDate()}
          </Text>
        </View>
      );
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const tasksForDay = getTasksForDate(day);
      const isToday = day === new Date().getDate() && 
                     currentDate.getMonth() === new Date().getMonth() && 
                     currentDate.getFullYear() === new Date().getFullYear();
      const isSelected = day === selectedDate;
      const hasCompletedTasks = tasksForDay.some(task => task.completed);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            isToday && styles.todayCell,
            hasCompletedTasks && styles.completedDayCell
          ]}
          onPress={() => setSelectedDate(day)}
        >
          <Text style={[
            styles.dayText,
            isToday && styles.todayText,
            hasCompletedTasks && styles.completedDayText
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Calendar</Text>
        </View>

        {/* Calendar Navigation */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity
            onPress={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            <Ionicons name="chevron-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          
          <Text style={styles.monthYear}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </Text>
          
          <TouchableOpacity
            onPress={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            <Ionicons name="chevron-forward" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Day Headers */}
        <View style={styles.dayHeaders}>
          {dayNames.map(day => (
            <Text key={day} style={styles.dayHeader}>{day}</Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendar}>
          {renderCalendarDays()}
        </View>

        {/* Selected Day Tasks */}
        <View style={styles.selectedDaySection}>
          <Text style={styles.selectedDayTitle}>
            Wins for Selected Day
          </Text>
          
          {selectedDateTasks.length > 0 ? (
            selectedDateTasks.map(task => (
              <View key={task.id} style={styles.taskItem}>
                <View style={[styles.taskStatus, task.completed && styles.taskCompleted]}>
                  <Ionicons 
                    name={task.completed ? "checkmark-circle" : "circle-outline"} 
                    size={20} 
                    color={task.completed ? colors.success : colors.textSecondary} 
                  />
                </View>
                <View style={styles.taskContent}>
                  <Text style={[styles.taskName, task.completed && styles.taskNameCompleted]}>
                    {task.name}
                  </Text>
                  <Text style={styles.taskDetails}>
                    {task.boostLevel} • {task.pointValue} points
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.noTasks}>
              <Ionicons name="calendar" size={48} color={colors.gray300} />
              <Text style={styles.noTasksText}>No tasks for this day</Text>
            </View>
          )}
          
          <TouchableOpacity style={styles.addTaskButton}>
            <Ionicons name="add" size={20} color={colors.white} />
            <Text style={styles.addTaskText}>
              Add Task for {selectedDate.toString().padStart(2, '0')}/{(currentDate.getMonth() + 1).toString().padStart(2, '0')}/{currentDate.getFullYear()}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.primary,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  monthYear: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
  },
  dayHeaders: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xs,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  dayCell: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  todayCell: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
  },
  completedDayCell: {
    backgroundColor: '#FFE8E8',
    borderRadius: borderRadius.sm,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textDark,
  },
  todayText: {
    color: colors.white,
    fontWeight: '600',
  },
  completedDayText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  dayTextInactive: {
    fontSize: 14,
    color: colors.gray300,
  },
  selectedDaySection: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  selectedDayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  taskStatus: {
    marginRight: spacing.md,
  },
  taskContent: {
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
  taskDetails: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  noTasks: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  noTasksText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  addTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  addTaskText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginLeft: spacing.sm,
  },
});

export default CalendarScreen;