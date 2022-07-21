import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Level.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import axios from "axios";
import flower from "../assets/img/plante.jpg";
import lower from "../assets/img/sec.png";
import middle from "../assets/img/coeur.png";
import hight from "../assets/img/flooded.png";
import Logout from "../components/Logout";

const marksHumidity = [
  {
    value: 0,
    label: "0%",
  },

  {
    value: 100,
    label: "100%",
  },
];
const marksLum = [
  {
    value: 0,
    label: "0Lum",
  },

  {
    value: 100,
    label: "100Lum",
  },
];
function valuetext(value) {
  return `${value}°C`;
}

function Level() {
  const [light, setLight] = useState(0);

  const changeLight = () => {
    const uuid = JSON.parse(localStorage.getItem("useruuid"));
    if (light === 1) {
      setLight(0);
    }
    if (light === 0) {
      setLight(1);
    }

    axios
      .post("http://localhost:5000/api/light-control", { light, uuid })
      .then((response) => {
        if (response.data === true) {
          console.error("valeur modifiée");
        } else {
          console.error("non pas modifiée");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [datas, setDatas] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/author", { withCredentials: true })
      .then(() => {
        const uuid = JSON.parse(localStorage.getItem("useruuid"));
        axios.get(`http://localhost:5000/api/datas/${uuid}`).then((data) => {
          const receiveDatas = data.data[0];
          setLight(data.data[0].light);

          setDatas(receiveDatas);
        });
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  const describe = () => {
    navigate("/describe");
  };
  return (
    <div className="level-container">
      <Logout />
      <img className="flower-picture" src={flower} alt="flower" />
      <button className="btn-describe" type="button" onClick={describe}>
        <h2 className="title">Rosa gallica officinalis</h2>
      </button>
      <div className="bar-container">
        <h3>Humidity</h3>
        {datas && (
          <Box sx={{ width: 300 }}>
            <Slider
              sx={{ color: "#18534f" }}
              aria-label="Custom marks"
              defaultValue={datas && datas.humidity}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marksHumidity}
            />
          </Box>
        )}
        <h3>Luminosity</h3>
        {datas && (
          <Box sx={{ width: 300 }}>
            <Slider
              sx={{ color: "#18534f" }}
              aria-label="Custom marks"
              defaultValue={datas && datas.luminosity}
              getAriaValueText={valuetext}
              step={10}
              marks={marksLum}
            />
          </Box>
        )}

        <button className="btn-light" type="button" onClick={changeLight}>
          {light === 0 ? "Switch OFF" : "Switch ON"}
        </button>
      </div>

      <div className="describe-plants">
        {datas && (
          <div>
            {datas.luminosity <= 10 && (
              <div>
                <img src={lower} alt="lower" />
                <p>
                  Attention, votre plante à besoin d'eau, il faut absolument lui
                  donner à boire
                </p>
              </div>
            )}
          </div>
        )}
        {datas && (
          <div>
            {datas.luminosity > 10 && datas.luminosity < 30 && (
              <div>
                <img src={middle} alt="middle" />
                <p>
                  Votre plante est en parfaite santé, Félicitations, vous êtes
                  parfait
                </p>
              </div>
            )}
          </div>
        )}
        {datas && (
          <div>
            {datas.luminosity >= 30 && (
              <div>
                <img src={hight} alt="hight" />
                <p>
                  Attention, votre plante est noyée !!! Veuillez la mettre à la
                  lumière
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Level;
