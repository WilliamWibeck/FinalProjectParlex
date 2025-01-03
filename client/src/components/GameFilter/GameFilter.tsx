import { Box, Card, Grid, Typography } from "@mui/material";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fetchWords } from "../../functions/fetchWords";
import { incrementCategoryCount } from "../../functions/incrementCategoryCount";
import { fetchFailedWords } from "../../functions/fetchFailedWords";
import Sidebar from "../Sidebar/Sidebar";
interface GameFilterProps {
  onCategorySelect: (category: string) => void;
}

interface Words {
  id: string;
  french: string;
  english: string;
  category: string;
}

const GameFilter = ({ onCategorySelect }: GameFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [words, setWords] = useState<Words[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [failedWords, setFailedWords] = useState<Words[]>([]);

  //Kategorierna fetchas
  const fetchCategories = async () => {
    try {
      const categoriesRef = collection(db, "categories");
      const snapshot = await getDocs(categoriesRef);
      const categoryNames = snapshot.docs.map((doc) => doc.id);
      setCategories(categoryNames);
    } catch (error: unknown) {
      console.error("Error: ", error);
    }
  };

  //Orden fetchas.
  const handleFetchWords = async (category: string) => {
    try {
      const wordsData: Words[] = await fetchWords(category, "words");
      setWords(wordsData);
      setSelectedCategory(category);
      incrementCategoryCount(category);
    } catch (error: unknown) {
      console.error("Error: ", error);
    }
  };

  //Ord som man antingen stavat fel på eller gissat fel på fetchas.
  const handleFetchFailedWords = async () => {
    try {
      const failedWordList: Words[] = await fetchFailedWords();
      setFailedWords(failedWordList);
      setSelectedCategory("Failed Words");
    } catch (error: unknown) {
      console.error("Error: ", error);
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
    <Box className="h-full w-full bg-zinc-900 flex flex-row gap-6">
      <Sidebar />
      <Box className="flex flex-col items-center justify-center p-4 w-full h-full">
        <Typography
          variant="h4"
          className="text-white font-bold mb-4 text-center"
        >
          Select a Category
        </Typography>
        <Grid container spacing={3} className="max-w-[1200px] w-full px-2">
          {categories.map((category) => (
            <Grid item lg={2} key={category}>
              <Card
                onClick={() => {
                  onCategorySelect(category);
                  incrementCategoryCount(category);
                }}
                className="!bg-zinc-400 !text-white font-bold text-center p-2 rounded-lg shadow-md cursor-pointer transform transition-transform duration-300 hover:!bg-[#6b46c1] hover:scale-110"
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
