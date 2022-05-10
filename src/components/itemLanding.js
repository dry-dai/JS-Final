import styles from "./css-modules/item_landing.module.css";
import Item from "./item";
function ItemLanding({ data }) {
  return (
    <div className={styles.landing_container}>
      <div className={styles.landing_items}>
        {data.length > 0 &&
          data.map((itemData, index) => {
            return (
              <div className={styles.landing_item} key={index}>
                <Item
                  video={itemData.video}
                  video_hover={itemData.video_hover}
                  item_title={itemData.title}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ItemLanding;
