import react, { useState, useRef, useEffect } from "react";
import "./itemsList.css";
import axios from "axios";

import { ItemCard } from "components";

function ItemsList({ items, searchKey }) {
  // to visualise item and show only items in the scope
  // had to comment this due to some bugs
  // const [visutalizedList, setVisualizedList] = useState([]);
  // useEffect(() => {
  //   // to call it as soon as the application lunch
  //   visualiseList();

  //   document.addEventListener("scroll", (e) => {
  //     // const itemCard = document.querySelector(".item-card");

  //     visualiseList()
  //   });
  // }, []);

  // const visualiseList = () => {
  //   const cardHeight = 208;

  //   const list = items.filter((item, index) => {
  //     const rowPlace = parseInt(index / 3) + 1;

  //     if (
  //       rowPlace * cardHeight > window.pageYOffset  + 60 &&
  //       rowPlace * cardHeight < (4 * cardHeight + 60)
  //     ) {
  //       return item;
  //     }
  //   });

  //   setVisualizedList(list);

  // };
  return (
    <div className="items-list-container">
      {items.length == 0 ? (
        <h1> {`Couldn't find your search "${searchKey}"`}</h1>
      ) : (
        items.map((item, index) => (
          <ItemCard
            key={`${item.name}-${index}`}
            name={item.name}
            image={item["poster-image"]}
          />
        ))
      )}
    </div>
  );
}

export default ItemsList;




