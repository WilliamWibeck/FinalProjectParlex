import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import WordAddingForm from "../WordAddingForm/WordAddingForm";
import SentenceAddingForm from "../SentenceAddingForm/SentenceAddingForm";
import WordGrid from "../WordGrid/WordGrid";
import SentenceGrid from "../SentenceGrid/SentenceGrid";
import Sidebar from "../Sidebar/Sidebar";
import { ChangeEvent, useEffect, useState } from "react";
import { Typography, Box, Divider, Paper, Button } from "@mui/material";

interface Word {
  id: string;
  french: string;
  english: string;
  category: string;
}

interface Sentence {
  id: string;
  sentence: string;
  category: string;
}

const WordBank = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [sentences, setSentences] = useState<Sentence[]>([]);

  //Hämtar alla ord utifrån kategorierna i Firestore och sparar till Words statet.
  const getWords = async () => {
    try {
      const categoriesCollection = collection(db, "categories");
      const categoriesSnapshot = await getDocs(categoriesCollection);

      const allWords = await Promise.all(
        categoriesSnapshot.docs.map(async (categoryDoc) => {
          const wordsCollection = collection(categoryDoc.ref, "words");
          const wordsSnapshot = await getDocs(wordsCollection);
          return wordsSnapshot.docs.map((wordDoc) => {
            const data = wordDoc.data();
            return {
              id: wordDoc.id,
              english: data.english || "",
              french: data.french || "",
              category: categoryDoc.id,
            } as Word;
          });
        })
      );
      setWords(allWords.flat());
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  //Hämtar alla meningar från Firestore och sparar dem till Sentences statet.
  const getSentences = async () => {
    try {
      const sentencesCollection = collection(db, "sentences");
      const snapshot = await getDocs(sentencesCollection);
      const allSentences = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          sentence: data.sentence || "",
          category: data.category || "Uncategorized",
        } as Sentence;
      });
      setSentences(allSentences);
    } catch (error) {
      console.error("Error fetching sentences:", error);
    }
  };

  //Hanterar uppladdning av JSON objekt för ord.
  const handleJSONImportWords = async (event: ChangeEvent) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          for (const item of data) {
            if (!item.category || !item.english || !item.french) continue;
            const wordsRef = collection(
              db,
              "categories",
              item.category,
              "words"
            );
            await addDoc(wordsRef, {
              french: item.french,
              english: item.english,
            });
          }
          alert("Words successfully uploaded!");
          getWords();
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Error parsing the JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  //Hanterar uppladdning av JSON objekt för meningarna.
  const handleJSONImportSentences = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data: Array<{ sentence: string; category: string }> =
            JSON.parse(e.target?.result as string);
          const sentencesCollection = collection(db, "sentences");
          for (const item of data) {
            if (!item.sentence || !item.category) continue;
            await addDoc(sentencesCollection, {
              sentence: item.sentence,
              category: item.category,
            });
          }
          alert("Sentences successfully uploaded!");
          getSentences();
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Error parsing the JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  //Hämtar den nödvändiga datan när sidan laddas.
  useEffect(() => {
    getWords();
    getSentences();
  }, []);

  return (
    <Box className="flex flex-row gap-6 bg-zinc-900 text-white h-screen">
      <Sidebar />
      <Box className="flex-1 p-6">
        <Typography variant="h4" className="text-center mb-6 font-bold">
          Word Bank
        </Typography>
        <Box className="flex flex-row gap-6 mb-8">
          <WordAddingForm />
          <SentenceAddingForm />
        </Box>

        <Box className="flex flex-row gap-6 mb-6 items-center justify-center">
          <Paper className="p-4 !bg-zinc-800 rounded-lg flex-1">
            <Typography variant="h6" className="mb-6 text-white">
              Import Words from JSON
            </Typography>
            <input
              type="file"
              accept=".json"
              onChange={handleJSONImportWords}
              className="mb-2 text-white"
            />
          </Paper>
          <Paper className="p-4 !bg-zinc-800 rounded-lg flex-1">
            <Typography variant="h6" className="text-white">
              Import Sentences from JSON
            </Typography>
            <input
              type="file"
              accept=".json"
              onChange={handleJSONImportSentences}
              className="mb-2 text-white"
            />
          </Paper>
        </Box>
        <Divider className="bg-white mb-6" />
        <Box className="flex flex-row gap-6">
          <Box className="flex-1">
            <Typography variant="h6" className="mb-4 font-bold">
              Words
            </Typography>
            <Box className="max-h-[500px] overflow-auto border border-gray-400 rounded-lg p-2">
              <WordGrid rows={words} />
            </Box>
          </Box>
          <Box className="flex-1">
            <Typography variant="h6" className="mb-4 font-bold">
              Sentences
            </Typography>
            <Box className="max-h-[500px] overflow-auto border border-gray-400 rounded-lg p-2">
              <SentenceGrid rows={sentences} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WordBank;
