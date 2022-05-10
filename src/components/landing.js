import styles from "./css-modules/landing.module.css";
import LandingContent from "./landing_content";

function Landing({ landing_heading, landing_description, buttons }) {
  return (
    <div className={styles.landing_container}>
      <LandingContent
        heading={landing_heading}
        desc={landing_description}
        buttons={buttons}
      />
    </div>
  );
}

export default Landing;
