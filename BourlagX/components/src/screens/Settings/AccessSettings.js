import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  Switch,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { lightTheme, darkTheme } from '../theme'; // Adjust paths as necessary
import { Appearance } from 'react-native';
import i18n from 'i18next'; // Import i18n for language changes

export default class AccessSettings extends Component {
  state = {
    notificationsEnabled: false,
    remindersEnabled: false,
    symptoms: '',
    medication: '',
    notes: '',
    isDarkMode: false,
    theme: lightTheme,
    feedback: '',
    language: 'English',
    languages: [
      'English',
      'Kiswahili',
      'Spanish',
      'French',
      'German',
      'Chinese',
      'Italian',
      'Portuguese',
      'Russian',
      'Japanese',
      'Korean',
      'Arabic',
      'Turkish',
      'Hindi',
      'Bengali',
      'Urdu',
    ],
  };

  componentDidMount() {
    const scheme = Appearance.getColorScheme();
    this.setState({
      isDarkMode: scheme === 'dark',
      theme: scheme === 'dark' ? darkTheme : lightTheme,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isDarkMode !== this.state.isDarkMode) {
      this.setState({
        theme: this.state.isDarkMode ? darkTheme : lightTheme,
      });
    }
  }

  toggleSwitch = (setting) => {
    this.setState((prevState) => ({
      [setting]: !prevState[setting],
    }));
  };

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  };

  saveSettings = () => {
    Alert.alert('Settings Saved!', JSON.stringify(this.state, null, 2));
  };

  logOut = () => {
    Alert.alert('Logged Out', 'You have been logged out successfully.');
  };

  deleteAccount = () => {
    Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
  };

  contactUs = () => {
    Alert.alert('Contact Us', 'Email us at support@example.com');
  };

  editProfile = () => {
    Alert.alert('Edit Profile', 'Edit your profile functionality goes here.');
  };

  changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change language functionality
    this.setState({ language: lang });
  };

  render() {
    const {
      notificationsEnabled,
      remindersEnabled,
      symptoms,
      medication,
      notes,
      isDarkMode,
      theme,
      languages,
      language,
    } = this.state;

    return (
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Notifications Toggle */}
        <View style={styles.settingContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => this.toggleSwitch('notificationsEnabled')}
          />
        </View>

        {/* Reminders Toggle */}
        <View style={styles.settingContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>Reminders</Text>
          <Switch
            value={remindersEnabled}
            onValueChange={() => this.toggleSwitch('remindersEnabled')}
          />
        </View>

        {/* Symptom Tracking */}
        <View style={styles.settingContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>Track Symptoms</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.border, color: theme.text }]}
            placeholder="Enter symptoms (e.g., mood swings)"
            placeholderTextColor={theme.description}
            value={symptoms}
            onChangeText={(text) => this.handleInputChange('symptoms', text)}
          />
        </View>

        {/* Medication Tracking */}
        <View style={styles.settingContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>Track Medication</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.border, color: theme.text }]}
            placeholder="Enter medication (e.g., pain relievers)"
            placeholderTextColor={theme.description}
            value={medication}
            onChangeText={(text) => this.handleInputChange('medication', text)}
          />
        </View>

        {/* Notes Section */}
        <View style={styles.settingContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>Notes</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.border, color: theme.text }]}
            placeholder="Add personal notes..."
            placeholderTextColor={theme.description}
            value={notes}
            onChangeText={(text) => this.handleInputChange('notes', text)}
          />
        </View>

        {/* Language Selection */}
        <View style={styles.settingContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>Language</Text>
          <Picker
            selectedValue={language}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => this.changeLanguage(itemValue)}
          >
            {languages.map((lang, index) => (
              <Picker.Item key={index} label={lang} value={lang} />
            ))}
          </Picker>
        </View>

        {/* Dark Mode Toggle */}
        <View style={styles.settingContainer}>
          <Text style={[styles.settingTitle, { color: theme.text }]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => this.toggleSwitch('isDarkMode')}
          />
        </View>

        {/* Additional Settings Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="About" onPress={() => Alert.alert('About', 'Information about the app')} color={theme.button} />
          <Button title="Terms and Conditions" onPress={() => Alert.alert('Terms and Conditions', 'Terms details here')} color={theme.button} />
          <Button title="Privacy Policy" onPress={() => Alert.alert('Privacy Policy', 'Privacy details here')} color={theme.button} />
          <Button title="Tutorial" onPress={() => Alert.alert('Tutorial', 'Tutorial information here')} color={theme.button} />
          <Button title="Log Out" onPress={this.logOut} color={theme.button} />
          <Button title="Delete Account" onPress={this.deleteAccount} color={theme.button} />
          <Button title="Contact Us" onPress={this.contactUs} color={theme.button} />
        </View>

        <Button title="Save Settings" onPress={this.saveSettings} color={theme.button} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingContainer: {
    marginBottom: 15,
  },
  settingTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 10, // Adjust spacing between buttons
  },
});
