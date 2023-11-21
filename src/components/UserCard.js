import React, { useState } from 'react';
import './UserCard.css';

function UserCard({ image, firstname, lastname, email }) {
  const [favorite, setFavorite] = useState(false);
  return (
    <div className="card">
      <img src={image} alt="Avatar" className="w-100" />
      <div className="info-container">
        <div className="info-head">
          <h4>
            {firstname} {lastname}
          </h4>
          <span
            className={favorite ? 'is-favorite' : ''}
            onClick={(event) => {
              const newFavorite = !favorite;
              setFavorite(newFavorite);
            }}
          >
            &#9733;
          </span>
        </div>
        <div className="info-body">
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
