import { Box, Button } from "@mui/material";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  increment,
  updateDoc,
} from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useTimeSpent } from "../../customHooks/useTimeSpent";
import { incrementSentencesLearned } from "../../functions/incrementSentencesLearned";
import { incrementIncorrectGuessCompleteSentence } from "../../functions/incrementWrongGuessCompleteSentence";

const db = getFirestore();

interface Sentence {
  id: string;
  sentence: string;
}

const CompleteSentence = () => {
  const [sentenceAnswer, setSentenceAnswer] = useState<string>("");
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [formattedSentence, setFormattedSentence] = useState<string>("");
  const [randomSentence, setRandomSentence] = useState<Sentence | null>(null);
  const [flashCorrect, setFlashCorrect] = useState<boolean>(false);
  const [flashIncorrect, setFlashIncorrect] = useState<boolean>(false);
  const auth = getAuth();
  const user = auth.currentUser;

  //Tiden spenderad i spelet sparas till databasen
  const saveTimeSpentToDB = async (timeSpent: number) => {
    if (!user?.uid) return;

    try {
      const userRef = doc(db, "user_progress", user.uid);
      await updateDoc(userRef, {
        timeSpent: increment(timeSpent),
      });
    } catch (error) {
      console.error("Error saving time spent to database:", error);
    }
  };

  const timeSpentPlaying = useTimeSpent(saveTimeSpentToDB);

  //Meningarna hämtas, filtreras på ifall dem innehåller 'Un' eller 'Une' och sätts till statet.
  const fetchSentences = async () => {
    try {
      const snapshot = await getDocs(collection(db, "sentences"));
      const fetchedSentences = snapshot.docs.map((doc) => ({
        id: doc.id,
        sentence: doc.data().sentence || "",
      }));

      const filteredSentences = fetchedSentences.filter((sentence) =>
        /\b(?:un|une)\b/.test(sentence.sentence)
      );
      setSentences(filteredSentences);
    } catch (error) {
      console.error("Error fetching sentences:", error);
    }
  };

  //En slumpmässig mening hämtas, formateras genom att ta bort 'Un' eller 'Une' och sätts sedan till formattedSentence statet.
  const fetchRandomSentence = () => {
    if (sentences.length === 0) return;

    const randomIndex = Math.floor(Math.random() * sentences.length);
    const random = sentences[randomIndex];
    setRandomSentence(random);

    const formatted = random.sentence.replace(/\b(?:un|une)\b/g, "___");
    setFormattedSentence(formatted);
  };

  //Här kontrolleras användarens svar. Inputen matchas med meningen från randomSentence. Är det korrekt flashar meningen grönt, antal meningar korrekta uppdateras och en ny hämtas
  //Är svaret inkorrekt flashar meningen rött och antal misslyckade gissningar uppdateras.
  const checkAnswer = (e: FormEvent) => {
    e.preventDefault();
    if (
      randomSentence &&
      sentenceAnswer.trim() === randomSentence.sentence.trim()
    ) {
      setFlashCorrect(true);
      incrementSentencesLearned();
      setTimeout(() => {
        setFlashCorrect(false);
        fetchRandomSentence();
      }, 500);
    } else {
      setFlashIncorrect(true);
      incrementIncorrectGuessCompleteSentence();
      setTimeout(() => setFlashIncorrect(false), 500);
    }
    setSentenceAnswer("");
  };

  useEffect(() => {
    fetchSentences();
  }, []);

  useEffect(() => {
    if (sentences.length > 0) {
      fetchRandomSentence();
    }
  }, [sentences]);

  return (
    <div className="flex flex-row h-screen w-screen bg-zinc-900">
      <Sidebar />
      <Box className="flex items-center justify-center w-full">
        <div className="flex items-center flex-col justify-center p-5 gap-12">
          <h2
            className={`text-[98px] transition-all ${
              flashCorrect
                ? "animate-flash-green text-green-500"
                : flashIncorrect
                ? "animate-flash-red text-red-500"
                : "text-zinc-400"
            } mb-4`}
          >
            {flashCorrect && randomSentence
              ? randomSentence.sentence
              : formattedSentence || "Loading..."}
          </h2>
          <Box className="flex flex-col">
            <form onSubmit={checkAnswer} className="mb-4 flex flex-col gap-4">
              <input
                value={sentenceAnswer}
                onChange={(e) => setSentenceAnswer(e.target.value)}
                className="bg-transparent border-b-2 w-full text-3xl border-zinc-400 focus:outline-none text-zinc-400 text-center"
              />
              <Button
                type="submit"
                variant="contained"
                size="small"
                className="!bg-[#6b46c1] text-white px-4 py-2 rounded hover:bg-zinc-700"
              >
                Submit
              </Button>
            </form>
            <Button
              onClick={fetchRandomSentence}
              variant="outlined"
              className="border !border-gray-400 !text-zinc-400 text-gray-700 px-4 py-2 rounded hover:bg-zinc-700 mt-4"
            >
              Get New Random Sentence
            </Button>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default CompleteSentence;
