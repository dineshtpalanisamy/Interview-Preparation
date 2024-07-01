import React, { useState, useEffect } from "react";

const List = ({ getItems }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(getItems(5));
    console.log(" Updating list items ...");
  }, [getItems]);

  return items.map((item, index) => <div key={index}> {item} </div>);
};

export default List;
