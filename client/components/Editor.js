import React, { useState, useEffect } from "react";
import { split as SplitEditor } from "react-ace";
import AceEditor from "react-ace";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import InputRoom from "./InputRoom";
import { XTerm } from "xterm-for-react";

const socket = io('http://localhost:3000')

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
  const [valueText, setValueText] = useState(
    "function CodeCollab () {\n console.log('start code collab')\n}"
  );
  const [code, setCode] = useState("");
  const [room, setRoom] = useState("");
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    console.log('new room')
    socket.on('new-ops event', (data) => {
      console.log('client side:', data)
    })
  })

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

  return (
    <div>
      <div>
        <InputRoom />
        <SplitEditor
          theme={theme}
          value={valueText}
          mode={mode}
          fontSize={fontSize}
        />
        <div>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            {themes.map((themeOption, idx) => (
              <option key={idx.toString()} value={themeOption}>
                {themeOption}
              </option>
            ))}
          </select>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            {modes.map((modeOption, idx) => (
              <option key={idx.toString()} value={modeOption}>
                {modeOption}
              </option>
            ))}
          </select>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          >
            {fontSizes.map((fontOption, idx) => (
              <option key={idx.toString()} value={fontOption}>
                {fontOption}
              </option>
            ))}
          </select>
        </div>
        <div>
          <XTerm />
        </div>
      </div>
    </div>
  );
}

export default Editor;
