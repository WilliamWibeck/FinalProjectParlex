import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

interface Words {
  id: string;
  french: string;
  english: string;
  category: string;
}
export const fetchWords = async (
  category: string,
  subcollection: string
): Promise<Words[]> => {
  try {
    const wordsRef = collection(db, `categories/${category}/${subcollection}`);
    const wordsSnapshot = await getDocs(wordsRef);

    return wordsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Words[];
  } catch (error) {
    console.error("Error fetching words:", error);
    return [];
  }
};
