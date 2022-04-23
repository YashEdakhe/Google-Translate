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
    const options = {
      method: "GET",
      url: "https://google-translate20.p.rapidapi.com/languages",
      headers: {
        "X-RapidAPI-Host": "google-translate20.p.rapidapi.com",
        "X-RapidAPI-Key": "0e344143d8msh07f1a39fb35b5a5p182601jsnbff5d5f4bc77",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        const arrayOfData = Object.keys(response.data.data).map(
          (key) => response.data.data[key]
        );
        setLanguages(arrayOfData);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const translate = async () => {
    const options = {
      method: "GET",
      url: "https://google-translate20.p.rapidapi.com/translate",
      params: {
        text: textToTranslate,
        tl: outputLanguage,
        sl: inputLanguage,
      },
      headers: {
        "X-RapidAPI-Host": "google-translate20.p.rapidapi.com",
        "X-RapidAPI-Key": "0e344143d8msh07f1a39fb35b5a5p182601jsnbff5d5f4bc77",
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setTranslatedText(response.data.data.translation);
      })
      .catch(function (error) {
        console.error(error);
      });
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
