const validationService = (schema) => async (req, res, next) => {
  const { body } = req;

  try {
    await schema.validate(body);
    next();
    return "ok";
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = validationService;
