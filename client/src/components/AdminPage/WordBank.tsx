import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import WordAddingForm from "../WordAddingForm/WordAddingForm";
import SentenceAddingForm from "../SentenceAddingForm/SentenceAddingForm";
import WordGrid from "../WordGrid/WordGrid";
import SentenceGrid from "../SentenceGrid/SentenceGrid";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { Typography, Box, Divider, Paper, Button } from "@mui/material";

const WordBank = () => {
  const [words, setWords] = useState([]);
  const [sentences, setSentences] = useState([]);

  const getWords = async () => {
    try {
      const categoriesCollection = collection(db, "categories");
      const categoriesSnapshot = await getDocs(categoriesCollection);

      const allWords = await Promise.all(
        categoriesSnapshot.docs.map(async (categoryDoc) => {
          const wordsCollection = collection(categoryDoc.ref, "words");
          const wordsSnapshot = await getDocs(wordsCollection);
          return wordsSnapshot.docs.map((wordDoc) => ({
            id: wordDoc.id,
            ...wordDoc.data(),
            category: categoryDoc.id,
          }));
        })
      );

      setWords(allWords.flat());
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const getSentences = async () => {
    try {
      const sentencesCollection = collection(db, "sentences");
      const snapshot = await getDocs(sentencesCollection);
      const allSentences = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSentences(allSentences);
    } catch (error) {
      console.error("Error fetching sentences:", error);
    }
  };
  const handleJSONImportWords = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleJSONImportSentences = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
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

  useEffect(() => {
    getWords();
    getSentences();
  }, []);

  return (
    <Box className="flex flex-row gap-6 bg-zinc-900 text-white h-screen">
      <Sidebar />
      <Box className="flex-1 p-6">
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: "24px", fontWeight: "bold" }}
        >
          Word Bank
        </Typography>
        <Box className="flex flex-row gap-6 mb-8">
          <WordAddingForm />
          <SentenceAddingForm />
        </Box>
        <Divider className="bg-white" sx={{ marginBottom: "24px" }} />
        <Box className="flex flex-row gap-6 mb-6 items-center justify-center">
          <Paper
            sx={{
              padding: "16px",
              backgroundColor: "#1c1c1e",
              borderRadius: "10px",
              flex: 1,
            }}
          >
            <Typography variant="h6" className="mb-6 text-white">
              Import Words from JSON
            </Typography>
            <input
              type="file"
              accept=".json"
              onChange={handleJSONImportWords}
              style={{ marginBottom: "8px", color: "white" }}
            />
          </Paper>
          <Paper
            sx={{
              padding: "16px",
              backgroundColor: "#1c1c1e",
              borderRadius: "10px",
              flex: 1,
            }}
          >
            <Typography variant="h6" className="text-white">
              Import Sentences from JSON
            </Typography>
            <input
              type="file"
              accept=".json"
              onChange={handleJSONImportSentences}
              style={{ marginBottom: "8px", color: "white" }}
            />
          </Paper>
        </Box>
        <Divider className="bg-white" sx={{ marginBottom: "24px" }} />
        <Box className="flex flex-row gap-6">
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{ marginBottom: "16px", fontWeight: "bold" }}
            >
              Words
            </Typography>
            <Box
              sx={{
                maxHeight: "500px",
                overflow: "auto",
                border: "1px solid gray",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              <WordGrid rows={words} />
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{ marginBottom: "16px", fontWeight: "bold" }}
            >
              Sentences
            </Typography>
            <Box
              sx={{
                maxHeight: "500px",
                overflow: "auto",
                border: "1px solid gray",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              <SentenceGrid rows={sentences} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WordBank;
