const express = require("express");
const authMiddleware = require('../middleware/AuthMIdd');
// const adminMiddleware = require('../middleware/Admmin');
const {
  registerUser,
  loginAdmin,
  AddStaff,
  getStaffList,
  deleteStaff,
  updateStaff,
  logout,
  loginUser,
  getstafftable
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/adminlogin", loginAdmin);
router.post("/addstaff",authMiddleware, AddStaff);
router.get("/getAllStaff", getStaffList);
router.delete('/staff/:id',authMiddleware,deleteStaff)
router.put('/staff/:id',authMiddleware,updateStaff)
router.post('/logout',logout)
router.post('/stafflogin',loginUser)
router.get('/staffTable',getstafftable)
module.exports = router;
