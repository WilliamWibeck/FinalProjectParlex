import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
export const fetchSubcollections = async (
  category: string
): Promise<string[]> => {
  try {
    const categoryRef = doc(db, "categories", category);
    const categorySnapshot = await getDoc(categoryRef);

    if (categorySnapshot.exists()) {
      const data = categorySnapshot.data();
      const subCollections = data.subCollections || [];
      return subCollections;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching subcollections:", error);
    return [];
  }
};
