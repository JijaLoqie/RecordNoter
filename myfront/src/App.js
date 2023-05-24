import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card/Card';
import SmallButton from './SmallButton/SmallButton';

function App() {
  const [records, setRecords] = useState([
    {name: "JijaLoqie", text: "Hello World!", date: "24.05.2023"},
    {name: "JijaLoqie", text: "Hello World!", date: "24.05.2023"},
    {name: "JijaLoqie", text: "Hello World!", date: "24.05.2023"},
    {name: "JijaLoqie", text: "Hello World!", date: "24.05.2023"},
    {name: "JijaLoqie", text: "Hello World!", date: "24.05.2023"},
    {name: "JijaLoqie", text: "Hello World!", date: "24.05.2023"},
  ]);
  
  return (
    <div className="App">
      <div className='Gray-block'>
        <SmallButton icon="Accounts"/>
        <SmallButton icon="Add"/>
        </div>
      <div className='Records'>
        {
          records.map(({name, text, date}) => <Card
          name={name}
          text={text}
          date={date}/>)
        }
      </div>
      <div className='Gray-block'>
        <SmallButton icon="Left"/>
        <SmallButton icon="Right"/>
      </div>
    </div>
  );
}

export default App;
