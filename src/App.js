import logo from "./logo.svg";
import "./App.css";
import Home from "./views/home";
import ItemList from "./views/itemlist";
import ItemView from "./views/itemview";
import fire_ori from "./resources/assets/Videos/FireOriginal.mp4";
import fire_nft from "./resources/assets/Videos/FireNFT.mp4";
import piano_ori from "./resources/assets/Videos/PianoOriginal.mp4";
import piano_nft from "./resources/assets/Videos/PianoNFT.mp4";
import water_ori from "./resources/assets/Videos/WaterOriginal.mp4";
import water_nft from "./resources/assets/Videos/WaterNFT.mp4";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  let data = [
    {
      video: fire_ori,
      video_hover: fire_nft,
      title: "EYE OF THE DEVIL",
      three_id: "eye",
    },
    {
      video: piano_ori,
      video_hover: piano_nft,
      title: "PIANO HOOP",
      three_id: "piano",
    },
    {
      video: water_ori,
      video_hover: water_nft,
      title: "WATER MATRIX",
      three_id: "water",
    },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itemlist" element={<ItemList data={data} />} />
          <Route path="/itemlist/:item_id" element={<ItemView data={data} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
