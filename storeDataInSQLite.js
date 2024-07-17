import { getDBConnection, createTables } from './SQLiteConfig';
import {
  insertQuestion,
  insertQuizHistory,
  insertProvince,
  insertTestType,
} from './repositories';

export const storeDataInSQLite = async (questions, quizHistory, provinces, testTypes) => {
  const db = await getDBConnection();
  await createTables(db);

  // Insert questions
  for (const question of questions) {
    await insertQuestion(question);
  }

  // Insert quiz history
  for (const history of quizHistory) {
    await insertQuizHistory(history);
  }

  // Insert provinces
  for (const province of provinces) {
    await insertProvince(province);
  }

  // Insert test types
  for (const testType of testTypes) {
    await insertTestType(testType);
  }
};
