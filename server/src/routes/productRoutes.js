const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { id: 1, name: "Milk", price: 2.5 },
    { id: 2, name: "Bread", price: 1.5 }
  ]);
});

module.exports = router;