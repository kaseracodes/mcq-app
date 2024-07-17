import {
    fetchQuestionsFromFirebase,
    fetchQuizHistoryFromFirebase,
    fetchProvincesFromFirebase,
    fetchTestTypesFromFirebase,
  } from './fetchFromFirebase';
  import { storeDataInSQLite } from './storeInSQLite';
  
  export const syncFirebaseToSQLite = async () => {
    try {
      const questions = await fetchQuestionsFromFirebase();
      const quizHistory = await fetchQuizHistoryFromFirebase();
      const provinces = await fetchProvincesFromFirebase();
      const testTypes = await fetchTestTypesFromFirebase();
  
      await storeDataInSQLite(questions, quizHistory, provinces, testTypes);
      console.log('Data synced successfully from Firebase to SQLite');
    } catch (error) {
      console.error('Error syncing data from Firebase to SQLite:', error);
    }
  };
  