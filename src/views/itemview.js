import ItemDetails from "../components/item_details";
import Navbar from "../components/navbar";

function ItemView({ data }) {
  return (
    <div>
      <Navbar heading={"The Third Ear"} sub_heading={"NEW YORK"} />
      <ItemDetails data={data} />
    </div>
  );
}

export default ItemView;
