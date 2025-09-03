import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius } from '../constants/theme';

const ProfileScreen = () => {
  const { state, dispatch } = useApp();
  const { user, settings, currentEnergyLevel } = state;

  const updateSetting = (key, value) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: value } });
  };

  const updateEnergy = (level) => {
    dispatch({ type: 'UPDATE_ENERGY', payload: level });
  };

  const EnergyButton = ({ level }) => (
    <TouchableOpacity
      style={[
        styles.energyButton,
        currentEnergyLevel === level && styles.energyButtonActive
      ]}
      onPress={() => updateEnergy(level)}
    >
      <Text style={[
        styles.energyButtonText,
        currentEnergyLevel === level && styles.energyButtonTextActive
      ]}>
        {level}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.card}>
          <View style={styles.userInfo}>
            <Ionicons name="person-circle" size={60} color={colors.textSecondary} />
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>guest@example.com</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.totalWins}</Text>
              <Text style={styles.statLabel}>Wins Achieved</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.points}</Text>
              <Text style={styles.statLabel}>Total Points</Text>
            </View>
          </View>
        </View>

        {/* Energy Level */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Energy Level</Text>
          <Text style={styles.energyDescription}>
            How energetic do you feel right now? (1 = very low, 10 = very high)
          </Text>
          <View style={styles.energyContainer}>
            {[1,2,3,4,5,6,7,8,9,10].map(level => (
              <EnergyButton key={level} level={level} />
            ))}
          </View>
          <Text style={styles.currentEnergyText}>
            Current: Level {currentEnergyLevel}
          </Text>
        </View>

        {/* Settings */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Enhanced Mood Integration</Text>
              <Text style={styles.settingDescription}>
                Track daily mood and energy levels for personalized task suggestions
              </Text>
            </View>
            <Switch
              value={settings.moodTracking}
              onValueChange={(value) => updateSetting('moodTracking', value)}
              trackColor={{ false: colors.gray200, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Minimal Celebrations</Text>
              <Text style={styles.settingDescription}>
                Shorter, less animated celebrations
              </Text>
            </View>
            <Switch
              value={settings.minimalCelebrations}
              onValueChange={(value) => updateSetting('minimalCelebrations', value)}
              trackColor={{ false: colors.gray200, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingName}>Respect Reduced Motion</Text>
              <Text style={styles.settingDescription}>
                Honors system accessibility preferences
              </Text>
            </View>
            <Switch
              value={settings.reducedMotion}
              onValueChange={(value) => updateSetting('reducedMotion', value)}
              trackColor={{ false: colors.gray200, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </View>

        <View style={{ height: 100 }} />
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
  content: {
    flex: 1,
  },
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  userInfo: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: spacing.md,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  energyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  energyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  energyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.gray200,
  },
  energyButtonActive: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  energyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  energyButtonTextActive: {
    color: colors.white,
  },
  currentEnergyText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: colors.secondary,
    marginTop: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default ProfileScreen;