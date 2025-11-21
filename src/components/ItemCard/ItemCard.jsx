import "./ItemCard.css";
import like from "../../assets/likeDefault.svg";
import liked from "../../assets/likeLiked.svg";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

function ItemCard({ data, onCardClick, onLikeItem }) {
  const { user } = useAuth();

  const isLiked = data?.likes?.includes(user?._id) || false;

  const handleLike = (e) => {
    e.stopPropagation(); // Prevent card click when clicking like
    onLikeItem(data); // Pass the data to the like handler
  };

  return (
    <>
      <div className="card">
        <img
          src={data.imageUrl}
          alt="Card Image"
          className="card__image"
          onClick={() => onCardClick && onCardClick(data)}
        />
        <div className="card__overlay">
          {" "}
          <p className="card__text">{data.name}</p>
          <img
            src={isLiked ? liked : like}
            alt="Like"
            className="card__like"
            onClick={handleLike}
          />
        </div>
      </div>
    </>
  );
}

export default ItemCard;
