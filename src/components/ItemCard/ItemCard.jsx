import "./ItemCard.css";

function ItemCard({ data, onCardClick }) {
  return (
    <>
      <div className="card">
        <img
          src={data.link}
          alt="Card Image"
          className="card__image"
          onClick={() => onCardClick && onCardClick(data)}
        />
        <p className="card__text">{data.name}</p>
      </div>
    </>
  );
}

export default ItemCard;
