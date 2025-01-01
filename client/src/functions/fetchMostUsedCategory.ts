import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth();
interface fetchMostUsedCategory {
  count: number;
  maxCount: number;
}

export const fetchMostUsedCategory = async () => {
  const user = auth?.currentUser;
  const userId = user?.uid;

  if (!userId) {
    console.error("No user logged in");
    return null;
  }

  const userRef = doc(db, "user_progress", userId);

  try {
    const snapshot = await getDoc(userRef);
    const data = snapshot.data();

    const categoriesPractised = data?.categoriesPractised || {};

    let mostPractisedCategory: string | undefined;
    let maxCount = 0;
    Object.entries(categoriesPractised).forEach(([category, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostPractisedCategory = category;
      }
    });

    console.log("Most practised category:", mostPractisedCategory);
    return mostPractisedCategory;
  } catch (error) {
    console.error("Error fetching most practised category:", error);
    return null;
  }
};
