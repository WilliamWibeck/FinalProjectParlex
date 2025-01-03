import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore();

interface UserStats {
  id: string;
  firstName: string;
  lastName: string;
  wordsLearned: number;
  sentencesCompleted: number;
  wordOrderCompleted: number;
}

export const fetchAllUserStats: () => Promise<UserStats[]> = async () => {
  const userRefProg = collection(db, "user_progress");

  try {
    const snapshot = await getDocs(userRefProg);
    const fullStats: UserStats[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        wordsLearned: data.wordsLearned || 0,
        sentencesCompleted: data.sentencesCompleted || 0,
        wordOrderCompleted: data.wordOrderCompleted || 0,
      };
    });
    return fullStats;
  } catch (error) {
    console.error("Error fetching all user stats:", error);
    return [];
  }
};
