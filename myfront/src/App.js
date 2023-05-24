import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card/Card';
import SmallButton from './SmallButton/SmallButton';

function App() {
  const [records, setRecords] = useState([
    {name: "JijaLoqie", text: "Hello World!", date: "24.05.2023", id:1},
    {name: "JijaLoqie", text: "Hello World!", date: "24.05.2023", id:2},
    {name: "JijaLoqie", text: "Hello World!", date: "24.05.2023", id:3},
    {name: "JijaLoqie", text: "Hello World!", date: "24.05.2023", id:4},
    {name: "JijaLoqie", text: "Hello World!", date: "24.05.2023", id:5},
  ]);
  const [slide, setSlide] = useState(1);

  const addNewRecord = (newName, newText, newDate) => {
    setRecords(oldRecords => [...records, {name: newName, text: newText, date: newDate, id:oldRecords.length + 1}])
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
  
  return (
    <div className="App">
      <div className='Gray-block'>
        <SmallButton icon="Accounts"/>
        <SmallButton icon="Add" handler={() => addNewRecord("JijaLoqie", "Some TexasdsdadtTexasdsdadtTexasdsdadtTexasdsdadt", "24.05.2023")}/>
        </div>
      <div className='Records'>
        {
          records.slice((slide - 1)*20, slide*20).map(({name, text, date, id}) => <Card key={id}
          name={name}
          text={text}
          date={date}/>)
        }
      </div>
      <div className='Gray-block'>
        <SmallButton icon="Left" handler={slideDown}/>
        <SmallButton text={slide + `/ ${Math.ceil(records.length/20)}`}/>
        <SmallButton icon="Right" handler={slideUp}/>
      </div>
    </div>
  );
}

export default App;
