import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();

export const fetchWordsByIds = async (wordIds: string[]) => {
  try {
    const wordPromises = wordIds.map(async (id) => {
      const wordRef = doc(db, "words", id);
      const wordDoc = await getDoc(wordRef);
      return wordDoc.exists() ? { id: wordDoc.id, ...wordDoc.data() } : null;
    });

    const words = await Promise.all(wordPromises);

    return words.filter((word) => word !== null);
  } catch (error) {
    console.error("Error fetching words by IDs:", error.message);
    return [];
  }
};
