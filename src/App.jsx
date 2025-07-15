import React from "react";
import Card from "./components/Card";
import { allImages } from "./data";
import { createCardsArr } from "./utility/helper";

function App() {
    const [cards, setCards] = React.useState(() => createCardsArr(allImages));
    const [guessedCards, setGuessedCards] = React.useState([]);

    function toggleCardOpen(card) {
        setCards((prev) =>
            prev.map((item) => {
                if (card === item) {
                    return { ...item, open: true };
                }
                return item;
            })
        );
    }

    return (
        <>
            <div className="w-full min-h-screen bg-[url(./assets/bg-img.jpg)] bg-cover bg-center overflow-hidden]">
                <main className="w-full">
                    <section className="container h-full mx-auto flex flex-row justify-center items-center flex-wrap gap-2 rounded-lg">
                        {cards.map((card) => (
                            <Card
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
