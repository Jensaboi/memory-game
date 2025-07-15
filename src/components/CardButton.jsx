import pawIcon from "../assets/paw-bg.svg";
export default function CardButton({ props, ...rest }) {
    return (
        <button {...rest}>
            {props.open ? (
                <img
                    className="w-full h-full object-cover"
                    src={
                        new URL(`../assets/${props.img}`, import.meta.url).href
                    }
                    alt={props.img}
                />
            ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <img src={pawIcon} className="w-16 h-16 object-cover" />
                </div>
            )}
        </button>
    );
}
