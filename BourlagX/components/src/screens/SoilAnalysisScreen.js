import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Modal, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { ProgressBar } from 'react-native-paper';  
import PushNotification from 'react-native-push-notification'; // For notifications

const { width } = Dimensions.get('window');

// Initial state for useReducer
const initialState = {
  phLevel: 6.5,
  moistureLevel: 40,
  temperature: 25,
  analysisResult: '',
  loading: false,
  progress: 0,
  modalVisible: false,
  history: [],
  plantType: '',
  recommendations: '',
  weatherUpdate: '',
  equipmentStatus: 'All systems operational',
  cropStatus: 'Healthy',
  communityUpdate: 'No new updates',
  reminders: [],
};

// Reducer function
const soilAnalysisReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.value };
    case 'SET_PROGRESS':
      return { ...state, progress: action.value };
    case 'SET_ANALYSIS_RESULT':
      return { ...state, analysisResult: action.result };
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.value };
    case 'SET_MODAL_VISIBLE':
      return { ...state, modalVisible: action.value };
    case 'SET_HISTORY':
      return { ...state, history: action.history };
    case 'SET_PLANT_TYPE':
      return { ...state, plantType: action.value };
    case 'SET_WEATHER':
      return { ...state, weatherUpdate: action.value };
    case 'SET_EQUIPMENT_STATUS':
      return { ...state, equipmentStatus: action.value };
    case 'SET_CROP_STATUS':
      return { ...state, cropStatus: action.value };
    case 'SET_COMMUNITY_UPDATE':
      return { ...state, communityUpdate: action.value };
    case 'SET_REMINDERS':
      return { ...state, reminders: action.reminders };
    default:
      return state;
  }
};

const SoilAnalysisScreen = () => {
  const [state, dispatch] = useReducer(soilAnalysisReducer, initialState);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedData = await AsyncStorage.getItem('soilAnalysisHistory');
        const parsedData = storedData ? JSON.parse(storedData) : [];
        dispatch({ type: 'SET_HISTORY', history: parsedData });
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    const fetchWeather = () => {
      // Simulating a weather API call
      const weather = "Clear skies, 25°C, slight breeze";
      dispatch({ type: 'SET_WEATHER', value: weather });
    };

    const fetchEquipmentStatus = () => {
      // Simulating equipment monitoring
      const status = "All systems operational";
      dispatch({ type: 'SET_EQUIPMENT_STATUS', value: status });
    };

    const fetchCropStatus = () => {
      // Simulating crop health monitoring
      const status = "Crops are healthy";
      dispatch({ type: 'SET_CROP_STATUS', value: status });
    };

    const fetchCommunityUpdates = () => {
      // Simulating community updates
      const updates = "New farming tips available in the community section.";
      dispatch({ type: 'SET_COMMUNITY_UPDATE', value: updates });
    };

    fetchHistory();
    fetchWeather();
    fetchEquipmentStatus();
    fetchCropStatus();
    fetchCommunityUpdates();
  }, []);

  // Reminder function using push notifications
  const setReminder = (message, timeInSeconds) => {
    PushNotification.localNotificationSchedule({
      message: message,
      date: new Date(Date.now() + timeInSeconds * 1000),
    });

    // Adding reminder to state for UI
    dispatch({
      type: 'SET_REMINDERS',
      reminders: [...state.reminders, { message, time: new Date().toLocaleString() }],
    });
  };

  const generateSensorData = () => {
    const ph = (Math.random() * (7.5 - 5) + 5).toFixed(2);
    const moisture = Math.floor(Math.random() * 101);
    const temp = Math.floor(Math.random() * (35 - 15 + 1) + 15);
    return { ph, moisture, temp };
  };

  const handleSoilAnalysis = async () => {
    dispatch({ type: 'SET_LOADING', value: true });
    dispatch({ type: 'SET_PROGRESS', value: 0 });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      dispatch({ type: 'SET_PROGRESS', value: progress });
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 1000);

    const { ph, moisture, temp } = generateSensorData();
    let result = 'Soil Analysis Results:\n\n';

    result += ph < 6.0 ? 'Soil is acidic. Consider adding lime.\n' :
               ph > 7.5 ? 'Soil is alkaline. Consider adding sulfur.\n' :
               'Soil pH is optimal for most plants.\n';

    result += moisture < 30 ? 'Soil is too dry. Consider watering.\n' :
               moisture > 60 ? 'Soil is too wet. Consider improving drainage.\n' :
               'Soil moisture is within the ideal range.\n';

    result += temp < 15 ? 'Soil temperature is too low. Consider providing warmth.\n' :
               temp > 30 ? 'Soil temperature is too high. Consider providing shade.\n' :
               'Soil temperature is in the ideal range for most plants.\n';

    dispatch({ type: 'SET_ANALYSIS_RESULT', result });

    storeAnalysisData(ph, moisture, temp, result);
  };

  const storeAnalysisData = async (ph, moisture, temp, result) => {
    try {
      const analysis = { ph, moisture, temp, result, timestamp: new Date().toISOString() };
      const storedData = await AsyncStorage.getItem('soilAnalysisHistory');
      const data = storedData ? JSON.parse(storedData) : [];
      data.push(analysis);
      await AsyncStorage.setItem('soilAnalysisHistory', JSON.stringify(data));
      dispatch({ type: 'SET_LOADING', value: false });
      dispatch({ type: 'SET_MODAL_VISIBLE', value: true });
      dispatch({ type: 'SET_HISTORY', history: data });
    } catch (error) {
      console.error('Error storing data:', error);
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  const renderPieChart = () => {
    const data = [
      { name: 'pH', population: state.phLevel, color: '#ff6666' },
      { name: 'Moisture', population: state.moistureLevel, color: '#66cc66' },
      { name: 'Temperature', population: state.temperature, color: '#3399ff' }
    ];
    return <PieChart data={data} width={width} height={220} chartConfig={{ backgroundColor: '#fff' }} accessor="population" backgroundColor="transparent" />;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Soil Analysis</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter plant type (e.g., Rose, Cactus)"
        value={state.plantType}
        onChangeText={(text) => dispatch({ type: 'SET_PLANT_TYPE', value: text })}
      />

      <Button title="Analyze Soil" onPress={handleSoilAnalysis} />

      {state.loading && (
        <View style={styles.progressContainer}>
          <ProgressBar progress={state.progress / 100} color="#3b5998" />
        </View>
      )}

      {state.analysisResult && !state.loading && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{state.analysisResult}</Text>
          {state.recommendations && <Text style={styles.recommendationsText}>{state.recommendations}</Text>}
          {renderPieChart()}
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text>Weather Update: {state.weatherUpdate}</Text>
        <Text>Equipment Status: {state.equipmentStatus}</Text>
        <Text>Crop Status: {state.cropStatus}</Text>
        <Text>Community Update: {state.communityUpdate}</Text>
      </View>

      <TouchableOpacity onPress={() => setReminder('Time to water your plants!', 10)}>
        <Text style={styles.reminderButton}>Set Reminder</Text>
      </TouchableOpacity>

      <Modal visible={state.modalVisible} onRequestClose={() => dispatch({ type: 'SET_MODAL_VISIBLE', value: false })}>
        <ScrollView>
          <Text style={styles.historyTitle}>Analysis History</Text>
          {state.history.length === 0 ? (
            <Text>No history available</Text>
          ) : (
            state.history.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text>{item.timestamp}</Text>
                <Text>{item.result}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </Modal>

      <View style={styles.remindersContainer}>
        <Text style={styles.remindersTitle}>Reminders</Text>
        {state.reminders.length === 0 ? (
          <Text>No reminders set</Text>
        ) : (
          state.reminders.map((reminder, index) => (
            <Text key={index}>{reminder.message} at {reminder.time}</Text>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20 },
  progressContainer: { marginTop: 20 },
  resultContainer: { marginTop: 20 },
  resultText: { fontSize: 16 },
  recommendationsText: { fontSize: 14, color: 'green' },
  infoContainer: { marginTop: 20 },
  reminderButton: { marginTop: 20, padding: 10, backgroundColor: '#3b5998', color: '#fff' },
  historyTitle: { fontSize: 18, fontWeight: 'bold' },
  historyItem: { marginBottom: 10 },
  remindersContainer: { marginTop: 20 },
  remindersTitle: { fontSize: 18, fontWeight: 'bold' },
});

export default SoilAnalysisScreen;
