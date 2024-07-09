import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const Homescreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.menuIcon}>
          <MaterialIcons name="menu" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profilePic}>
          <MaterialIcons name="account-circle" size={50} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.greetingText}>Hello, Username</Text>
        <MaterialIcons name="account-circle" size={50} color="black" />
      </View>
      <View style={styles.roundedContainer}>
        <Text style={styles.containerText}>Text 1</Text>
        <Text style={styles.containerText}>Text 2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FA1361",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  menuIcon: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 20,
  },
  profilePic: {
    borderRadius: 25,
    overflow: "hidden",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingText: {
    marginRight: 10,
  },
  roundedContainer: {
    backgroundColor: "lightgray",
    borderRadius: 20,
    padding: 20,
  },
  containerText: {
    marginBottom: 10,
  },
});

export default Homescreen;
