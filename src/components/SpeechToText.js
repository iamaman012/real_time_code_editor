import React, { useState,  } from "react";
import { useSocket } from "../context/SocketContext";
import { useCode } from "../context/CodeContext";
import ACTIONS from "../Actions";

const SpeechToText = ({ socketRef, roomId }) => {
  const [listening, setListening] = useState(false);
  const [code, setCode] = useSocket();
  const [value, setValue] = useCode();

  const runSpeechRecog = () => {
    setListening(true);

    const recognition = new window.webkitSpeechRecognition();
    recognition.onstart = () => {
      console.log("Listening...");
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript:", transcript);
      handleChange(transcript);
      setListening(false);
    };
    recognition.start();
  };

  const handleChange = (transcript) => {
    setCode((prevCode) => prevCode + transcript); // Preserve previous state and add transcript
    setValue((prevValue) => prevValue + transcript); // Preserve previous state and add transcript
    var result = code+transcript;
    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      roomId,
      code: result,
    });
  };

  return (
    <div>
      <div
        className="speaker"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "13rem",
          boxShadow: "0 0 13px #0000003d",
          borderRadius: "5px",
        }}
      >
        <p
          id="action"
          style={{
            color: "grey",
            fontWeight: 800,
            padding: 0,
            paddingLeft: "2rem",
          }}
        >
          {listening ? "Listening..." : ""}
        </p>
        <button
          className="btn bg-white"
          onClick={runSpeechRecog}
          style={{
            border: "transparent",
            padding: "0.5rem",
            borderRadius: "50%" /* Add border-radius for a rounded button */,
            background: "lightblue" /* Change background color */,
            boxShadow: "0 0 5px #0000003d" /* Add a slight shadow */,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            style={{ fill: "green" }} /* Change SVG icon color */
          >
            <path d="M12 2c-2.209 0-4 1.791-4 4v6c0 2.209 1.791 4 4 4s4-1.791 4-4V6c0-2.209-1.791-4-4-4zm0 2c1.103 0 2 .897 2 2v6c0 1.103-.897 2-2 2s-2-.897-2-2V6c0-1.103.897-2 2-2zM7.5 10c-.276 0-.5.224-.5.5v3c0 .276.224.5.5.5s.5-.224.5-.5v-3c0-.276-.224-.5-.5-.5zM16.5 10c-.276 0-.5.224-.5.5v3c0 .276.224.5.5.5s.5-.224.5-.5v-3c0-.276-.224-.5-.5-.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
