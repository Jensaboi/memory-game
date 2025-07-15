export default function CardButton({
  isBoardLocked,
  toggleCardOpen,
  props,
  ...rest
}) {
  return (
    <button
      disabled={props.open || isBoardLocked}
      onClick={() => toggleCardOpen(props)}
      {...rest}
    >
      {props.open ? (
        <img
          className="w-full h-full object-cover"
          src={new URL(`../assets/${props.img}`, import.meta.url).href}
          alt={props.img}
        />
      ) : (
        <div className="w-full h-full bg-pink-300"></div>
      )}
    </button>
  );
}
