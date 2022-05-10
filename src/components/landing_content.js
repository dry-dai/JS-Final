import styles from "./css-modules/landing_content.module.css";
import { useNavigate } from "react-router-dom";
import HomeThree from "./three/home_three";

function LandingContent({ heading, desc, buttons }) {
  let navigate = useNavigate();
  function processClick(buttonData) {
    if (buttonData.linkType === "in_app") {
      navigate(buttonData.link);
    } else {
      window.open(buttonData.link);
    }
  }

  return (
    <div className={styles.landing_content}>
      <div className={styles.content_container}>
        <h1 className={styles.heading}>{heading}</h1>
        <p className={styles.desc}>{desc}</p>

        <div className={styles.buttons_container}>
          {buttons.length > 0 &&
            buttons.map((buttonData, index) => {
              return (
                <>
                  {buttonData.type === "filled_button" ? (
                    <div
                      className={styles.filled_button}
                      onClick={() => processClick(buttonData)}
                    >
                      <p>{buttonData.text}</p>
                    </div>
                  ) : (
                    <div
                      className={styles.round_button}
                      onClick={() => processClick(buttonData)}
                    >
                      <div className={styles.round_container}>
                        <div className={styles.inner_circle}></div>
                      </div>
                      <p>{buttonData.text}</p>
                    </div>
                  )}
                </>
              );
            })}
        </div>
      </div>
      <div className={styles.three_container}>
        <HomeThree />
      </div>
    </div>
  );
}

export default LandingContent;
