import React from "react";
import CardButton from "./components/CardButton";
import { allImages } from "./data";
import { createRandomCardsArr } from "./utility/helper";

function App() {
    const [cards, setCards] = React.useState(() =>
        createRandomCardsArr(allImages)
    );
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
        guessedCards.current.push(card);
    }

    React.useEffect(() => {
        if (maximumGuesses) {
            const [firstGuess, secondGuess] = guessedCards.current;
            if (firstGuess.img !== secondGuess.img) {
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
            }
            guessedCards.current = [];
        }
    }, [maximumGuesses]);

    return (
        <>
            <div className="w-full min-h-screen bg-[url(./assets/bg-img.jpg)] bg-cover bg-center overflow-hidden]">
                <main className="w-full">
                    <section className="container h-full mx-auto flex flex-row justify-center items-center flex-wrap gap-2 rounded-lg">
                        {cards.map((card, i) => (
                            <CardButton
                                key={i}
                                className="w-24 h-24 cursor-pointer"
                                props={card}
                                toggleCardOpen={toggleCardOpen}
                            />
                        ))}
                    </section>
                </main>
            </div>
        </>
    );
}

export default App;
