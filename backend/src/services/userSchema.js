const YupPassword = require("yup-password");
const yup = require("yup");

YupPassword(yup);

const serviceSchema = yup.object({
  email: yup.string().email("adress email invalide"),
  password: yup
    .string()
    .password()
    .minLowercase(8)
    .minUppercase(1)
    .min(0)
    .required(),
});

module.exports = serviceSchema;
