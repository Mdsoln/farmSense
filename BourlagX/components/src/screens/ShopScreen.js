import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Data for packages
const packages = [
  {
    id: '1',
    name: 'Basic Package',
    price: '$50',
    features: [
      '1 Temperature Sensor',
      '1 Soil Moisture Sensor',
      '24/7 Support',
    ],
    description: 'Perfect for small-scale farms and beginners.',
    image: 'https://via.placeholder.com/150?text=Basic+Package',
  },
  {
    id: '2',
    name: 'Premium Package',
    price: '$100',
    features: [
      '2 Temperature Sensors',
      '2 Soil Moisture Sensors',
      '1 Light Sensor',
      'Priority Support',
    ],
    description: 'Ideal for medium-sized farms with additional features.',
    image: 'https://via.placeholder.com/150?text=Premium+Package',
  },
  {
    id: '3',
    name: 'Ultimate Package',
    price: '$200',
    features: [
      '5 Temperature Sensors',
      '5 Soil Moisture Sensors',
      '2 Light Sensors',
      '1 pH Sensor',
      'Dedicated Expert Support',
    ],
    description: 'Comprehensive solution for large-scale farming needs.',
    image: 'https://via.placeholder.com/150?text=Ultimate+Package',
  },
];

// Main component
const ShopScreen = () => {
  const [sortOrder, setSortOrder] = useState('ascending');
  const [sortedData, setSortedData] = useState(packages);

  const handleViewDetails = (pkg) => {
    Alert.alert(
      `${pkg.name} - Details`,
      `Price: ${pkg.price}\n\nFeatures:\n- ${pkg.features.join('\n- ')}\n\n${pkg.description}`,
      [
        {
          text: 'Subscribe',
          onPress: () =>
            Alert.alert('Subscribed', `You have subscribed to the ${pkg.name}.`),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSortChange = () => {
    const sorted = [...packages].sort((a, b) => {
      const priceA = parseFloat(a.price.replace('$', ''));
      const priceB = parseFloat(b.price.replace('$', ''));

      return sortOrder === 'ascending' ? priceA - priceB : priceB - priceA;
    });

    setSortedData(sorted);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the Best Package for Your Needs 🧺</Text>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <Picker
          selectedValue={sortOrder}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSortOrder(itemValue);
            handleSortChange();
          }}
        >
          <Picker.Item label="Ascending Price" value="ascending" />
          <Picker.Item label="Descending Price" value="descending" />
        </Picker>
      </View>

      {sortedData.length > 0 ? (
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <Text style={styles.productDetails}>{item.description}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleViewDetails(item)}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.info}>No packages available</Text>
      )}
    </View>
  );
};
// Styles
const styles = StyleSheet.create({
  // Main container for the screen
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  
  // Title at the top of the screen
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center', // Centers the title
  },
  
  // Sort container for the "Sort by" section
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24, // Increase margin for spacing
    paddingHorizontal: 8,
    zIndex: 1, // Ensures dropdown appears on top
  },
  
  // Label for sort dropdown
  sortLabel: {
    fontSize: 16,
    marginRight: 8,
    color: '#333', // Slightly darker for better contrast
  },
  
  // Picker dropdown style
  picker: {
    flex: 1,
    height: 40,
    minWidth: 150,
    backgroundColor: '#fff', // Add background to ensure visibility
    elevation: 2, // Add shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Card style for each product
  productCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // Adds slight shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  
  // Image style inside the product card
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 8,
    borderRadius: 8,
  },
  
  // Product name style
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  
  // Product price style
  productPrice: {
    fontSize: 18,
    color: '#888',
    marginBottom: 8,
  },
  
  // Product details style
  productDetails: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  
  // Button style for "View Details"
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  // Button text style
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Info text for empty or loading states
  info: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});


export default ShopScreen;
