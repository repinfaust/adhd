import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius } from '../constants/theme';
import TaskItem from '../components/TaskItem';
import AddTaskModal from '../components/AddTaskModal';

const TaskScreen = () => {
  const { state } = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  
  const { tasks, currentEnergyLevel } = state;

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const quickWins = filteredTasks.filter(task => 
    !task.completed && task.timeEstimate <= 15 && task.boostLevel === 'easy'
  );
  
  const energyMatches = filteredTasks.filter(task => 
    !task.completed && Math.abs(task.energyRequired - currentEnergyLevel) <= 2
  );

  const FilterButton = ({ filterType, label }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        filter === filterType && styles.filterButtonActive
      ]}
      onPress={() => setFilter(filterType)}
    >
      <Text style={[
        styles.filterButtonText,
        filter === filterType && styles.filterButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wins</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <FilterButton filterType="all" label="All" />
        <FilterButton filterType="pending" label="Pending" />
        <FilterButton filterType="completed" label="Completed" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Wins Section */}
        {quickWins.length > 0 && filter !== 'completed' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚡ Quick Wins (≤15min)</Text>
            {quickWins.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </View>
        )}

        {/* Energy Matches Section */}
        {energyMatches.length > 0 && filter !== 'completed' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              🎯 Energy Matches (Level {currentEnergyLevel})
            </Text>
            {energyMatches.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </View>
        )}

        {/* All Tasks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {filter === 'all' ? 'All Wins' : 
             filter === 'pending' ? 'Pending Wins' : 'Completed Wins'}
          </Text>
          
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons 
                name={filter === 'completed' ? 'checkmark-circle' : 'list'} 
                size={48} 
                color={colors.gray300} 
              />
              <Text style={styles.emptyMessage}>
                {filter === 'completed' ? 'No completed tasks yet' : 'No tasks found'}
              </Text>
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.primary,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textDark,
  },
  filterButtonTextActive: {
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
  },
  emptyMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});

export default TaskScreen;