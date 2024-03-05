import { useState } from "react";

export default function Player({ initialName, symbol , isActive, onNameChange}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setEditing] = useState(false);


  function handleEditClick() { 
    setEditing((editing) => !editing );
    if(isEditing){
      onNameChange(symbol, playerName);
    }
  }

  function handleChange(event)
  {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="payer-name">{playerName}</span>;

  if (isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        { editablePlayerName }        
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{ (isEditing ? "Save" : "Edit") }</button>
    </li>
  );
}
