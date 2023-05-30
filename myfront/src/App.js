import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Card from "./Card/Card";
import SmallButton from "./SmallButton/SmallButton";
import FullRecord from "./FullRecord/FullRecord";
import Parser from "html-react-parser";
import AccountMenu from "./AccountMenu/AccountMenu";

function App() {
  const [records, setRecords] = useState([]);
  const [login, setLogin] = useState("");
  const [targetRecord, setTargetRecord] = useState("");
  const [slide, setSlide] = useState(1);
  const [view, setView] = useState("accounts");

  useEffect(() => {
    axios.get("/getRecords").then(
      (response) => {
        setRecords(response.data.records);
      },
      [10000]
    );
  });

  const getTextById = (id) => {
    for (let i = 0; i < records.length; i++) {
      if (id == records[i].user_id) {
        return records[i].text;
      }
    }
    return "";
  };
  const addNewRecord = (newName, newText) => {
    axios.post("/addRecord", {
      username: newName,
      text: newText,
    });
  };
  const editRecord = async (id, newText) => {
    axios.post("/editRecord", {
      id: id,
      text: newText,
    });
  };

  const removeRecord = async (target) => {
    const checkOwner = await isOwner(target, login);
    console.log(target, login)
    if (!checkOwner) {
      alert("Нет доступа: вы не владелец записи!");
      return;
    }
    axios
      .post("/deleteRecord", {
        id: target,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const isOwner = async (card_id, username) => {
    var checkForOwner;
    await axios.post("/isOwner", { id: card_id, login: username }).then((response) => {
      checkForOwner = response.data.isOwner;
    });
    return checkForOwner;
  };

  const openEditor = async (target_id) => {
    if (target_id !== -1) {
      const checkOwner = await isOwner(target_id, login);
      console.log(target_id, login)
      if (!checkOwner) {
        alert("Нет доступа: вы не владелец записи!")
        return;
      }
      setTargetRecord(target_id);
      setView("editor");
    } else {
      setView("creator");
    }
  };
  const openReader = (target_id) => {
    setTargetRecord(target_id);
    setView("reader");
  };
  const openAccounts = () => {
    setView("accounts");
  };
  const slideUp = () => {
    if (slide * 20 < records.length) {
      setSlide(slide + 1);
    }
  };
  const slideDown = () => {
    if (slide > 1) {
      setSlide(slide - 1);
    }
  };
  const leaveEditor = (newText, isNew, id) => {
    if (newText != undefined) {
      console.log("SAVED", newText, "id =", id);
      if (isNew) {
        addNewRecord(login, newText);
      } else {
        editRecord(id, newText);
      }
    }
    setView("cards");
  };
  const enterSystem = (newLogin) => {
    setLogin(newLogin);
    setView("cards");
  };

  return (
    <div className="App">
      {" "}
      {view == "cards" ? (
        <>
          {" "}
          <div className="Gray-block">
            <SmallButton icon="Accounts" handler={() => openAccounts()} />
            <SmallButton icon="Add" handler={() => openEditor(-1)} />
          </div>
          <div className="Records">
            {records
              .slice((slide - 1) * 20, slide * 20)
              .map(({ username, text, date, user_id }) => (
                <Card
                  key={user_id}
                  id={user_id}
                  name={username}
                  text={Parser(text)}
                  date={new Date(date).toLocaleTimeString()}
                  handlers={{
                    Reader: () => {
                      openReader(user_id);
                    },
                    Editor: () => {
                      openEditor(user_id);
                    },
                    Delete: () => {
                      removeRecord(user_id);
                    },
                  }}
                />
              ))}
          </div>
          <div className="Gray-block">
            <SmallButton icon="Left" handler={slideDown} />
            <SmallButton
              text={slide + ` / ${Math.max(1, Math.ceil(records.length / 20))}`}
            />
            <SmallButton icon="Right" handler={slideUp} />
          </div>
        </>
      ) : view == "editor" ? (
        <>
          <FullRecord
            handeGoBack={leaveEditor}
            edit={true}
            isNew={false}
            defaultValue={getTextById(targetRecord)}
            id={targetRecord}
          />
        </>
      ) : view == "creator" ? (
        <>
          <FullRecord handeGoBack={leaveEditor} edit={true} isNew={true} />
        </>
      ) : view == "reader" ? (
        <>
          <FullRecord
            handeGoBack={leaveEditor}
            edit={false}
            isNew={false}
            defaultValue={getTextById(targetRecord)}
            id={targetRecord}
          />
        </>
      ) : view == "accounts" ? (
        <>
          <AccountMenu handleEnterSystem={enterSystem} />
        </>
      ) : (
        <div></div>
      )}
      <a className="link" href="https://jijaloqie.github.io/">
        Made by JijaLoqie
      </a>
    </div>
  );
}

export default App;
