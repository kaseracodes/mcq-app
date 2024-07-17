import * as SQLite from 'expo-sqlite';

const database_name = "quizApp.db";

// Open the database asynchronously
export const getDBConnection = async () => {
  const db = await SQLite.openDatabaseAsync(database_name);
  return db;
};

// Create tables asynchronously using execAsync
export const createTables = async (db) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY NOT NULL,
      question TEXT NOT NULL,
      option1 TEXT NOT NULL,
      option2 TEXT NOT NULL,
      option3 TEXT NOT NULL,
      option4 TEXT NOT NULL,
      correctAnswer TEXT NOT NULL,
      paid BOOLEAN NOT NULL,
      testType TEXT NOT NULL,
      quizID INTEGER NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS quizHistory (
      id TEXT PRIMARY KEY NOT NULL,
      quizID INTEGER NOT NULL,
      testType TEXT NOT NULL,
      province TEXT,
      date TEXT NOT NULL,
      totalQuestions INTEGER NOT NULL,
      correctAnswers INTEGER NOT NULL,
      incorrectAnswers INTEGER NOT NULL,
      score REAL NOT NULL,
      userAnswers TEXT NOT NULL,
      questions TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS provinces (
      id TEXT PRIMARY KEY NOT NULL,
      province TEXT NOT NULL,
      quizIDs TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS testTypes (
      id TEXT PRIMARY KEY NOT NULL,
      testType TEXT NOT NULL,
      quizIDs TEXT NOT NULL
    );
  `);
};

