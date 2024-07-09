import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const SelectTestScreen = ({ navigation }) => {
  const goSelectPro = (testType) => {
    navigation.navigate("Select Provience", { testType });
  };

  return (
    <View style={styles.container}>
      <View style={styles.testContainer}>
        <TouchableOpacity
          style={styles.testItem}
          onPress={() => goSelectPro("Citizenship Test")}
        >
          <Image
            source={{
              uri: "https://www.countryflags.com/wp-content/uploads/canada-flag-png-large.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.testText}>Citizenship Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.testItem}
          onPress={() => goSelectPro("Driving Test")}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/color/452/car.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.testText}>Driving Test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.testItem}
          onPress={() => goSelectPro("Road Test")}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/000000/road.png",
            }}
            style={styles.icon}
          />
          <Text style={styles.testText}>Road Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF007F",
    textAlign: "center",
  },
  testContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
  testItem: {
    alignItems: "center",
    margin: 16,
    marginRight: 45,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  testText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SelectTestScreen;
