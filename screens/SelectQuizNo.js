import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../FirebaseConfig';

const SelectQuizNo = ({ route, navigation }) => {
  const { testType, province } = route.params;
  const [quizIDs, setQuizIDs] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("Printing in SelectQuizNo Page: ", testType, province );

  useEffect(() => {
    const fetchQuizIDs = async () => {
      try {
        // Fetch quizIDs from testTypes collection
        const testTypesQuery = query(collection(db, "testTypes"), where("testType", "==", testType));
        const testTypesSnapshot = await getDocs(testTypesQuery);
        
        let testTypeQuizIDs = [];
        testTypesSnapshot.forEach((doc) => {
          testTypeQuizIDs = testTypeQuizIDs.concat(doc.data().quizIDs || []);
        });

        // Fetch quizIDs from provinces collection
        const provincesQuery = query(collection(db, "provinces"), where("province", "==", province));
        const provincesSnapshot = await getDocs(provincesQuery);
        
        let provinceQuizIDs = [];
        provincesSnapshot.forEach((doc) => {
          provinceQuizIDs = provinceQuizIDs.concat(doc.data().quizIDs || []);
        });

        // Find the intersection of testTypeQuizIDs and provinceQuizIDs
        const commonQuizIDs = testTypeQuizIDs.filter(id => provinceQuizIDs.includes(id));

        setQuizIDs(commonQuizIDs);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizIDs();
  }, [testType, province]);

  const handlePress = (quizID) => {
    navigation.navigate("Test Details", { testType, province, quizID });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {quizIDs.map((quizID, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handlePress(quizID)}
        >
          <ImageBackground
            source={require("../assets/test.jpg")}
            style={styles.imageBackground}
          >
            <Text style={styles.cardText}>Quiz {quizID}</Text>
            <Text style={styles.questionCount}>ID: {quizID}</Text>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  card: {
    flex: 1,
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 5,
  },
  questionCount: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 4,
    borderRadius: 5,
  },
});

export default SelectQuizNo;
