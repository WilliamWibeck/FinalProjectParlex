import { Category } from "@mui/icons-material";
import FlashCard from "../FlashCard/FlashCard";
import { useState } from "react";
import GameFilter from "../GameFilter/GameFilter";
import { fetchWords } from "../../functions/fetchWords";
import { Box } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";

interface flashCardProps {
  category: string | null;
}

const FlashCards = ({ category }: flashCardProps) => {
  const [categoryChoosen, setCategoryChoosen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [words, setWords] = useState([]);
  const handleCategorySelection = async (category: string) => {
    try {
      const wordsData = await fetchWords(category, "words");

      setWords(wordsData);
      setSelectedCategory(category);
      setCategoryChoosen(true);
    } catch {
      alert("Error fetching words from category");
    }
  };

  return (
    <Box className="bg-zinc-900 h-screen w-screen">
      <Sidebar />
      {categoryChoosen ? (
        <FlashCard
          category={selectedCategory}
          words={words}
          setCategoryChoosen={setCategoryChoosen}
        />
      ) : (
        <GameFilter onCategorySelect={handleCategorySelection} />
      )}
    </Box>
  );
};

export default FlashCards;
