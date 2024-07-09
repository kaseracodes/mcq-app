import React, { useState, useEffect, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Modal from "react-native-modal";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { getAuth } from "firebase/auth";
import { logout } from "../auth";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../FirebaseConfig'; // Adjust the path according to your file structure

export default function Dashboard({ navigation }) {
  const [user, setUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [greeting, setGreeting] = useState("Good Afternoon");
  const [greetingIcon, setGreetingIcon] = useState(
    require("../assets/afternoon.png")
  );
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleModal = () => {
    console.log("clicked");
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const auth = getAuth();
    console.log(auth);
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }

    const updateGreeting = () => {
      console.log(new Date().getHours());
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour <= 12) {
        setGreeting("Good Morning");
        setGreetingIcon(require("../assets/morning.png"));
      } else if (currentHour > 12 && currentHour <= 19) {
        setGreeting("Good Afternoon");
        setGreetingIcon(require("../assets/afternoon.png"));
      } else {
        setGreeting("Good Evening");
        setGreetingIcon(require("../assets/evening.png"));
      }
    };

    updateGreeting();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        try {
          const user = auth.currentUser;
          const q = query(collection(db, "quizHistory"), where("userID", "==", user.uid));
          const querySnapshot = await getDocs(q);
          
          const fetchedHistory = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setHistory(fetchedHistory);
        } catch (error) {
          console.error("Error fetching quiz history: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchHistory();
    }, [])
  );

  const handleSignOut = async () => {
    await logout();
    navigation.navigate("Login");
  };

  const navAllTest = () => {
    navigation.navigate("Select Test");
  };

  const goSelectPro = ( testType ) => {
    navigation.navigate("Select Provience", { testType });
  };
  const goProfilePage = (user) => {
    console.log("hi");
    navigation.navigate("Profile Screen", { user });
  };
  const goAboutUs = () => {
    navigation.navigate("About us", { user });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="apps" size={30} color="white" onPress={toggleModal} />
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Modal
          isVisible={isModalVisible}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          onBackdropPress={toggleModal}
          style={styles.modal}
        >
          <View style={styles.sidebar}>
            <View style={styles.profileContainer}>
              <View style={styles.profileIcon} />
              <Text style={styles.name}>hi</Text>
              {/* <Text style={styles.email}>{user.email}</Text> */}
            </View>
            <TouchableOpacity style={styles.menuItem}>
              <Text
                style={styles.menuText}
                onPress={() => navigation.navigate("Dashboard")}
              >
                Home
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text
                style={styles.menuText}
                onPress={() => navigation.navigate("Select Test")}
              >
                Select Test
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Tests History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Subscription</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={goAboutUs}>
              <Text style={styles.menuText}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText} onPress={handleSignOut}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => goProfilePage(user)}>
          <Image
            source={require("../assets/profile.png")}
            style={styles.profileIconDas}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.greetingContainer}>
        <Image source={greetingIcon} style={styles.greetingIcon} />
        <View>
          <Text style={styles.greetingText}>{greeting}</Text>
          {user ? (
            <Text style={styles.userName}>{user.displayName}</Text>
          ) : (
            <Text>Loading user profile...</Text>
          )}
        </View>
        <Image
          style={styles.userProfilePicture}
          source={{
            uri: "https://www.countryflags.com/wp-content/uploads/canada-flag-png-large.png",
          }}
        />
      </View>
      <TouchableOpacity 
        style={styles.quizStatsContainer}
        onPress={() => navigation.navigate('QuizHistory')}
    >
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Quizzes Taken</Text>
          <Text style={styles.statValue}>{history.length}</Text>
        </View>
        <View style={styles.statBox2}>
          <Text style={styles.statLabel}>Quiz History</Text>
          <Text style={styles.statValue}>0/100</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.testSelectionContainer}>
        <View style={styles.testSelectionHeader}>
          <Text style={styles.testSelectionTitle}>Select Test</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText} onPress={navAllTest}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <TouchableOpacity
            style={styles.testCard}
            onPress={() => goSelectPro("Citizenship Test")}
          >
            <Image
              style={styles.testIcon}
              source={{
                uri: "https://www.countryflags.com/wp-content/uploads/canada-flag-png-large.png",
              }}
            />
            <Text style={styles.testCardText}>Citizenship Test</Text>
            <Icon name="chevron-right" type="entypo" color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.testCard}
            onPress={() => goSelectPro("Driving Test")}
          >
            <Image
              style={styles.testIcon}
              source={{ uri: "https://img.icons8.com/color/452/car.png" }}
            />
            <Text style={styles.testCardText}>Driving Test</Text>
            <Icon name="chevron-right" type="entypo" color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.testCard}
            onPress={() => goSelectPro("Road Test")}
          >
            <Image
              style={styles.testIcon}
              source={{
                uri: "https://img.icons8.com/ios-filled/50/000000/road.png",
              }}
            />
            <Text style={styles.testCardText}>Road Test</Text>
            <Icon name="chevron-right" type="entypo" color="white" />
          </TouchableOpacity>
        </ScrollView>

        {/* Add more test cards as needed */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0547A",
  },
  modal: {
    margin: 0,
  },
  sidebar: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    width: "80%",
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  profileIconDas: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#F0547A",
  },
  headerTitle: {
    color: "white",
    fontSize: 26,
    marginRight: 120,
  },
  greetingContainer: {
    alignItems: "center",
    marginVertical: 20,
    flexDirection: "row",
    marginLeft: 20,
    marginBottom: 50,
    marginTop: 40,
  },
  greetingText: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    letterSpacing: 2,
  },
  greetingIcon: {
    width: 60,
    height: 60,
  },
  userName: {
    color: "#FFFDD0",
    fontSize: 27,
    fontWeight: "bold",
    marginLeft: 10,
  },
  userProfilePicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 80,
  },
  quizStatsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#1D1B27",
    borderRadius: 25,
    marginHorizontal: 20,
    paddingVertical: 30,
    paddingHorizontal: 50,
  },
  statBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  statBox2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  statValue: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    width: 100,
    color: "#F0547A",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  testSelectionContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    marginHorizontal: 20,
  },
  testSelectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  testSelectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  seeAllText: {
    color: "#F0547A",
    fontSize: 16,
  },
  testCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D1B27",
    borderRadius: 10,
    padding: 25,
    marginVertical: 10,
  },
  testIcon: {
    width: 70,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  testCardText: {
    flex: 1,
    color: "white",
    fontSize: 20,
  },
});
