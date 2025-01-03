# Parlex är mitt examensarbete för 2024

## Guide:

- Skapa konto/logga in
- Välj någon av utmaningarna
  - Flashcards är vanliga glosor, ordet visas på franska, ditt uppdrag är att fylla i den engelska översättningen. Är det korrekt flashar ordet grönt, annars rött.
  - Un/Une är övning för En och Ett, Du får en mening där Un/Une fattas. Ditt uppdrag är att fylla i antingen 'Un' eller 'Une' beroende på om substantivet är maskulint eller feminint. Även här flashar meningen grönt för rätt och rött för fel.
  - Shuffled sentences är den tredje och sista utmaningen. Du får en mening vars ordföljd har fått en slumpmässig ording. Ditt uppdrag är att kasta om orden så meningen blir korrekt.
- Klicka på Word bank för att antingen lägga till eget innehåll som nya word eller meningar. Du kan antingen ladda upp visa formuläret eller att ladda upp ett JSON objekt i följande struktur:

  - Ord ska ha strukturern [{
    "english": "Dog",
    "french": "Chien",
    "category": "Animals"
    },]

  Meningar ska har strukturen [{
  "sentence": "Le chat dort sous la table.",
  "category": "Animals"
  },]

  - Du kan också se allt innehåll som är tillgängligt i griddarna.

- När du är nöjd med någon av utmaningarna kan du återgå till dashboard för att se statistik för hur det har gått.

## Lycka till :)
