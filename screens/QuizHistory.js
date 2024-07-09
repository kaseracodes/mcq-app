import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../FirebaseConfig'; 

const QuizHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading history...</Text>
      </View>
    );
  }

  if (history.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No quiz history found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyText}>Quiz ID: {item.quizID}</Text>
            <Text style={styles.historyText}>Date: {new Date(item.date.seconds * 1000).toLocaleDateString()}</Text>
            <Text style={styles.historyText}>Score: {item.score}%</Text>
            <Text style={styles.historyText}>Correct Answers: {item.correctAnswers}</Text>
            <Text style={styles.historyText}>Incorrect Answers: {item.incorrectAnswers}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  historyItem: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  historyText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default QuizHistory;
