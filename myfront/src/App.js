import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card/Card';
import SmallButton from './SmallButton/SmallButton';
import FullRecord from './FullRecord/FullRecord';

function App() {
  const [records, setRecords] = useState([]);
  const [slide, setSlide] = useState(1);
  const [view, setView] = useState("cards");
  useEffect(() => {
    axios.get("/getRecords").then(response => {
      setRecords(response.data.records);
    }, [10000]);
  });

  const addNewRecord = (newName, newText) => {
    axios.post("/addRecord", {
      "username": newName,
      "text": newText,
    })
  }
  const openEditor = () => {
    setView("editor");
  }
  const slideUp = () => {
    if (slide * 20 < records.length) {
      setSlide(slide + 1);
    }
  }
  const slideDown = () => {
    if (slide > 1) {
      setSlide(slide - 1);
    }
  }
  const leaveEditor = (newText) => {
    if (newText != undefined) {
      console.log("SAVED", newText);
      addNewRecord("JijaLoqie", newText);
    }
    setView("cards");
  }
  
  return (  
    <div className="App"> { (view == "cards") ?<> <div className='Gray-block'>
        <SmallButton icon="Accounts"/>
        <SmallButton icon="Add" handler={() => openEditor()}/>
        </div>
      <div className='Records'>
        {
          records.slice((slide - 1)*20, slide*20).map(({username, text, date, user_id}) => <Card key={user_id}
          name={username}
          text={text}
          date={new Date(date).toLocaleTimeString()}/>)
        }
      </div>
      <div className='Gray-block'>
        <SmallButton icon="Left" handler={slideDown}/>
        <SmallButton text={slide + ` / ${Math.ceil(records.length/20)}`}/>
        <SmallButton icon="Right" handler={slideUp}/>
      </div></> : (view == "editor") ? <>
      <FullRecord
      handeGoBack={leaveEditor}
      />
      </> : (view == "record") ? <div></div>
  : <div></div>}
    </div>);


}

export default App;
