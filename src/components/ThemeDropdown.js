import React, { useEffect, useState } from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "../constants/customStyles";

const ThemeDropdown = ({ handleThemeChange, socketRef, roomId }) => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("themeChange", ({ theme }) => {
        setSelectedTheme(theme);
        handleThemeChange(theme);
      });
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.off("themeChange");
      }
    };
  }, [socketRef.current]);

  const handleChange = (selectedOption) => {
    setSelectedTheme(selectedOption);
    handleThemeChange(selectedOption);
    socketRef.current.emit("themeChange", {
      roomId,
      theme: selectedOption,
    });
  };

  return (
    <Select
      placeholder={`Select Theme`}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={selectedTheme}
      styles={customStyles}
      onChange={handleChange}
    />
  );
};

export default ThemeDropdown;
