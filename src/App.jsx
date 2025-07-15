import React from "react";
import CardButton from "./components/CardButton";
import { allImages } from "./data";
import { createRandomCardsArr } from "./utility/helper";

const FLIP_CARD_TIMER = 1000; //1sec

function App() {
    const [cards, setCards] = React.useState(() =>
        createRandomCardsArr(allImages)
    );
    const [isBoardLocked, setBoardLocked] = React.useState(false);
    const guessedCards = React.useRef([]);
    const maximumGuesses = guessedCards.current.length === 2;

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
                            if (
                                item.img === firstGuess.img ||
                                item.img === secondGuess.img
                            ) {
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
                <main className="w-full min-h-screen">
                    <section className="container mx-auto min-h-screen flex flex-col justify-center items-center">
                        <div className="bg-sky-400 border-3 border-blue-700 px-4 py-6 rounded-md grid grid-cols-4 gap-4 items-stretch justify-center">
                            {cards.map((card, i) => (
                                <CardButton
                                    key={i}
                                    className="border-2 sm:w-36 sm:h-36 border-pink-900 rounded-md cursor-pointer overflow-hidden bg-pink-400 hover:bg-pink-500 active:bg-pink-600"
                                    props={card}
                                    disabled={card.open || isBoardLocked}
                                    onClick={() => toggleCardOpen(card)}
                                />
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export default App;
