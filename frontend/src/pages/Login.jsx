import React from "react";
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
    toast.success(
      "Vous êtes désormais connecté, Vous pouvez dès à present connecter votre IoT",
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };
  const iotNotFind = () => {
    toast.error(
      "Veuillez connecter l'IoT et recommencer, Synchronisation échouée",
      {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

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
    axios
      .post(`http://localhost:5000/api/verify-user`, data, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data === true) {
          localStorage.setItem("useruuid", JSON.stringify(data.uuid));
          iotFind();
          window.setTimeout(() => {
            navigate("/");
          }, 3500);
        } else {
          iotNotFind();
          resetField("email");
          resetField("password");
          resetField("uuid");
        }
      })
      .catch(() => {
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
          <input defaultValue="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}

          <input
            defaultValue="mot de passe"
            {...register("password", { required: true })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <input
            defaultValue="uuid IoT"
            {...register("uuid", { required: true })}
          />
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
