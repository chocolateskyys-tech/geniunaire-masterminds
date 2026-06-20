import React from "react";

export default function CloneRoam({ onBack }) {
  return (
    <div style={{padding:"40px",color:"white"}}>
      <h1>Clone Roam Mode</h1>
      <p>Your rented clone body is walking the park.</p>
      <button onClick={onBack}>Return To Gate</button>
    </div>
  );
}
