import { useState, useEffect } from "react";
import TextBox from "./components/TextBox";
import Button from "./components/Button";
import Arrows from "./components/Arrows";
import Modal from "./components/Modal";
import axios from "axios";

const App = () => {
  const [showModal, setShowModal] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [inputLanguage, setInputLanguage] = useState(`English`);
  const [outputLanguage, setOutputLanguage] = useState(`Japanese`);
  const [textToTranslate, setTextToTranslate] = useState(``);
  const [translatedText, setTranslatedText] = useState(``);

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  };

  const getLanguages = async () => {
    const response = await axios(`http://localhost:8000/languages`);
    setLanguages(response.data);
  };

  const translate = async () => {
    const data = { textToTranslate, outputLanguage, inputLanguage };
    const response = await axios(`http://localhost:8000/translation` ,{
      params:data,
    })
    setTranslatedText(response.data);
  };

  useEffect(() => {
    getLanguages(); //Calling an API called getLanguages
  }, []);

  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            style="input"
            setShowModal={setShowModal}
            selectedLanguage={inputLanguage}
            textToTranslate={textToTranslate}
            setTextToTranslate={setTextToTranslate}
            setTranslatedText={setTranslatedText}
          />

          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>

          <TextBox
            style="output"
            setShowModal={setShowModal}
            selectedLanguage={outputLanguage}
            translatedText={translatedText}
            setTranslatedText={setTranslatedText}
          />
          <div className="button-container" onClick={translate}>
            <Button />
          </div>
        </>
      )}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={
            showModal === `input` ? inputLanguage : outputLanguage
          }
          setChosenLanguage={
            showModal === `input` ? setInputLanguage : setOutputLanguage
          }
        />
      )}
    </div>
  );
};

export default App;
