import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const SentenceAddingForm = () => {
  const [sentence, setSentence] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
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
      alert("Failed to add the sentence. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#1c1c1e",
        borderRadius: "10px",
        padding: "20px",
        maxWidth: "400px",
        margin: "auto",
        color: "white",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h5" sx={{ textAlign: "center", color: "white" }}>
          Add New Sentence
        </Typography>
        <TextField
          label="Sentence"
          type="text"
          value={sentence}
          onChange={(e) => setSentence(e.target.value)}
          required
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
          sx={{
            backgroundColor: "#6b46c1",
            color: "white",
            "&:hover": {
              backgroundColor: "#55349a",
            },
          }}
        >
          Add Sentence
        </Button>
      </Stack>
    </Box>
  );
};

export default SentenceAddingForm;
