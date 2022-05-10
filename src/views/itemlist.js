import Navbar from "../components/navbar";
import ItemLanding from "../components/itemLanding";

function ItemList({ data }) {
  return (
    <div>
      <Navbar heading={"The Third Ear"} sub_heading={"NEW YORK"} />
      <ItemLanding data={data} />
    </div>
  );
}

export default ItemList;
