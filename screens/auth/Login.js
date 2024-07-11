import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import InputField from "../../components/Forms/InputFiled";
import Button from "../../components/Forms/Button";
import { useNavigation } from "@react-navigation/native";
import { login } from '../../auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      await login(email, password);
      navigation.navigate('Dashboard');
    } catch (err) {
      setError(err.message);
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <InputField placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <InputField
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        leftIcon="🔒"
        isClickable={true}
        leftImagePresent={false}
        rightImagePresent={false}
      />
      <Text
        style={styles.forgotPasswordText}
        onPress={() => alert("Forgot password clicked")}
      >
        Forgot Password?
      </Text>
      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text
          style={styles.signupTextRed}
          onPress={() => navigation.navigate("Register")}
        >
          Sign up.
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
  forgotPasswordText: {
    marginTop: 10,
    textAlign: "right",
    color: "blue",
  },
  signupText: {
    marginTop: 20,
    textAlign: "center",
  },
  signupTextRed: {
    color: "red",
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Login;
