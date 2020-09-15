import React, { useState, useEffect } from "react";
//import { split as SplitEditor } from "react-ace";
import AceEditor from "react-ace";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import InputRoom from "./InputRoom";
import { XTerm } from "xterm-for-react";
import ToolBox from "./ToolBox";
const socket = io("http://localhost:3000");

// importing all mode which are lanuages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-coffee";

// importing all themes for the editor
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-clouds_midnight";

function Editor() {
  const [mode, setMode] = useState("javascript");
  const [theme, setTheme] = useState("monokai");
  //only use if we are using split split screen component
  const [splitScreen, setSplitScreen] = useState(1);
  //only use if we are using split split screen componen
  const [orientation, setOrientation] = useState("beside");
  // const [valueText, setValueText] = useState(
  //   "function CodeCollab () {\n console.log('start code collab')\n}"
  // );
  const [code, setCode] = useState("Hey");
  const [room, setRoom] = useState("");
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    socket.on("new-ops event", (data) => {
      console.log("client side:", data);
    });
  });

  const themes = [
    "monokai",
    "github",
    "tomorrow",
    "kuroir",
    "eclipse",
    "twilight",
    "xcode",
    "solarized_dark",
    "solarized_light",
    "terminal",
    "clouds_midnight",
  ];

  const modes = [
    "javascript",
    "java",
    "python",
    "sass",
    "html",
    "css",
    "coffee",
  ];

  const fontSizes = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


  useEffect(() => {
   
    socket.on('message', (data) => {
       console.log('new room')
      setCode(data)
      socket.to(socket.id).emit('message', data);
    })
    
  })


 const handleChange = e => {
   const {value} = e.target;
   
  };


  return (
    <div>
      <div className="editor">
        <InputRoom />
        <AceEditor
          theme={theme}
          value={code}
          mode={mode}
          fontSize={fontSize}
          onChange={(code) => setCode(code.target.value)}
        />
      </div>
    </div>
  );
}

export default Editor;
