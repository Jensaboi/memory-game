import pawIcon from "../assets/paw-bg.svg";
export default function CardButton({ props, ...rest }) {
  return (
    <button {...rest}>
      {props.open ? (
        <img
          className="w-full h-full object-cover bg-no-repeat"
          src={new URL(`../assets/${props.img}`, import.meta.url).href}
          alt={props.img}
        />
      ) : (
        <img src={pawIcon} className="w-full h-full object-cover" />
      )}
    </button>
  );
}
