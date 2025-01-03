import { useState, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const SentenceAddingForm = () => {
  const [sentence, setSentence] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!sentence || !category) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const sentencesRef = collection(db, "sentences");
      await addDoc(sentencesRef, {
        sentence,
        category,
        createdAt: new Date(),
      });

      alert(`Sentence added successfully to the "${category}" category!`);

      setSentence("");
      setCategory("");
    } catch (error) {
      console.error("An error occurred while adding the sentence:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="bg-zinc-900 rounded-lg p-6 max-w-md mx-auto text-white"
    >
      <Stack spacing={6}>
        <Typography variant="h5" className="text-center text-white font-bold">
          Add New Sentence
        </Typography>
        <TextField
          label="Sentence"
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          required
          className="text-white"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
                borderWidth: "2px",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6b46c1",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#6b46c1",
            },
            input: {
              color: "white",
            },
          }}
        />
        <TextField
          label="Category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="text-white"
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "gray",
                borderWidth: "2px",
              },
              "&:hover fieldset": {
                borderColor: "gray",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6b46c1",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#6b46c1",
            },
            input: {
              color: "white",
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          className="bg-purple-700 hover:bg-purple-600 text-white py-2 rounded-md"
        >
          Add Sentence
        </Button>
      </Stack>
    </Box>
  );
};

export default SentenceAddingForm;
