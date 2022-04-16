import { useState } from "react";
import TextBox from "./components/TextBox";
import Button from "./components/Button";
import Arrows from "./components/Arrows";
import Modal from "./components/Modal";

const App = () => {
  const [ inputLanguage, setInputLanguage ] = useState(`English`);
  const [ outputLanguage, setOutputLanguage ] = useState(`Japanese`);

  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
  }

  return (
    <div className="app">
      <TextBox selectedLanguage={inputLanguage} style="input" />
      
      <div  className="arrow-container" onClick={handleClick}>
        <Arrows />
      </div>
      
      <TextBox selectedLanguage={outputLanguage} style="output" />
    </div>
  );
};

export default App;
