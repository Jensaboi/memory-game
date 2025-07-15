import React from "react";
import CardButton from "./components/CardButton";
import { allImages } from "./data";
import { createRandomCardsArr } from "./utility/helper";

const FLIP_CARD_TIMER = 1000; //1sec

function App() {
  const [cards, setCards] = React.useState(() =>
    createRandomCardsArr(allImages)
  );
  const guessedCards = React.useRef([]);
  const maximumGuesses = guessedCards.current.length === 2;
  const [isBoardLocked, setBoardLocked] = React.useState(false);

  function toggleCardOpen(card) {
    setCards((prev) =>
      prev.map((item) => {
        if (item === card) {
          return { ...item, open: true };
        }
        return item;
      })
    );
    guessedCards.current.push(card);
  }

  React.useEffect(() => {
    let timeout;
    if (maximumGuesses) {
      setBoardLocked(true);
      const [firstGuess, secondGuess] = guessedCards.current;
      if (firstGuess.img !== secondGuess.img) {
        timeout = setTimeout(() => {
          setCards((prev) =>
            prev.map((item) => {
              if (item.img === firstGuess.img || item.img === secondGuess.img) {
                return { ...item, open: false };
              }
              return item;
            })
          );
          guessedCards.current = [];
          setBoardLocked(false);
        }, FLIP_CARD_TIMER);
      } else {
        timeout = setTimeout(() => {
          guessedCards.current = [];
          setBoardLocked(false);
        }, FLIP_CARD_TIMER);
      }
    }
    return () => clearTimeout(timeout);
  }, [maximumGuesses]);
  console.log(guessedCards.current);
  return (
    <>
      <div className="w-full min-h-screen bg-[url(./assets/bg-img.jpg)] bg-cover bg-center overflow-hidden]">
        <main className="w-full">
          <section className="container h-full mx-auto flex flex-row justify-center items-center flex-wrap gap-2 rounded-lg">
            {cards.map((card, i) => (
              <CardButton
                key={i}
                className="w-20 h-20 rounded-md cursor-pointer overflow-hidden"
                props={card}
                toggleCardOpen={toggleCardOpen}
                isBoardLocked={isBoardLocked}
              />
            ))}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
