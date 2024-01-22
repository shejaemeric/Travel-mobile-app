import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import countryData from "./countryData";
import { getFlights } from "../../crud";

export default function DestinationForm() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await getFlights({ destination, origin });
      navigation.navigate("tickets", {
        flightData: res.data,
        origin: origin,
        destination: destination,
      });
    } catch (error) {
      showError("Error occurred during call" + error);
    }
  };

  const showError = (errorMessage) => {
    setError(errorMessage);
    // Reset the error state after 5 seconds
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Let's Discover</Text>
        <Picker
          selectedValue={origin}
          onValueChange={(itemValue) => setOrigin(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select Origin" value="" />
          {countryData
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <Picker.Item
                label={item.name}
                value={item.airport}
                key={item.id}
              />
            ))}
        </Picker>
        <Picker
          selectedValue={destination}
          onValueChange={(itemValue) => setDestination(itemValue)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Select Destination" value="" />
          {countryData
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => (
              <Picker.Item
                label={item.name}
                value={item.airport}
                key={item.id}
              />
            ))}
        </Picker>
        <Button title="Submit" onPress={handleSearch} />
      </View>
      {/* view for error */}
      <View style={styles.errorContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  formContainer: {
    padding: 16,
    width: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  picker: {
    height: 40,
    backgroundColor: "#fff",
    borderColor: "#333",
    borderWidth: 1,
    marginBottom: 10,
    color: "#333",
  },
  pickerItem: {
    color: "#333",
  },
  datePickerButton: {
    height: 50,
    marginBottom: 10,
    padding: 8,
    justifyContent: "center",
    color: "#333",
    backgroundColor: "white",
  },
  datePickerText: {
    textAlign: "center",
    color: "#333",
  },
  errorContainer: {
    position: "absolute",
    top: 50,
    right: 10,
  },
  errorText: {
    color: "#333",
    backgroundColor: "#ffcc00",
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
  },
});
