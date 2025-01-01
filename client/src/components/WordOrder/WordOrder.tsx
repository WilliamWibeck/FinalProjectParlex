import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import Dragable from "./Dragable";
import Sidebar from "../Sidebar/Sidebar";
import { incrementWordOrder } from "../../functions/incrementWordOrder";
import { incrementIncorrectGuessWordOrder } from "../../functions/incrementWrongGuessWordOrder";

const db = getFirestore();

const WordOrder = () => {
  const [sentences, setSentences] = useState<string[]>([]);
  const [randomSentence, setRandomSentence] = useState<string>("");
  const [formattedSentence, setFormattedSentence] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<
    { id: string; word: string }[]
  >([]);
  const [flashState, setFlashState] = useState<string>("");

  const sentencesRef = collection(db, "sentences");

  const fetchSentences = async () => {
    try {
      const snapshot = await getDocs(sentencesRef);
      const sentences = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSentences(sentences);
    } catch (error) {
      console.log("Error fetching sentences:", error);
    }
  };

  const fetchRandomSentence = () => {
    if (sentences.length > 0) {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const random = sentences[randomIndex];
      const lowerCased = random.sentence.toLowerCase();

      setRandomSentence(lowerCased);

      const formatted = lowerCased.split(" ");
      setFormattedSentence(formatted);

      const shuffled = formatted
        .map((word, index) => ({ id: `${word}-${index}`, word }))
        .sort(() => Math.random() - 0.5);

      setShuffledWords(shuffled);
      setFlashState("");
    }
  };

  const handleDrag = (e: any) => {
    const { active, over } = e;

    if (active.id !== over?.id) {
      const startIndex = shuffledWords.findIndex(
        (item) => item.id === active.id
      );
      const endIndex = shuffledWords.findIndex((item) => item.id === over?.id);

      setShuffledWords((prevWords) =>
        arrayMove(prevWords, startIndex, endIndex)
      );
    }
  };

  const validateOrder = () => {
    const reorderedWords = shuffledWords.map((item) => item.word).join(" ");
    const originalWords = formattedSentence.join(" ");

    if (reorderedWords === originalWords) {
      setFlashState("correct");
      incrementWordOrder();
    } else {
      setFlashState("incorrect");
      incrementIncorrectGuessWordOrder();
    }

    setTimeout(() => {
      setFlashState("");
      if (reorderedWords === originalWords) {
        setTimeout(fetchRandomSentence, 500);
      }
    }, 1000);
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
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-zinc-900 gap-10">
      <div className="flex h-screen w-screen flex-row ">
        <div className="flex justify-start">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
          {randomSentence ? (
            <div
              className={`flex flex-row border-4 gap-6 p-4 shadow-md rounded-lg transition-all duration-500 ${
                flashState === "correct"
                  ? "border-green-500"
                  : flashState === "incorrect"
                  ? "border-red-500"
                  : "border-zinc-700"
              }`}
            >
              <DndContext onDragEnd={handleDrag}>
                <SortableContext items={shuffledWords.map((item) => item.id)}>
                  {shuffledWords.map(({ id, word }) => (
                    <Dragable key={id} id={id} word={word} />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <button
            onClick={validateOrder}
            className="border-zinc-700 w-48 border-2 hover:bg-gray-00 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Validate
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordOrder;
