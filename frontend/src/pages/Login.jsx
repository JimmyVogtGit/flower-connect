import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import flower from "../assets/img/plante.jpg";
import "react-toastify/dist/ReactToastify.css";

const schema = yup
  .object({
    email: yup.string().email("Ce n'est pas un email valide"),
    password: yup.string().required("mot de passe obligatoire"),
    uuid: yup.number("Doit etre une suite de chiffre").required(),
  })
  .required();

function Login() {
  const navigate = useNavigate();
  const iotFind = () => {
    toast.success("Vous êtes désormais connecté avec l'object", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const iotNotFind = () => {
    toast.error("uuid non trouvé, object non connecté. Veuillez recommencer", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const [connectIot, setConnectIot] = useState(false);
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const { uuid } = data;

    axios
      .get(`http://localhost:5000/api/find-iot/${uuid}`)
      .then((response) => {
        const dataResponse = response.data;
        if (dataResponse === true) {
          iotFind();
          window.setTimeout(() => {
            navigate("/level");
          }, 3500);
        } else {
          resetField("email");
          resetField("password");
          resetField("uuid");
          iotNotFind();
        }
      })
      .catch((err) => {
        console.log("coucou err", err);
        toast.error("🦄 failed", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="login-container">
      <img className="flower-picture" src={flower} alt="flower" />
      <h1 className="title">Flower Connect'</h1>
      <div className="form-container">
        <h2 className="login-title">Connexion</h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
          <input {...register("password", { required: true })} />
          {errors.password && <p>{errors.password.message}</p>}
          <input {...register("uuid", { required: true })} />
          {errors.uuid && <p>{errors.uuid.message}</p>}

          <button
            className="button"
            type="submit"
            disabled={
              errors.email ||
              errors.password ||
              errors.uuid ||
              !dirtyFields.uuid ||
              !dirtyFields.password ||
              !dirtyFields.email
            }
          >
            envoyez
          </button>
          <div className="noaccount-container">
            <p className="noaccount">
              Pas de compte ? inscrivez vous
              <Link to="/register">ici</Link>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
