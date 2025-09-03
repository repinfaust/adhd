import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius } from '../constants/theme';

const AddTaskModal = ({ visible, onClose }) => {
  const { dispatch } = useApp();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [boostLevel, setBoostLevel] = useState('medium');
  const [pointValue, setPointValue] = useState('10');
  const [timeEstimate, setTimeEstimate] = useState('');
  const [notes, setNotes] = useState('');
  const [currentMood, setCurrentMood] = useState('Normal day');
  const [targetDate, setTargetDate] = useState('');

  const quickTemplates = [
    { name: 'Check email', icon: 'mail' },
    { name: 'Make important phone call', icon: 'call' },
    { name: 'Tidy workspace', icon: 'home' },
    { name: 'Take medication', icon: 'medical' },
    { name: 'Exercise/walk', icon: 'walk' },
    { name: 'Read for 20 minutes', icon: 'book' },
  ];

  const resetForm = () => {
    setTaskName('');
    setDescription('');
    setBoostLevel('medium');
    setPointValue('10');
    setTimeEstimate('');
    setNotes('');
    setCurrentMood('Normal day');
    setTargetDate('');
  };

  const handleAddTask = () => {
    if (!taskName.trim()) {
      Alert.alert('Error', 'Task name is required');
      return;
    }

    const getEnergyRequirement = (level) => {
      switch(level) {
        case 'easy': return Math.floor(Math.random() * 3) + 1;
        case 'medium': return Math.floor(Math.random() * 3) + 4;
        case 'hard': return Math.floor(Math.random() * 4) + 7;
        default: return 5;
      }
    };

    const getTimeEstimate = (level) => {
      switch(level) {
        case 'easy': return Math.floor(Math.random() * 15) + 5;
        case 'medium': return Math.floor(Math.random() * 30) + 15;
        case 'hard': return Math.floor(Math.random() * 60) + 30;
        default: return 30;
      }
    };

    const taskData = {
      name: taskName.trim(),
      description: description.trim(),
      boostLevel,
      pointValue: parseInt(pointValue) || 10,
      timeEstimate: timeEstimate ? parseInt(timeEstimate) : getTimeEstimate(boostLevel),
      energyRequired: getEnergyRequirement(boostLevel),
      dueDate: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_TASK', payload: taskData });
    resetForm();
    onClose();
  };

  const BoostLevelButton = ({ level, label, color }) => (
    <TouchableOpacity
      style={[
        styles.boostButton,
        boostLevel === level && { backgroundColor: color, borderColor: color }
      ]}
      onPress={() => setBoostLevel(level)}
    >
      <Text style={[
        styles.boostButtonText,
        boostLevel === level && { color: colors.white }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Add New Win</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Quick Templates</Text>
            <View style={styles.templatesContainer}>
              {quickTemplates.map((template, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.templateButton}
                  onPress={() => setTaskName(template.name)}
                >
                  <Ionicons name={template.icon} size={16} color={colors.primary} />
                  <Text style={styles.templateText}>{template.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Win Name</Text>
            <TextInput
              style={styles.input}
              value={taskName}
              onChangeText={setTaskName}
              placeholder="What do you want to accomplish?"
              placeholderTextColor={colors.textSecondary}
            />
            <Text style={styles.helperText}>Keep the focus visible - what's the main thing you want to do?</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Optional details or notes"
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Boost Level</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>
                🔥 {boostLevel === 'easy' ? 'Easy (~5-20 min) - 5 points' : 
                     boostLevel === 'medium' ? 'Medium (~15-45 min) - 10 points' : 
                     'Hard (~30-90 min) - 20 points'}
              </Text>
              <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={styles.helperText}>Points are auto-filled based on boost level</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Mood (Optional)</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{currentMood}</Text>
              <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={styles.helperText}>Your current mood affects point multipliers</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Target Day (Optional)</Text>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={[styles.dropdownText, { color: colors.textSecondary }]}>
                {targetDate || 'dd / mm / yyyy'}
              </Text>
              <Ionicons name="calendar" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={styles.helperText}>When do you want to tackle this? Leave blank for anytime.</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes & Context (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              placeholder="Any important details, reminders, or context you don't want to forget..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={3}
            />
            <Text style={styles.helperText}>Keep important context visible so you don't have to remember it</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTask}
          >
            <Text style={styles.addButtonText}>Add Win</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingBottom: spacing.xl,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.primary,
  },
  form: {
    padding: spacing.lg,
  },
  inputGroup: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    fontSize: 16,
    color: colors.textDark,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  boostContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  boostButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.gray200,
    alignItems: 'center',
  },
  boostButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textDark,
  },
  row: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  templatesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  templateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  templateText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.textDark,
  },
  helperText: {
    fontSize: 12,
    color: colors.secondary,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
});

export default AddTaskModal;