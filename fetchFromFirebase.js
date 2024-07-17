import { db } from './FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const fetchQuestionsFromFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, 'questions'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchQuizHistoryFromFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, 'quizHistory'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchProvincesFromFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, 'provinces'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchTestTypesFromFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, 'testTypes'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
