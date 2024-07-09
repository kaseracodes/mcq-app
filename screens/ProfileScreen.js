// ProfileScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

export default function ProfileScreen({ route, navigation }) {
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState("David");
  const [email, setEmail] = useState("abcd@gmail.com");

  const handleButtonPress = () => {
    if (isEditable) {
      // Save functionality can be added here if needed
    }
    setIsEditable(!isEditable);
  };
  const { user } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello</Text>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Image
            source={require("../assets/pencil.png")}
            style={styles.editImage}
          />
        </TouchableOpacity>
        {/* <Text style={styles.profileName}>{user.displayName}</Text> */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Name</Text>
          <TextInput
            style={[styles.fieldValue, isEditable && styles.editableField]}
            value={name}
            editable={isEditable}
            onChangeText={setName}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            style={[styles.fieldValue, isEditable && styles.editableField]}
            value={email}
            editable={isEditable}
            onChangeText={setEmail}
          />
        </View>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleButtonPress}
        >
          <Text style={styles.updateButtonText}>
            {isEditable ? "Save" : "Update"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 80,
    backgroundColor: "#FF0050",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  editIcon: {
    position: "absolute",
    top: 60,
    right: "35%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
  },
  editImage: {
    width: 20,
    height: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  fieldContainer: {
    width: "80%",
    marginVertical: 10,
  },
  fieldLabel: {
    color: "#888",
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },
  editableField: {
    borderBottomColor: "#FF0050",
  },
  updateButton: {
    marginTop: 30,
    width: "80%",
    padding: 15,
    backgroundColor: "#FF0050",
    borderRadius: 25,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
