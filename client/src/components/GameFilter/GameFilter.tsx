import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { db, app } from "../../firebase/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fetchWords } from "../../functions/fetchWords";
import { incrementCategoryCount } from "../../functions/incrementCategoryCount";
import { fetchFailedWords } from "../../functions/fetchFailedWords";
import Sidebar from "../Sidebar/Sidebar";
interface GameFilterProps {
  onCategorySelect: (category: string) => void;
}

const GameFilter = ({ onCategorySelect }: GameFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [words, setWords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [failedWords, setFailedWords] = useState([]);

  const fetchCategories = async () => {
    try {
      const categoriesRef = collection(db, "categories");
      const snapshot = await getDocs(categoriesRef);
      const categoryNames = snapshot.docs.map((doc) => doc.id);
      setCategories(categoryNames);
    } catch {
      alert("Error fetching categories");
    }
  };

  const handleFetchWords = async (category: string) => {
    try {
      const wordsData = await fetchWords(category, "words");
      setWords(wordsData);
      setSelectedCategory(category);
      incrementCategoryCount(category);
    } catch {
      alert("Error fetching words for selected category");
    }
  };

  const handleFetchFailedWords = async () => {
    try {
      const failedWordList = await fetchFailedWords();
      setFailedWords(failedWordList);
      setSelectedCategory("Failed Words");
    } catch {
      console.error("Error fetching failed words");
    }
  };

  useEffect(() => {
    fetchCategories();

    const fetchFailedWordsDirectly = async () => {
      const failedWords = await fetchFailedWords();
      setFailedWords(failedWords);
    };
    fetchFailedWordsDirectly();
  }, []);

  return (
    <Box className="h-full w-full !bg-zinc-900 flex flex-row gap-24 ">
      <Sidebar />
      <Box className="flex flex-col items-center justify-center p-4 w-full h-full">
        <Typography
          variant="h4"
          sx={{ color: "white", fontWeight: "bold", marginBottom: 4 }}
        >
          Select a Category
        </Typography>
        <Grid
          container
          spacing={3}
          sx={{ maxWidth: "1200px", width: "100%", paddingX: 2 }}
        >
          {categories.map((category) => (
            <Grid item lg={2} key={category}>
              <Card
                onClick={() => {
                  onCategorySelect(category);
                  incrementCategoryCount(category);
                }}
                sx={{
                  backgroundColor: "gray",
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: 2,
                  cursor: "pointer",
                  borderRadius: "8px",
                  boxShadow: 3,
                  transition: "transform 0.3s, background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#6b46c1",
                    transform: "scale(1.1)",
                  },
                }}
              >
                {category}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GameFilter;
