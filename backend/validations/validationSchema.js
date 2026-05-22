const { body } = require("express-validator");

const validationSchema = {
  register: [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail()
    .withMessage("Invalid email format")
    .notEmpty().withMessage('Email is Required.')
    // body("password")
    //   .isLength({ min: 6 })
    //   .withMessage("Password must be at least 6 characters long"),
  ],
  login: [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  updateUser: [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("email").optional().isEmail().withMessage("Invalid email format"),
  ],
  createJob: [
    body("title").notEmpty().withMessage("Job title is required"),
    body("description").notEmpty().withMessage("Job description is required"),
    body("salary").isNumeric().withMessage("Salary must be a number"),
  ],
};

module.exports = validationSchema;
