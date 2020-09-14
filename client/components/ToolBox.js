import React, { useState, useEffect } from "react";

function Toolbox() {
  return (
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
      <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
        {fontSizes.map((fontOption, idx) => (
          <option key={idx.toString()} value={fontOption}>
            {fontOption}
          </option>
        ))}
      </select>
    </div>
  );
}
