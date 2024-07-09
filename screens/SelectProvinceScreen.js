import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const SelectProvinceScreen = ({ route, navigation }) => {
  const { testType } = route.params;
  console.log("Printing in SelectProvinceScreen Page: ", testType );
  
  const provinces = [
    {
      name: "New Brunswick",
      image: require("../assets/dum.png"),
    },
    {
      name: "Quebec",
      image: require("../assets/dum.png"),
    },
    {
      name: "Ontario",
      image: require("../assets/dum.png"),
    },
    {
      name: "Newfoundland and Labrador",
      image: require("../assets/dum.png"),
    },
    {
      name: "Manitoba",
      image: require("../assets/dum.png"),
    },
    {
      name: "Nova Scotia",
      image: require("../assets/dum.png"),
    },
    {
      name: "Prince Edward Island",
      image: require("../assets/dum.png"),
    },
    {
      name: "Alberta",
      image: require("../assets/dum.png"),
    },
  ];

  const handlePress = (testType, province) => {
    navigation.navigate("Select Quiz No", { testType, province });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {provinces.map((province, index) => (
          <TouchableOpacity
            key={index}
            style={styles.provinceItem}
            onPress={() => handlePress(testType, province.name)}
          >
            <Image source={province.image} style={styles.provinceImage} />
            <Text style={styles.provinceText}>{province.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000029", // Dark blue background
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FF007F", // Pink header background
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF", // White back icon
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
  },
  scrollContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 8,
  },
  provinceItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    margin: 8,
    alignItems: "center",
    width: 170,
    height: 150,
    padding: 16,
    marginBottom: 50,
  },
  provinceImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    marginTop: -40,
    borderRadius: 10,
  },
  provinceText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default SelectProvinceScreen;
