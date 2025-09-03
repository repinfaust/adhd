import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius } from '../constants/theme';
import RewardItem from '../components/RewardItem';
import FloatingActionButton from '../components/FloatingActionButton';
import AddTaskModal from '../components/AddTaskModal';

const RewardsScreen = () => {
  const { state } = useApp();
  const { rewards, user } = state;
  const [addTaskModalVisible, setAddTaskModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Rewards</Text>
        <View style={styles.pointsDisplay}>
          <Ionicons name="star" size={16} color={colors.secondary} />
          <Text style={styles.pointsText}>{user.points} points</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>
          
          {rewards.map(reward => (
            <RewardItem key={reward.id} reward={reward} userPoints={user.points} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

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
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.secondary,
  },
  content: {
    flex: 1,
  },
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.md,
  },
});

export default RewardsScreen;