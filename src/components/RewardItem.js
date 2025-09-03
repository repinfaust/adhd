import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius } from '../constants/theme';

const RewardItem = ({ reward, userPoints }) => {
  const { dispatch } = useApp();
  const canAfford = userPoints >= reward.pointCost;

  const handleRedeem = () => {
    if (!canAfford) {
      Alert.alert('Insufficient Points', `You need ${reward.pointCost - userPoints} more points to redeem this reward.`);
      return;
    }

    Alert.alert(
      'Redeem Reward',
      `Spend ${reward.pointCost} points on "${reward.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Redeem', 
          onPress: () => {
            dispatch({ type: 'REDEEM_REWARD', payload: reward.id });
            Alert.alert('Enjoy!', `You've redeemed "${reward.name}". Enjoy your reward! 🎉`);
          }
        },
      ]
    );
  };

  return (
    <View style={[styles.container, !canAfford && styles.containerDisabled]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{reward.icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.rewardName, !canAfford && styles.textDisabled]}>
          {reward.name}
        </Text>
        
        <View style={styles.typeContainer}>
          <Ionicons name="time" size={12} color={colors.warning} />
          <Text style={styles.typeText}>
            {reward.type === 'timed' ? '15 minute break' : 
             reward.type === 'experience' ? 'Experience reward' : 'Instant reward'}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <View style={[styles.costBadge, !canAfford && styles.costBadgeDisabled]}>
          <Ionicons name="star" size={10} color={canAfford ? colors.secondary : colors.textSecondary} />
          <Text style={[styles.costText, !canAfford && styles.textDisabled]}>
            {reward.pointCost}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.redeemButton,
            !canAfford && styles.redeemButtonDisabled
          ]}
          onPress={handleRedeem}
          disabled={!canAfford}
        >
          <Text style={[
            styles.redeemButtonText,
            !canAfford && styles.redeemButtonTextDisabled
          ]}>
            Redeem
          </Text>
        </TouchableOpacity>
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
  containerDisabled: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    borderRadius: borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  rewardName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  textDisabled: {
    color: colors.textSecondary,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typeText: {
    fontSize: 12,
    color: colors.warning,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  costBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  costBadgeDisabled: {
    backgroundColor: colors.gray200,
  },
  costText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
  },
  redeemButton: {
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.md,
  },
  redeemButtonDisabled: {
    borderColor: colors.gray300,
  },
  redeemButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
  },
  redeemButtonTextDisabled: {
    color: colors.textSecondary,
  },
});

export default RewardItem;