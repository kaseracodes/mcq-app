import { getDBConnection } from './SQLiteConfig';

// Insert a question into the questions table
export const insertQuestion = async (newQuestion) => {
  const db = await getDBConnection();
  const { id, question, option1, option2, option3, option4, correctAnswer, paid, testType, quizID } = newQuestion;
  try {
    await db.runAsync(
      `INSERT INTO questions (id, question, option1, option2, option3, option4, correctAnswer, paid, testType, quizID) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [id, question, option1, option2, option3, option4, correctAnswer, paid ? 1 : 0, testType, quizID]
    );
  } catch (error) {
    console.error('Error inserting question:', error);
    throw error;
  }
};

// Retrieve all questions from the questions table
export const getAllQuestions = async () => {
  const db = await getDBConnection();
  try {
    const results = await db.getAllAsync(`SELECT * FROM questions;`);
    return results.map(row => ({
      id: row.id,
      question: row.question,
      option1: row.option1,
      option2: row.option2,
      option3: row.option3,
      option4: row.option4,
      correctAnswer: row.correctAnswer,
      paid: row.paid === 1,
      testType: row.testType,
      quizID: row.quizID
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

// Insert a quiz history into the quizHistory table
export const insertQuizHistory = async (quizHistory) => {
  const db = await getDBConnection();
  const { id, quizID, testType, province, date, totalQuestions, correctAnswers, incorrectAnswers, score, userAnswers, questions } = quizHistory;
  try {
    await db.runAsync(
      `INSERT INTO quizHistory (id, quizID, testType, province, date, totalQuestions, correctAnswers, incorrectAnswers, score, userAnswers, questions) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [id, quizID, testType, province, date.toISOString(), totalQuestions, correctAnswers, incorrectAnswers, score, JSON.stringify(userAnswers), JSON.stringify(questions)]
    );
  } catch (error) {
    console.error('Error inserting quiz history:', error);
    throw error;
  }
};

// Retrieve all quiz histories from the quizHistory table
export const getAllQuizHistory = async () => {
  const db = await getDBConnection();
  try {
    const results = await db.getAllAsync(`SELECT * FROM quizHistory;`);
    return results.map(row => ({
      id: row.id,
      quizID: row.quizID,
      testType: row.testType,
      province: row.province,
      date: new Date(row.date),
      totalQuestions: row.totalQuestions,
      correctAnswers: row.correctAnswers,
      incorrectAnswers: row.incorrectAnswers,
      score: row.score,
      userAnswers: JSON.parse(row.userAnswers),
      questions: JSON.parse(row.questions)
    }));
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    throw error;
  }
};

// Insert a province into the provinces table
export const insertProvince = async (province) => {
  const db = await getDBConnection();
  const { id, provinceName, quizIDs } = province;
  try {
    await db.runAsync(
      `INSERT INTO provinces (id, province, quizIDs) VALUES (?, ?, ?);`,
      [id, provinceName, JSON.stringify(quizIDs)]
    );
  } catch (error) {
    console.error('Error inserting province:', error);
    throw error;
  }
};

// Retrieve all provinces from the provinces table
export const getAllProvinces = async () => {
  const db = await getDBConnection();
  try {
    const results = await db.getAllAsync(`SELECT * FROM provinces;`);
    return results.map(row => ({
      id: row.id,
      provinceName: row.province,
      quizIDs: JSON.parse(row.quizIDs)
    }));
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};

// Insert a test type into the testTypes table
export const insertTestType = async (testType) => {
  const db = await getDBConnection();
  const { id, typeName, quizIDs } = testType;
  try {
    await db.runAsync(
      `INSERT INTO testTypes (id, testType, quizIDs) VALUES (?, ?, ?);`,
      [id, typeName, JSON.stringify(quizIDs)]
    );
  } catch (error) {
    console.error('Error inserting test type:', error);
    throw error;
  }
};

// Retrieve all test types
export const getAllTestTypes = async () => {
    const db = await getDBConnection();
    try {
      const results = await db.getAllAsync('SELECT * FROM testTypes;');
      return results.map(row => ({
        id: row.id,
        typeName: row.testType,
        quizIDs: JSON.parse(row.quizIDs)
      }));
    } catch (error) {
      console.error('Error fetching test types:', error);
      throw error;
    }
};