import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Button, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState('Your Name');
  const [profilePic, setProfilePic] = useState(null);
  const [language, setLanguage] = useState('English');
  const [cartItems, setCartItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Toggle Dark Mode
  const handleToggleDarkMode = () => setIsDarkMode((prevState) => !prevState);

  // Save settings
  const handleSaveSettings = async () => {
    if (username.trim() === '') {
      Alert.alert('Validation Error', 'Username cannot be empty.');
      return;
    }

    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('profilePic', profilePic || '');
      await AsyncStorage.setItem('language', language);
      Alert.alert('Settings Saved', 'Your settings have been saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'There was an issue saving your settings.');
    }
  };

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedDarkMode = await AsyncStorage.getItem('darkMode');
        const savedUsername = await AsyncStorage.getItem('username');
        const savedProfilePic = await AsyncStorage.getItem('profilePic');
        const savedLanguage = await AsyncStorage.getItem('language');
        const savedCartItems = await AsyncStorage.getItem('cartItems');

        if (savedDarkMode !== null) setIsDarkMode(JSON.parse(savedDarkMode));
        if (savedUsername !== null) setUsername(savedUsername);
        if (savedProfilePic !== null) setProfilePic(savedProfilePic);
        if (savedLanguage !== null) setLanguage(savedLanguage);
        if (savedCartItems !== null) setCartItems(JSON.parse(savedCartItems));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  // Pick image from gallery
  const handlePickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission required', 'You need to enable permission to access the camera roll.');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!pickerResult.cancelled) {
      setProfilePic(pickerResult.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Settings</Text>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Profile</Text>
        <View style={styles.profileContainer}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profilePic} />
          ) : (
            <View style={styles.profilePicPlaceholder}>
              <Text style={styles.profilePicText}>No Image</Text>
            </View>
          )}
          <TouchableOpacity onPress={handlePickImage}>
            <Text style={styles.profilePicButton}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Username and Edit Icon */}
        <View style={styles.usernameContainer}>
          {isEditing ? (
            <TextInput
              style={[styles.input, isDarkMode && styles.darkInput]}
              value={username}
              onChangeText={setUsername}
              onBlur={() => setIsEditing(false)}
              autoFocus
            />
          ) : (
            <>
              <Text style={[styles.username, isDarkMode && styles.darkText]}>{username}</Text>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Ionicons name="pencil" size={20} color={isDarkMode ? '#fff' : '#000'} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Cart Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Cart</Text>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <View key={index} style={styles.cartItem}>
              <Text style={[styles.cartItemText, isDarkMode && styles.darkText]}>{item.name}</Text>
            </View>
          ))
        ) : (
          <Text style={[styles.cartEmpty, isDarkMode && styles.darkText]}>Your cart is empty.</Text>
        )}
      </View>

      {/* Language Selection */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Language</Text>
        <Picker
          selectedValue={language}
          style={[styles.picker, isDarkMode && styles.darkPicker]}
          onValueChange={(itemValue) => setLanguage(itemValue)}>
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Spanish" value="Spanish" />
          <Picker.Item label="French" value="French" />
        </Picker>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={handleToggleDarkMode}
          thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      {/* Save Button */}
      <Button title="Save Settings" onPress={handleSaveSettings} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  darkText: {
    color: '#fff',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  profilePicPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicText: {
    color: '#fff',
  },
  profilePicButton: {
    color: '#007bff',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  username: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  darkInput: {
    backgroundColor: '#555',
    borderColor: '#666',
  },
  picker: {
    height: 50,
  },
  darkPicker: {
    color: '#fff',
    backgroundColor: '#444',
  },
  cartItem: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 4,
    marginBottom: 5,
  },
  cartItemText: {
    color: '#333',
  },
  cartEmpty: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
  },
});

export default SettingsScreen;
