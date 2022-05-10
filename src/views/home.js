import Landing from "../components/landing";
import Navbar from "../components/navbar";

function Home() {
  return (
    <div>
      <Navbar heading={"The Third Ear"} sub_heading={"NEW YORK"} />
      <Landing
        landing_heading={
          "Make NFTs Earring Touchable and Wearable in The Third Ear"
        }
        landing_description={
          "Create your own collection space into virtual world. Explore & purchase your physical and digital earrings at the same time."
        }
        buttons={[
          {
            type: "filled_button",
            text: "Explore Now",
            link: "itemlist",
            linkType: "in_app",
          },
          {
            type: "round_button",
            text: "Visit Collection Space",
            link: "https://google.com",
            linkType: "external",
          },
        ]}
      />
    </div>
  );
}

export default Home;
