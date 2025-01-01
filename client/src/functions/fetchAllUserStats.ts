import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore();

export const fetchAllUserStats = async () => {
  const userRefProg = collection(db, "user_progress");

  try {
    const snapshot = await getDocs(userRefProg);
    const fullStats = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return fullStats;
  } catch (error) {
    console.error("Error fetching all user stats:", error);
    return [];
  }
};
