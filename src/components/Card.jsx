export default function Card({ toggleCardOpen, props, ...rest }) {
    console.log(props);
    return (
        <button onClick={() => toggleCardOpen(props)} {...rest}>
            {props.open ? (
                <img
                    className="w-full"
                    src={
                        new URL(`../assets/${props.img}`, import.meta.url).href
                    }
                    alt={props.img}
                />
            ) : (
                <div className="w-full h-full bg-pink-300"></div>
            )}
        </button>
    );
}
