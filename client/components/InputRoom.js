import React, { useState, useEffect } from "react";

function InputRoom() {
  const [room, setRoom] = useState("room");

  return (
    <div>
      <div className="inputRoomField">
        <label for="room">Room:</label>
        <input name="room" />
        <button className="button">Join Room</button>
      </div>
    </div>
  );
}

export default InputRoom;
