import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

export const fetchTotalTimeSpent = async () => {
  const user = auth.currentUser;

  if (!user) {
    console.log("No user is logged in.");
    return 0;
  }

  const userRef = doc(db, "user_progress", user.uid);

  try {
    const timeSnapshot = await getDoc(userRef);

    if (timeSnapshot.exists()) {
      const timeSnapshotData = timeSnapshot.data();
      const timeSpentData = timeSnapshotData?.timeSpent;
      console.log(timeSpentData);

      if (timeSpentData !== undefined) {
        const totalMinutes = Math.floor(timeSpentData / 60);
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        if (hours > 0) {
          return `${hours}h ${minutes}m`;
        } else {
          return `${minutes}m`;
        }
      } else {
        console.log("timeSpent field is missing in the document.");
        return 0;
      }
    } else {
      console.log("Document does not exist.");
      return 0;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return 0;
  }
};
