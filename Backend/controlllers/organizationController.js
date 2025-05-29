import Organization from "../models/Organization.js";
import Department from "../models/Department.js";
import Team from "../models/Team.js";

export const createOrganization = async (req, res) => {
  const { name } = req.body;
  const createdBy = req.user.id;

  if (!name)
    return res.status(201).json({ message: "All fields are required" });

  try {
    const newOrg = new Organization({
      name,
      createdBy,
    });

    await newOrg.save();
    res.status(200).json({ success: true, org: newOrg });
  } catch (error) {
    console.log(`Error in Creating new Org:`, error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    const orgs = await Organization.find().populate("createdBy", "name email");
    res.status(200).json({ success: true, org: orgs });
  } catch (error) {
    console.log(`Error in Getting Organization:`, error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createDepartment = async (req, res) => {
  const { name, organizationId } = req.body;
  try {
    const newDept = new Department({ name, organizationId });
    await newDept.save();
    res
      .status(201)
      .json({ message: "Department created", department: newDept });
  } catch (error) {
    console.log(`Error in Creating Department:`, error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllDepartment = async (req, res) => {
  try {
    const department = await Department.find().populate("organizationId", "name");
    res.status(200).json({ success: true, department });
  } catch (error) {
    console.log(`Error in Getting all Department:`, error);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};

export const createTeam = async (req, res) => {
  const { name, departmentId } = req.body;
  try {
    const newTeam = new Team({ name, departmentId });
    await newTeam.save();

    res.status(201).json({ message: "Team created", team: newTeam });
  } catch (error) {
    console.log(`Error in Creating Team:`, error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("departmentId");
    res.status(200).json({ success: true, team: teams });
  } catch (err) {
    console.log(`Error in Getting all Teams:`, error);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};
