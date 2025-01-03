describe("combineData", () => {
  const combineData = (
    words: { date: string; wordsDone: number }[],
    sentences: { date: string; sentencesDone: number }[],
    wordOrders: { date: string; wordOrderDone: number }[]
  ) => {
    return words.map((wordEntry) => {
      const matchingSentence = sentences.find(
        (sentenceEntry) => sentenceEntry.date === wordEntry.date
      );
      const matchingWordOrder = wordOrders.find(
        (wordOrderEntry) => wordOrderEntry.date === wordEntry.date
      );

      return {
        ...wordEntry,
        sentencesDone: matchingSentence ? matchingSentence.sentencesDone : 0,
        wordOrderDone: matchingWordOrder ? matchingWordOrder.wordOrderDone : 0,
      };
    });
  };

  it("Borde kombinera korrekt.", () => {
    const words = [
      { date: "2023-12-01", wordsDone: 10 },
      { date: "2023-12-02", wordsDone: 20 },
    ];
    const sentences = [
      { date: "2023-12-01", sentencesDone: 5 },
      { date: "2023-12-03", sentencesDone: 15 },
    ];
    const wordOrders = [
      { date: "2023-12-02", wordOrderDone: 3 },
      { date: "2023-12-03", wordOrderDone: 7 },
    ];

    const result = combineData(words, sentences, wordOrders);

    expect(result).toEqual([
      {
        date: "2023-12-01",
        wordsDone: 10,
        sentencesDone: 5,
        wordOrderDone: 0,
      },
      {
        date: "2023-12-02",
        wordsDone: 20,
        sentencesDone: 0,
        wordOrderDone: 3,
      },
    ]);
  });

  it("Borde returnera en tom lista om words listan är tom", () => {
    const result = combineData([], [], []);
    expect(result).toEqual([]);
  });
});
