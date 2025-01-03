import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();

interface Words {
  id: string;
  french: string;
  english: string;
  category: string;
}

export const fetchWordsByIds = async (wordIds: string[]): Promise<Words[]> => {
  try {
    const wordPromises = wordIds.map(async (id) => {
      const wordRef = doc(db, "words", id);
      const wordDoc = await getDoc(wordRef);

      if (!wordDoc.exists()) return null;

      const data = wordDoc.data();

      return {
        id: wordDoc.id,
        french: data?.french || "",
        english: data?.english || "",
        category: data?.category || "",
      } as Words;
    });

    const words = await Promise.all(wordPromises);

    return words.filter((word) => word !== null);
  } catch (error) {
    console.error("Error fetching words by IDs:", (error as Error).message);
    return [];
  }
};
