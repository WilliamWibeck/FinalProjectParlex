import { getAuth } from "firebase/auth";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth();

//Denna funktion hämtar bara den kategorin som är mest spelad i flashcards.
export const fetchMostUsedCategory = async (): Promise<string | null> => {
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

    const categoriesPractised: Record<string, number> =
      data?.categoriesPractised || {};

    let mostPractisedCategory: string | null = null;
    let maxCount = 0;

    //Här konverteras objektet categoriesPractised till en array med key value pair. En forEach körs sen för att se vilken category som har högst värde
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
