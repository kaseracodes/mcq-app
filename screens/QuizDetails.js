import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const QuizDetails = ({ route, navigation }) => {
  const [isRandomQuestions, setIsRandomQuestions] = useState(false);
  const [isRandomAnswers, setIsRandomAnswers] = useState(false);
  const [isAnswersOnSubmit, setIsAnswersOnSubmit] = useState(false);

  const { testType, province, quizID } = route.params;
  console.log("Printing in QuizDetails Page: ", testType, province, quizID);

  const goToQuiz = (
    testType,
    province,
    quizID,
    isRandomQuestions,
    isRandomAnswers,
    isAnswersOnSubmit
  ) => {
    navigation.navigate("Quiz", {
      testType,
      province,
      quizID,
      isRandomQuestions,
      isRandomAnswers,
      isAnswersOnSubmit,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../assets/quiz-3q.jpg")}
        style={styles.headerImage}
      />
      <View style={styles.switchContainer}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Random Questions</Text>
          <Switch
            value={isRandomQuestions}
            onValueChange={setIsRandomQuestions}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Random Answers</Text>
          <Switch value={isRandomAnswers} onValueChange={setIsRandomAnswers} />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Answers on Submit</Text>
          <Switch
            value={isAnswersOnSubmit}
            onValueChange={setIsAnswersOnSubmit}
          />
        </View>
      </View>
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About this Quiz</Text>
        <Text style={styles.quizInfo}>
          <Text style={styles.quizInfoLabel}>Quiz Title : </Text> {testType}
        </Text>
        <Text style={styles.quizInfo}>
          <Text style={styles.quizInfoLabel}>Quiz Description : </Text> {testType}{" "}
          and province is {province}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            goToQuiz(
              testType,
              province,
              quizID,
              isRandomQuestions,
              isRandomAnswers,
              isAnswersOnSubmit
            )
          }
        >
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  switchContainer: {
    margin: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 15,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  switchLabel: {
    fontSize: 16,
  },
  aboutContainer: {
    marginHorizontal: 20,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  quizInfo: {
    fontSize: 16,
    marginVertical: 5,
  },
  quizInfoLabel: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FA1361",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizDetails;
