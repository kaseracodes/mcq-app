import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import InputField from "../../components/Forms/InputFiled";
import Button from "../../components/Forms/Button";
import { useNavigation } from "@react-navigation/native";
import { getAuth, updateProfile } from "firebase/auth";
import { signUp } from '../../auth.js';
import { syncFirebaseToSQLite } from '../../sync';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const updateUserProfile = async (displayName, photoURL) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      try {
        await updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL
        });
        console.log("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    } else {
      console.log("No user is signed in.");
    }
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const user = await signUp(email, password);
      await updateUserProfile(name);
      Alert.alert("Success", "Verification email sent! Please check your inbox.");
      navigation.navigate('Login');
      await syncFirebaseToSQLite();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <InputField placeholder="Name" onChangeText={(text) => setName(text)} />
      <InputField placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <InputField
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <InputField
        placeholder="Confirm Password"
        secureTextEntry={true}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text
          style={styles.loginTextRed}
          onPress={() => navigation.navigate("Login")}
        >
          Log in.
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  loginText: {
    marginTop: 20,
    textAlign: "center",
  },
  loginTextRed: {
    color: "red",
  },
});

export default Register;
