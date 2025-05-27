export default function Button({ onClick, displayText }) {
  return (
    <button className="button" onClick={onClick}>
      {displayText}
    </button>
  );
}
