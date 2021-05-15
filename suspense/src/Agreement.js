import React from "react";

export default function Agreement({ onAgree = f => f }) {
  return (
    <div>
      <p>Condiciones...</p>
      <p>Estos son los términos y condiciones. Estas de acuerdo?</p>
      <button onClick={onAgree}>Estoy de acuerdo</button>
    </div>
  );
}
