import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Register.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password"; // extend yup
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import flower from "../assets/img/plante.jpg";

YupPassword(yup);

const schema = yup
  .object({
    email: yup.string().email("adress email invalide"),
    password: yup
      .string()
      .password()
      .minLowercase(8)
      .minUppercase(1)
      .min(0)
      .required(),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Les mots de passe ne sont pas identiques"
      ),
  })
  .required();

function Register() {
  const navigate = useNavigate();
  const successful = () => {
    toast.success("Bravo vous êtes inscrit", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const failed = () => {
    toast.error("Le mail existe déjà", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
      .post("http://localhost:5000/api/user", data)
      .then((response) => {
        if (response.status === 200) {
          successful();
          window.setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      })
      .catch((err) => {
        console.log("coucou erreur", err);
        resetField("email");
        resetField("password");
        resetField("confirmPassword");
        failed();
      });
  };

  return (
    <div className="login-container">
      <img className="flower-picture" src={flower} alt="flower" />
      <h1 className="title">Flower Connect'</h1>
      <div className="form-container">
        <h2 className="register-title">Inscription</h2>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <input
            defaultValue="email"
            {...register("email", { required: true })}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <input
            defaultValue="mot de passe"
            {...register("password", { required: true })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <input
            defaultValue="Confirmez mot de passe"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <button
            className="button"
            type="submit"
            disabled={
              errors.email ||
              errors.password ||
              errors.confirmPassword ||
              !dirtyFields.confirmPassword ||
              !dirtyFields.password ||
              !dirtyFields.email
            }
          >
            Inscrivez-vous
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Register;
