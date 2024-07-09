import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Register from "./screens/auth/Register";
import Login from "./screens/auth/Login";
import Homescreen from "./screens/Homescreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Dashboard from "./components/Dashboard";
import SelectTestScreen from "./screens/SelectTestScreen";
import SelectProvinceScreen from "./screens/SelectProvinceScreen";
import SelectQuizNo from "./screens/SelectQuizNo";
import QuizDetails from "./screens/QuizDetails";
import Quiz from "./screens/Quiz";
import ResultScreen from "./screens/ResultScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ResultDetailsScreen from "./screens/ResultDetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Aboutus from "./screens/Aboutus";
import QuizHistory from './screens/QuizHistory';

const Stack = createNativeStackNavigator();
export default function App() {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={!user ? "Register" : "Dashboard"}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerStyle: {
                backgroundColor: "#F0547A", // Set the background color here
              },
              headerTintColor: "#fff",
              statusBarColor: "#F0547A",
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerStyle: {
                backgroundColor: "#F0547A", // Set the background color here
              },
              headerTintColor: "#fff",
              statusBarColor: "#F0547A",
            }}
          />
          <Stack.Screen
            name="About us"
            component={Aboutus}
            options={{
              headerStyle: {
                backgroundColor: "#F0547A", // Set the background color here
              },
              headerTintColor: "#fff",
              statusBarColor: "#F0547A",
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false, statusBarColor: "#F0547A" }}
          />
          <Stack.Screen
            name="Select Test"
            component={SelectTestScreen}
            options={{
              headerStyle: {
                backgroundColor: "#F0547A", // Set the background color here
              },
              headerTintColor: "#fff",
              statusBarColor: "#F0547A",
            }}
          />
          <Stack.Screen
            name="Select Quiz No"
            component={SelectQuizNo}
            options={{
              headerStyle: {
                backgroundColor: "#F0547A", // Set the background color here
              },
              headerTintColor: "#fff",
              statusBarColor: "#F0547A",
            }}
          />
          <Stack.Screen
            name="Test Details"
            component={QuizDetails}
            options={{
              headerStyle: {
                backgroundColor: "#F0547A", // Set the background color here
              },
              headerTintColor: "#fff",
              statusBarColor: "#F0547A",
            }}
          />
          <Stack.Screen
            name="Result Details"
            component={ResultDetailsScreen}
            options={{
              headerStyle: {
                backgroundColor: "#F0547A", // Set the background color here
              },
              headerTintColor: "#fff",
              statusBarColor: "#F0547A",
            }}
          />
          <Stack.Screen
            name="Profile Screen"
            component={ProfileScreen}
            options={{
              headerStyle: {
                backgroundColor: "#F0547A", // Set the background color here
              },
              headerTintColor: "#fff",
              statusBarColor: "#F0547A",
            }}
          />
          <Stack.Screen
            name="Quiz"
            options={{ headerShown: false, statusBarColor: "#f64e60" }}
            component={Quiz}
          />
          <Stack.Screen
            name="Select Provience"
            component={SelectProvinceScreen}
            options={{
              headerStyle: {
                backgroundColor: "#F0547A", // Set the background color here
              },
              headerTintColor: "#fff",
              statusBarColor: "#F0547A",
            }}
          />
          <Stack.Screen
            name="Result"
            component={ResultScreen}
            options={{ headerShown: false, statusBarColor: "#000029" }}
          />
          <Stack.Screen name="QuizHistory" component={QuizHistory} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
