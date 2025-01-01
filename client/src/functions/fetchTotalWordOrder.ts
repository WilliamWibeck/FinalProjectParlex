import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export const fetchTotalWordOrder = async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      const userRef = doc(db, "user_progress", user.uid);

      console.log("Fetching user progress...");
      const snapshot = await getDoc(userRef);
      const snapshotData = snapshot.data();

      const totalWordOrderDone = snapshotData?.wordOrderCompleted;
      console.log("total sentences done");

      return totalWordOrderDone || 0;
    } catch (error) {
      console.error("Error fetching total words:", error);
      return 0;
    }
  } else {
    console.log("No user is logged in.");
    return 0;
  }
};
