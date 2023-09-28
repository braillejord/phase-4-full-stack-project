import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

function Logo() {
  return (
    <NavLink exact to="/">
      <img id="logo-image" src="def_repr.png" alt="Def Repr Logo" />
    </NavLink>
  );
}

export default Logo;
