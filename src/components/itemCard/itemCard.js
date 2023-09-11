import react, { useState, useRef, useEffect } from "react";
import "./itemCard.css";

function ItemCard({ name, image }) {
  const [failedToGetImage, setFailedToGetImage] = useState(false);
  // in case of error while loading the image we will set default image url
  const handleImgError = () => {
    setFailedToGetImage(true);
  }

  return (
     <div className="item-card">
      { failedToGetImage ? <div className="img-error-container">
        <span>{`can't load image :(`}</span>
      </div> : <img  onError={handleImgError} src={`https://test.create.diagnal.com/images/${image}`} alt={name} />}
      <h5> {name} </h5>
    </div>
  );
}

export default ItemCard;
