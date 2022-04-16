import SelectDropDown from "./SelectDropDown";

const TextBox = ({ style , selectedLanguage}) => {
  return (

    <div className={style}>
      <SelectDropDown 
        selectedLanguage={selectedLanguage}
      />
      <textarea
        placeholder={style === `input` ? `Enter String` : `Translation`}
        disabled={style === `output`}
      />
      
    </div>
  );
};

export default TextBox;
