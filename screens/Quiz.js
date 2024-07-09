import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { auth, db } from '../FirebaseConfig'; // Adjust the path according to your file structure

const Quiz = ({ route, navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const { testType, province, quizID, isRandomQuestions, isRandomAnswers, isAnswersOnSubmit } = route.params;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Fetching questions for quizID:", quizID); // Debugging line
        const q = query(collection(db, 'questions'), where('quizID', '==', quizID));
        const querySnapshot = await getDocs(q);
        
        const fetchedQuestions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Fetched questions:", fetchedQuestions); // Debugging line

        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizID]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (selectedOption !== null) {
      setUserAnswers({
        ...userAnswers,
        [currentQuestionIndex]: selectedOption,
      });
    }
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedOption(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // End of quiz
      showSubmitAlert();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: option,
    });
  };

  const showSubmitAlert = () => {
    Alert.alert(
      "Submit Quiz",
      "Are you sure you want to submit the test?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: checkAnswers },
      ],
      { cancelable: false }
    );
  };

  const checkAnswers = async () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = ((correctCount / questions.length) * 100).toFixed(1);

      // Save the quiz history
    try {
        const user = auth.currentUser;
        const docRef = await addDoc(collection(db, "quizHistory"), {
        userID: user.uid,
        quizID: quizID,
        testType: testType,
        province: province,
        date: new Date(),
        totalQuestions: questions.length,
        correctAnswers: correctCount,
        incorrectAnswers: questions.length - correctCount,
        score: score,
        userAnswers: userAnswers,
        questions: questions.map(question => ({ 
            question: question.question, 
            options: question.options, 
            correctAnswer: question.correctAnswer 
        }))
        });
        console.log("Quiz history saved with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    navigation.navigate("Result", {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      incorrectAnswers: questions.length - correctCount,
      score: score,
      questions: questions,
      userAnswers: userAnswers,
      testType: testType, // Pass the test name
      quizID: quizID, // Pass the test type
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading questions...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No questions found for this quiz.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.topText}>
          Questions: {currentQuestionIndex + 1}/{questions.length}
        </Text>
        <TouchableOpacity
          style={styles.endQuizButton}
          onPress={showSubmitAlert}
        >
          <Text style={styles.endQuizText}>End Quiz</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        <FlatList
          data={currentQuestion.options}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.optionButton,
                {
                  backgroundColor:
                    selectedOption === item ? "#f28b82" : "white",
                },
              ]}
              onPress={() => handleSelectOption(item)}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: selectedOption === item ? "white" : "black",
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.navigationButtonsContainer}>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            { opacity: currentQuestionIndex === 0 ? 0.5 : 1 },
          ]}
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={styles.navigationButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={handleNext}
        >
          <Text style={styles.navigationButtonText}>
            {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: "#f64e60",
    display: "flex",
    height: 400,
    width: "100%",
  },
  topText: {
    padding: 20,
    fontSize: 26,
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#f64e60",
    padding: 10,
    borderRadius: 5,
    textAlign: "left",
  },
  endQuizButton: {
    zIndex: 1,
    alignSelf: "flex-end",
    marginRight: 20,
    width: 100,
    alignItems: "center",
  },
  endQuizText: {
    fontSize: 16,
    color: "#f64e60",
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  questionContainer: {
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    marginTop: -250,
    backgroundColor: "white",
    borderRadius: 15,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 16,
  },
  navigationButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 20,
  },
  navigationButton: {
    backgroundColor: "#f64e60",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  navigationButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Quiz;
