import { useState,useEffect } from "react";
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

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  };

  const getLanguages = () => {
    const options = {
      method: 'GET',
      url: 'https://google-translate20.p.rapidapi.com/languages',
      headers: {
        'X-RapidAPI-Host': 'google-translate20.p.rapidapi.com',
        'X-RapidAPI-Key': '0e344143d8msh07f1a39fb35b5a5p182601jsnbff5d5f4bc77'
      }
    }
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      const arrayOfData = Object.keys(response.data.data[1])/*.map( key => response.data.data[key])*/
      console.log("arrayOfData=>",arrayOfData);
      // setLanguages(arrayOfData);
    }).catch(function (error) {
      console.error(error);
    })
  }
  console.log(`languages`,languages);

  useEffect (()=>{
    getLanguages()   //Callinbg an API called getLanguages
  },[])

  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            setShowModal={setShowModal}
            selectedLanguage={inputLanguage}
            style='input'
          />

          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>

          <TextBox
            setShowModal={setShowModal}
            selectedLanguage={outputLanguage}
            style='output'
          />
        </>
      )}

      {showModal && <Modal setShowModal={setShowModal} 
        languages={languages}
      />}
    </div>
  );
};

export default App;
