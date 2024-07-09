// src/UserProfile.js
import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: "https://via.placeholder.com/100" }} // Replace with your image URL
        />
        <TouchableOpacity style={styles.editIconContainer}>
          <Image
            style={styles.editIcon}
            source={{ uri: "https://via.placeholder.com/20" }} // Replace with your edit icon URL
          />
        </TouchableOpacity>
        <Text style={styles.username}>David</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Name</Text>
        <Text style={styles.infoText}>David</Text>
        <Text style={styles.infoTitle}>Email</Text>
        <Text style={styles.infoText}>abcd@gmail.com</Text>
      </View>
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    backgroundColor: "#ff0066",
    padding: 16,
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 140,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 5,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  infoTitle: {
    color: "#888",
    fontSize: 16,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 15,
  },
  updateButton: {
    marginTop: 30,
    backgroundColor: "#FA1361",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default ProfilePage;
