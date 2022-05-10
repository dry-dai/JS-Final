import styles from "./css-modules/item_details.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function ItemDetails({ data }) {
  let location = useLocation();

  const [itemdata, setData] = useState(null);

  useEffect(() => {
    let id =
      location.pathname.split("/")[location.pathname.split("/").length - 1];

    let filteredData = data.filter((obj) => {
      return obj.title.toLowerCase().replaceAll(" ", "_") === id;
    });
    setData(filteredData[0]);
  }, []);

  return (
    <div className={styles.item_details_container}>
      <div className={styles.data_container}>
        {itemdata && <h1>{itemdata.title}</h1>}
      </div>
      <div className={styles.three_container}>
        {itemdata && itemdata.three_id === "eye" && (
          <iframe
            width="100%"
            className={styles.iframe}
            id={styles.decrease_margin}
            src="https://dry-dai.github.io/fire_ear/"
            title="Fire Ear"
          ></iframe>
        )}
        {itemdata && itemdata.three_id === "piano" && (
          <iframe
            width="100%"
            className={styles.iframe}
            src="https://dry-dai.github.io/three-play-sound/"
            title="Fire Ear"
          ></iframe>
        )}
        {itemdata && itemdata.three_id === "water" && (
          <iframe
            width="100%"
            className={styles.iframe}
            src="https://dry-dai.github.io/three-bubble/"
            title="Fire Ear"
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default ItemDetails;
