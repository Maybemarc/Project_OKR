import User from "../models/User.js";
import Department from "../models/Department.js";
import Team from "../models/Team.js";

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Department deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Team deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
