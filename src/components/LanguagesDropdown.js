import React, { useEffect, useState } from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange, socketRef, roomId }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("languageChange", ({ language }) => {
        const selectedOption = languageOptions.find(
          (option) => option.value === language
        );
        setSelectedLanguage(selectedOption);
        onSelectChange(selectedOption);
        // aman
      });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off("languageChange");
      }
    };
  }, [socketRef.current]);

  const handleChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    onSelectChange(selectedOption);
    socketRef.current.emit("languageChange", {
      roomId,
      language: selectedOption.value,
    });
  };

  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      styles={customStyles}
      value={selectedLanguage}
      onChange={handleChange}
    />
  );
};

export default LanguagesDropdown;
