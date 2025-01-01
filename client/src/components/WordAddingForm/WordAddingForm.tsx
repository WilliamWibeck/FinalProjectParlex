import { useState } from "react";
import { collection, doc, addDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const WordAddingForm = () => {
  const [french, setFrench] = useState("");
  const [english, setEnglish] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !english || !french) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const categoryRef = doc(db, "categories", category);

      const categorySnapshot = await getDoc(categoryRef);
      if (!categorySnapshot.exists()) {
        await setDoc(categoryRef, {
          name: category,
          subCollections: ["words"],
          createdAt: new Date(),
        });
      }

      const wordsRef = collection(categoryRef, "words");
      await addDoc(wordsRef, {
        french,
        english,
      });

      alert(`Word added successfully to the "${category}" category!`);

      setFrench("");
      setEnglish("");
      setCategory("");
    } catch (error) {
      console.error("An error occurred while adding the word:", error);
      alert("Failed to add the word. Please try again.");
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
          Add New Word
        </Typography>
        <TextField
          label="Word in French"
          type="text"
          value={french}
          onChange={(e) => setFrench(e.target.value)}
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
          label="Word in English"
          type="text"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
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
          Add Word
        </Button>
      </Stack>
    </Box>
  );
};

export default WordAddingForm;
