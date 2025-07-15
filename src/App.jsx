import React from "react";
import CardButton from "./components/CardButton";
import { allImages } from "./data";
import { createRandomCardsArr } from "./utility/helper";
import Confetti from "react-confetti";

const FLIP_CARD_TIMER = 500; //1sec

function App() {
  const [cards, setCards] = React.useState(() =>
    createRandomCardsArr(allImages)
  );
  const [isBoardLocked, setBoardLocked] = React.useState(false);
  const guessedCards = React.useRef([]);
  const maximumGuesses = guessedCards.current.length === 2;
  const isGameWon = cards.every((item) => item.open);
  console.log(isGameWon);

  function toggleCardOpen(card) {
    setCards((prev) =>
      prev.map((item) => {
        if (item === card) {
          return { ...item, open: true };
        }
        return item;
      })
    );
    if (!maximumGuesses) {
      guessedCards.current.push(card);
    }
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

  function restartGame() {
    setCards(() => createRandomCardsArr(allImages));
  }

  return (
    <>
      <div className="w-full min-h-screen bg-[url(./assets/bg-img.jpg)] bg-cover bg-center overflow-hidden]">
        <main className="w-full min-h-screen flex flex-col justify-center items-center">
          <section className="flex flex-col justify-center items-center">
            {isGameWon && (
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={600}
              />
            )}
            <div className="max-w-[1024px] w-full grid grid-cols-4 gap-2 items-stretch mb-5">
              {cards.map((card, i) => (
                <CardButton
                  key={i}
                  className="border-3 min-h-30 w-full max-h-52 sm:max-h-46 border-pink-900 rounded-lg cursor-pointer overflow-hidden bg-pink-400 hover:bg-pink-500 active:bg-pink-500"
                  props={card}
                  disabled={card.open || isBoardLocked}
                  onClick={() => toggleCardOpen(card)}
                />
              ))}
            </div>
            {isGameWon && (
              <button
                onClick={restartGame}
                className="bg-green-500 cursor-pointer rounded-md hover:bg-green-600 active:bg-green-700 text-zinc-50 text-lg font-medium px-6 py-3"
              >
                Play Again!
              </button>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
