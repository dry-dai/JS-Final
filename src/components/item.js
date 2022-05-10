import styles from "./css-modules/item.module.css";
import { Link } from "react-router-dom";

function Item({ video, video_hover, item_title, link }) {
  return (
    <Link
      className={styles.link}
      to={item_title.toLowerCase().replaceAll(" ", "_")}
    >
      <div className={styles.item_container}>
        <div className={styles.video_container}>
          <video
            className={styles.main_video}
            width="100%"
            height="100%"
            autoPlay
            muted
            loop
          >
            <source src={video} type="video/mp4"></source>
          </video>
          <video
            className={styles.hover_video}
            width="100%"
            height="100%"
            autoPlay
            muted
            loop
          >
            <source src={video_hover} type="video/mp4"></source>
          </video>
        </div>
        <h1 className={styles.heading_title}>{item_title}</h1>
        <p>View Details {">"}</p>
      </div>
    </Link>
  );
}

export default Item;
