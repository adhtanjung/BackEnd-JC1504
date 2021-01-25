const express = require("express");
const db = require("../database");
const router = express.Router();
const {
  checkToken,
  createJWTToken,
  hashPassword,
  transporter,
} = require("../helper");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  let sql = `
    SELECT 
        id, 
        username, 
        email, 
        alamat, 
        roleID, 
        verified 
    FROM users WHERE username = '${username}' AND password = '${hashPassword(
    password
  )}'`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (data.length === 0) {
      return res.status(404).send({
        message: "User Not Found",
        status: "Not Found",
      });
    } else {
      const responseData = { ...data[0] };
      const token = createJWTToken(responseData);
      responseData.token = token;
      return res.status(200).send(responseData);
    }
  });
});

router.post("/keep-login", checkToken, (req, res) => {
  let sql = `
    SELECT 
        id, 
        username, 
        email, 
        alamat, 
        roleID, 
        verified 
    FROM users WHERE id = ${req.user.id}`;
  db.query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(data[0]);
  });
});

// Register Authentication Flow
router.post("/register", (req, res) => {
  let { username, password, email, alamat } = req.body;
  password = hashPassword(password);
  // Add data to database
  const sql = `INSERT INTO users (username, email, password, alamat, roleID, verified) VALUES ('${username}', '${email}', '${password}', '${alamat}', 2, 0)`;
  db.query(sql, (err, data) => {
    if (err) return res.send(500).send(err);
    // Send Email
    const mailOptions = {
      from: "Admin <lian.eddy@gmail.com>",
      to: email,
      subject: "Email Verification",
      html: `<h1>Welcome ${username} to Commerce</h1> <br> <a href="http://localhost:3000/verify?username=${username}&password=${password}">Click Here to Verify your Account</a>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return res.status(500).send(err);
      // Get data for login at client
      const get = `SELECT id, username, email, alamat, roleID, verified FROM users WHERE id = ${data.insertId}`;
      db.query(get, (err, result) => {
        if (err) return res.status(500).send(err);

        const responseData = { ...result[0] };
        const token = createJWTToken(responseData);
        responseData.token = token;
        return res.status(200).send(responseData);
      });
    });
  });
});

// Email Verification
router.post("/email-verification", (req, res) => {
  const { username, password } = req.body;
  const get = `SELECT id FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.query(get, (err, data) => {
    if (err) res.status(500).send(err);

    const idUser = data[0].id;
    const edit = `UPDATE users SET verified = 1 WHERE id = ${idUser}`;
    db.query(edit, (err) => {
      if (err) return res.send(500).send(err);

      return res.status(200).send({
        message: "User Verified",
        status: "Verified",
      });
    });
  });
});

module.exports = router;
