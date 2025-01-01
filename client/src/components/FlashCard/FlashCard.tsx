import { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { incrementWordsLearned } from "../../functions/incrementWordsLearned";
import { trackFailedWord } from "../../functions/trackFailedWord";
import Sidebar from "../Sidebar/Sidebar";

interface FlashCardProps {
  category: string | null;
  words: { id: string; french: string; english: string; example?: string }[];
}

const FlashCard = ({ category, words }: FlashCardProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [flashClass, setFlashClass] = useState<string>("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentWord = words[currentIndex];

  const handleCheckAnswer = async () => {
    if (userGuess.trim().toLowerCase() === currentWord.french.toLowerCase()) {
      await incrementWordsLearned();
      setFlashClass("text-green-500");
      setFeedback("");
      setTimeout(() => {
        setFlashClass("");
        setFeedback(null);
        handleNextWord();
      }, 1000);
    } else {
      trackFailedWord(currentWord.id);
      setFlashClass("text-red-500");
      setFeedback(`Incorrect. The correct answer is: ${currentWord.french}`);
      setTimeout(() => {
        setFlashClass("");
      }, 1000);
    }
  };

  const handleNextWord = () => {
    setUserGuess("");
    setFeedback(null);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  return (
    <Box className="flex flex-row h-full w-full !bg-zinc-900 text-white ">
      <Sidebar />
      <Box className="text-center w-full h-full items-center justify-center  flex flex-col">
        <Typography
          variant="h1"
          className={`mb-8 transition-colors duration-500 ${
            flashClass ? flashClass : "text-zinc-400"
          }`}
        >
          {currentWord.english}
        </Typography>

        <Box className="flex flex-col gap-4 items-center">
          <input
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="bg-transparent border-b-2 text-3xl border-zinc-400 focus:outline-none text-zinc-400 text-center w-72"
            placeholder="Type your guess"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleCheckAnswer();
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleCheckAnswer}
            className="!bg-[#6b46c1] hover:!bg-[#55349a]"
          >
            Check
          </Button>
        </Box>

        {feedback && (
          <Typography
            className={`mt-4 text-lg ${
              feedback.startsWith("Correct") ? "text-green-500" : "text-red-500"
            }`}
          >
            {feedback}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FlashCard;
