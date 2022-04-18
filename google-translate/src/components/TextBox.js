import SelectDropDown from "./SelectDropDown";

const TextBox = ({ style, setShowModal, selectedLanguage }) => {
  return (
    <div className={style}>
      <SelectDropDown
        style={style}
        selectedLanguage={selectedLanguage}
        setShowModal={setShowModal}
      />
      <textarea
        placeholder={style === `input` ? `Enter String` : `Translation`}
        disabled={style === `output`}
      />
    </div>
  );
};

export default TextBox;
