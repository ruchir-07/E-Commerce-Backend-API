const express = require("express");
const UserRoute = express.Router();
const { userSignup, userLogin } = require("../controllers/user.controller");
const { body, validationResult } = require("express-validator");

/**
 * @swagger
 * tags:
 *  name:Users
 *  description:All the API  routes related to user
 */

/**
 * @openapi
 * /signup:
 *   post:
 *     summary: User Signup
 *     description: Register a new user with the provided information
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               role:
 *                 type: string
 *               mobileNumber:
 *                 type: string
 *                 minLength: 10
 *     responses:
 *       '201':
 *         description: Signup successful
 *       '400':
 *         description: Bad Request (validation error)
 *       '200':
 *         description: User already exists
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     description: Log in an existing user with email and password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       '201':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 token:
 *                   type: string
 *       '400':
 *         description: Bad Request (validation error)
 *       '401':
 *         description: Unauthorized (user is blocked)
 *       '422':
 *         description: Invalid password
 *       '500':
 *         description: Internal Server Error
 */

UserRoute.post(
  "/signup",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 6 }),
  body("mobileNumber").trim().isLength({ min: 10 }),
  userSignup
);
UserRoute.post(
  "/login",
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 6 }),
  userLogin
);

module.exports = {
  UserRoute,
};
