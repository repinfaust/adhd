import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius } from '../constants/theme';
import TaskItem from '../components/TaskItem';
import RewardItem from '../components/RewardItem';
import FloatingActionButton from '../components/FloatingActionButton';
import AddTaskModal from '../components/AddTaskModal';

const HomeScreen = ({ navigation }) => {
  const { state, dispatch } = useApp();
  const { user, tasks, rewards } = state;
  const [energyModalVisible, setEnergyModalVisible] = useState(false);
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);

  const todaysTasks = tasks
    .filter(task => !task.completed && task.dueDate)
    .slice(0, 3);

  const getEnergyAppropriateTask = () => {
    const incompleteTasks = tasks.filter(task => !task.completed);
    return incompleteTasks.find(task => task.energyRequired <= state.currentEnergyLevel) || incompleteTasks[0];
  };

  const nextTask = getEnergyAppropriateTask();

  const availableRewards = rewards.slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="star" size={32} color={colors.primary} />
          </View>
          <Text style={styles.title}>ADHD Acclaim</Text>
          <Text style={styles.welcomeText}>Good afternoon!</Text>
        </View>

        {/* Mood Integration Banner */}
        {!user.moodIntegrationEnabled && (
          <View style={styles.moodBanner}>
            <View style={styles.moodIconContainer}>
              <Ionicons name="heart" size={24} color={colors.white} />
            </View>
            <View style={styles.moodContent}>
              <Text style={styles.moodTitle}>New: Enhanced Mood Integration</Text>
              <Text style={styles.moodDescription}>
                Track your daily mood and energy levels to get personalized task suggestions and celebrate completing tasks despite difficult days.
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.enableButton}
              onPress={() => dispatch({ type: 'UPDATE_SETTINGS', payload: { moodIntegrationEnabled: true } })}
            >
              <Text style={styles.enableButtonText}>Enable Now</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dismissButton}
              onPress={() => dispatch({ type: 'DISMISS_MOOD_BANNER' })}
            >
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.pointsSection}>
            <View style={styles.pointsLabel}>
              <Ionicons name="star" size={16} color={colors.secondary} />
              <Text style={styles.labelText}>Current Points</Text>
            </View>
            <Text style={styles.pointsValue}>{user.points}</Text>
            <Text style={styles.pointsSubtext}>{user.totalWins} wins achieved</Text>
          </View>
        </View>

        {/* Today's Wins */}
        <View style={styles.section}>
          <View style={styles.winsHeader}>
            <Text style={styles.sectionTitle}>Today's Wins</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Wins')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.energySection}>
            <View style={styles.energyMeterContainer}>
              <View style={styles.energyInfo}>
                <Ionicons name="battery-charging" size={16} color={colors.textSecondary} />
                <Text style={styles.energyText}>Energy: {state.currentEnergyLevel}/10</Text>
              </View>
              <View style={styles.energyMeter}>
                <View style={styles.energyBar}>
                  <View 
                    style={[
                      styles.energyProgress, 
                      { 
                        width: `${(state.currentEnergyLevel / 10) * 100}%`,
                        backgroundColor: state.currentEnergyLevel <= 3 ? '#FF6B6B' : 
                                       state.currentEnergyLevel <= 6 ? '#FFB84D' : '#4ECDC4'
                      }
                    ]} 
                  />
                </View>
              </View>
              <TouchableOpacity 
                style={styles.updateButton}
                onPress={() => setEnergyModalVisible(true)}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.timeRemaining}>4h 48m left today</Text>
          </View>

          {todaysTasks.length > 0 ? (
            todaysTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="checkmark-circle" size={48} color={colors.gray300} />
              <Text style={styles.emptyMessage}>No tasks due today</Text>
            </View>
          )}
        </View>

        {/* Rewards Available */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.secondary }]}>
              Rewards Available
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Rewards')}>
              <Text style={[styles.seeAllText, { color: colors.secondary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {availableRewards.map(reward => (
            <RewardItem key={reward.id} reward={reward} userPoints={user.points} />
          ))}
        </View>

        {/* Next Task */}
        {nextTask && (
          <View style={styles.nextTaskCard}>
            <Text style={styles.nextTaskLabel}>➜ Next: {nextTask.name}</Text>
            <Text style={styles.nextTaskInfo}>
              ⚡ Matches your energy {state.currentEnergyLevel}/10
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Energy Update Modal */}
      <Modal
        isVisible={energyModalVisible}
        onBackdropPress={() => setEnergyModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Update Energy Level</Text>
            <TouchableOpacity onPress={() => setEnergyModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.modalDescription}>
            How's your energy right now? This helps us show you the right tasks.
          </Text>
          
          <Text style={styles.energyLevelLabel}>Energy Level (1-10)</Text>
          
          <View style={styles.energySliderContainer}>
            <View style={styles.energySlider}>
              <View style={styles.sliderTrack}>
                <View 
                  style={[
                    styles.sliderProgress,
                    { width: `${(state.currentEnergyLevel / 10) * 100}%` }
                  ]}
                />
                <View 
                  style={[
                    styles.sliderThumb,
                    { left: `${((state.currentEnergyLevel - 1) / 9) * 100}%` }
                  ]}
                />
              </View>
            </View>
            
            <View style={styles.energyLabels}>
              <Text style={styles.energyLabelText}>Low</Text>
              <Text style={styles.energyCurrentValue}>{state.currentEnergyLevel}</Text>
              <Text style={styles.energyLabelText}>High</Text>
            </View>
          </View>
          
          <View style={styles.energyButtonsContainer}>
            <View style={styles.energyButtonsRow}>
              {[1,2,3,4,5].map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.energyModalButton,
                    state.currentEnergyLevel === level && styles.energyModalButtonActive
                  ]}
                  onPress={() => dispatch({ type: 'UPDATE_ENERGY', payload: level })}
                >
                  <Text style={[
                    styles.energyModalButtonText,
                    state.currentEnergyLevel === level && styles.energyModalButtonTextActive
                  ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.energyButtonsRow}>
              {[6,7,8,9,10].map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.energyModalButton,
                    state.currentEnergyLevel === level && styles.energyModalButtonActive
                  ]}
                  onPress={() => dispatch({ type: 'UPDATE_ENERGY', payload: level })}
                >
                  <Text style={[
                    styles.energyModalButtonText,
                    state.currentEnergyLevel === level && styles.energyModalButtonTextActive
                  ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.modalUpdateButton}
            onPress={() => setEnergyModalVisible(false)}
          >
            <Text style={styles.modalUpdateButtonText}>Update Energy</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <FloatingActionButton onPress={() => setAddTaskModalVisible(true)} />
      
      <AddTaskModal
        visible={addTaskModalVisible}
        onClose={() => setAddTaskModalVisible(false)}
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
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  logoContainer: {
    backgroundColor: colors.gray100,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  pointsSection: {
    alignItems: 'center',
  },
  pointsLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  labelText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.secondary,
    marginVertical: spacing.xs,
  },
  pointsSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
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
  moodBanner: {
    backgroundColor: '#E8E4FF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodIconContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  moodContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  moodDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  enableButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  enableButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  dismissButton: {
    padding: spacing.sm,
  },
  winsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  energySection: {
    marginBottom: spacing.md,
  },
  energyMeterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  energyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.sm,
    minWidth: 80,
  },
  energyMeter: {
    flex: 1,
    marginRight: spacing.sm,
  },
  energyBar: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    overflow: 'hidden',
  },
  energyProgress: {
    height: '100%',
    borderRadius: 4,
  },
  energyText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  updateButton: {
    backgroundColor: colors.gray100,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginRight: spacing.sm,
  },
  updateButtonText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  timeRemaining: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  nextTaskCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  nextTaskLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  nextTaskInfo: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  modal: {
    justifyContent: 'center',
    margin: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
  },
  modalDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  energyLevelLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  energySliderContainer: {
    marginBottom: spacing.lg,
  },
  energySlider: {
    marginBottom: spacing.md,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    position: 'relative',
  },
  sliderProgress: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  sliderThumb: {
    position: 'absolute',
    top: -8,
    width: 24,
    height: 24,
    backgroundColor: colors.textDark,
    borderRadius: 12,
    marginLeft: -12,
  },
  energyLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  energyLabelText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  energyCurrentValue: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  energyButtonsContainer: {
    marginBottom: spacing.lg,
  },
  energyButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  energyModalButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.gray100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gray200,
  },
  energyModalButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  energyModalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  energyModalButtonTextActive: {
    color: colors.white,
  },
  modalUpdateButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    padding: spacing.lg,
    alignItems: 'center',
  },
  modalUpdateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});

export default HomeScreen;