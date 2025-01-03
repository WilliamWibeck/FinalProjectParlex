import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { fetchWordsByIds } from "./fetchFailedWordsById";

const db = getFirestore();
const auth = getAuth();

interface Words {
  id: string;
  french: string;
  english: string;
  category: string;
}

export const fetchFailedWords = async (): Promise<Words[]> => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user is logged in.");
    return [];
  }

  try {
    const userRef = doc(db, "user_progress", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return [];
    }

    const failedWords = userDoc.data()?.wordsFailed || {};
    const failedWordIds = Object.keys(failedWords);
    console.log("Failed Word IDs:", failedWordIds);

    if (failedWordIds.length === 0) {
      console.log("No failed words found.");
      return [];
    }

    const failedWordsList: Words[] = await fetchWordsByIds(failedWordIds);
    console.log("Failed Words List:", failedWordsList);

    return failedWordsList;
  } catch (error) {
    console.error("Error fetching failed words:", error.message);
    return [];
  }
};
