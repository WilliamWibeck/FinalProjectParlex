import { getAuth } from "firebase/auth";
import { doc, getFirestore, increment, updateDoc } from "firebase/firestore";

const auth = getAuth();

const db = getFirestore();

export const incrementCategoryCount = async (categoryName: string) => {
  const user = auth.currentUser;
  const userId = user?.uid;
  if (!userId) {
    console.error("No user logged in");
    return;
  }

  const userRef = doc(db, "user_progress", userId);

  try {
    await updateDoc(userRef, {
      [`categoriesPractised.${categoryName}`]: increment(1),
    });
    console.log("`${categoryName}`" + "has been incremented");
  } catch (error) {
    console.error("Error updating category count:", error);
  }
};
