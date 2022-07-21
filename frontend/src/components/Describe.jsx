import React from "react";
import OpacityIcon from "@mui/icons-material/Opacity";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import flower from "../assets/img/plante.jpg";
import "../assets/css/Describe.css";
import Logout from "./Logout";

function Describe() {
  return (
    <div className="describe-container">
      <Logout />
      <img className="flower-picture" src={flower} alt="flower" />
      <h2 className="title">Rosa gallica officinalis</h2>

      <div className="icon-container">
        <h2>Environnement idéal pour votre plante</h2>
        <OpacityIcon />
        <p>20 à 50% Humidité relative</p>
        <DeviceThermostatIcon />
        <p>15 à 26°C</p>
        <BeachAccessIcon />
        <p>5 - 7 heures d’ensolleillement</p>
        <h3>
          D'une manière générale, l'arrosage doit se faire régulièrement pour
          garder la terre humide mais sans excès. Vider l'eau résiduelle de la
          soucoupe pour éviter le pourrissement des racines. Réduire les
          arrosages après floraison. Apporter de l'engrais liquide pour plantes
          fleuries 1 ou 2 fois par mois.
        </h3>
      </div>
    </div>
  );
}

export default Describe;
