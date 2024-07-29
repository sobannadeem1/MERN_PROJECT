const validate = (schema) => async (req, res, next) => {
  try {
    const validatedData = await schema.parseAsync(req.body);
    req.body = validatedData;
    next();
  } catch (error) {
    const message =
      error.errors && error.errors[0] && error.errors[0].message
        ? error.errors[0].message
        : "Invalid input";

    console.log(message);
    res.status(400).json({ message });

    const err = {
      status: 400,
      message,
    };

    next(err);
  }
};

module.exports = validate;
