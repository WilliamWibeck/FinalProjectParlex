import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
export const fetchWords = async (category: string, subcollection: string) => {
  try {
    const wordsRef = collection(db, `categories/${category}/${subcollection}`);
    const wordsSnapshot = await getDocs(wordsRef);

    return wordsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching words:", error);
    return [];
  }
};
