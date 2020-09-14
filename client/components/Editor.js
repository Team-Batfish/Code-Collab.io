import React, { useState, useEffect } from "react";
import { split as SplitEditor } from "react-ace";
import io from "socket.io-client";
import { Link } from "react-router-dom";

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
  const [mode, setmode] = useState("javascript");
  const [theme, setTheme] = useState("monokai");
  const [splits, setSplits] = useState(2);
  const [orientation, setOrientation] = useState("beside");

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

  return (
    <div>
      <div>
        <SplitEditor theme={theme} />
      </div>
    </div>
  );
}

export default Editor;
