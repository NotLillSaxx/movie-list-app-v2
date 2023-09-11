import react, { useState, useRef, useEffect } from "react";
import "./itemCard.css";

function ItemCard({ name, image }) {
  const [imgSrc, setImageSrc] = useState(
    `https://test.create.diagnal.com/images/${image}`
  );

  // in case of error while loading the image we will set default image url
  const handleImgError = () => {
    setImageSrc('https://westsiderc.org/wp-content/uploads/2019/08/Image-Not-Available.png')
  }

  return (
    <div className="item-card">
      <img onError={handleImgError} src={imgSrc} alt={name} />
      <h5> {name} </h5>
    </div>
  );
}

export default ItemCard;
