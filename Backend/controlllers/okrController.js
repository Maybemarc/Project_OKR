import OKR from "../models/OKR.js";

export const createOKR = async (req, res) => {
  try {
    const { objective, teamId, keyResults, assignedTo } = req.body;
    const newOKR = new OKR({
      objective,
      teamId,
      keyResults,
      assignedTo,
      progress: 0,
    });
    await newOKR.save();
    res
      .status(201)
      .json({ success: true, message: "OKR created", okr: newOKR });
  } catch (error) {
    console.log(`Error in Creating an OKR :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getOKRsByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const okrs = await OKR.find({ teamId }).populate(
      "assignedTo",
      "name email"
    );
    res.status(200).json({ success: true, okr: okrs });
  } catch (error) {
    console.log(`Error in Getting an OKR :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateKeyResult = async (req, res) => {
  try {
    const { okrId, krIndex } = req.params;
    const { progress } = req.body;
    const okr = await OKR.findById(okrId);
    if (!okr) return res.status(404).json({ message: "OKR not found" });

    okr.keyResults[krIndex].progress = progress;
    const total = okr.keyResults.reduce((sum, kr) => sum + kr.progress, 0);
    okr.progress = Math.round(total / okr.keyResults.length);

    await okr.save();
    res.status(200).json({ success: true, message: "Key result updated", okr });
  } catch (error) {
    console.log(`Error in Updating an OKR :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteOKR = async (req, res) => {
  try {
    const { id } = req.params;
    await OKR.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "OKR Deleted" });
  } catch (error) {
    console.log(`Error in Deleting an OKR :`, error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
