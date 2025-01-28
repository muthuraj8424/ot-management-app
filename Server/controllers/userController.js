const User = require("../models/User");
const Staff = require("../models/Staff");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  console.log(req.body);
  

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({newUser,success:true,message:'user registered successfully'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the credentials match the values from the .env file
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Role is hardcoded as 'admin' in this case
      const token = jwt.sign(
        { email: process.env.ADMIN_EMAIL, role: process.env.ADMIN_ROLE },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 2 * 60 * 60 * 1000, // expires in 1 hour
      });

      return res.json({
        message: "Login successful for adddmin",
        user: { email: process.env.ADMIN_EMAIL, role: process.env.ADMIN_ROLE },
        token,
        success:true
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id,usernname:email }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 2 * 60 * 60 * 1000
      }); // expires in 1 hour

      res.json({ user, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const AddStaff = async (req, res) => {
  console.log(req.body);

  try {
    const newStaff = new Staff(req.body);
    const savedStaff = await newStaff.save();
    res.status(201).json({
      message: "Staff member added successfully",
      data: savedStaff,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStaffList = async (req, res) => {
  try {
    const staffList = await Staff.find(); // Retrieve all staff from the database
    res.status(200).json(staffList); // Return the list of staff
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStaff = async (req, res) => {
  try {
    const { name, position, department, contact, shift, salary } = req.body;
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    staff.name = name || staff.name;
    staff.position = position || staff.position;
    staff.department = department || staff.department;
    staff.contact = contact || staff.contact;
    staff.shift = shift || staff.shift;
    staff.salary = salary || staff.salary;

    await staff.save();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStaff = async (req, res) => {
  console.log(req.params);

  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  const token = req.cookies?.token;
  console.log("Token before logout:", token);

  // Clear the token cookie
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" }); // Ensure the cookie name matches the one you set earlier

  // Send a response to confirm logout
  res.status(200).json({ message: "Logged out successfully",success:true });

};

const getstafftable = async(req,res)=>{
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  AddStaff,
  getStaffList,
  updateStaff,
  deleteStaff,
  logout,
  loginAdmin,
  getstafftable
};
