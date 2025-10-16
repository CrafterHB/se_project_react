import "./ItemCard.css";

function ItemCard({ data }) {
  return (
    <>
      <div className="card">
        <img src={data.link} alt="Card Image" className="card__image" />
        <p className="card__text">{data.name}</p>
      </div>
    </>
  );
}

export default ItemCard;
