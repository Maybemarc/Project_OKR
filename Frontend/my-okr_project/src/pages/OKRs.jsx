import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const OKRs = () => {
  const [okrs, setOkrs] = useState([]);
  const [teamId, setTeamId] = useState("");

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchUserAndOKRs = async () => {
      try {
        const userRes = await axios.get(`${API_URL}/auth/me`, {
          withCredentials: true,
        });
        console.log(userRes.data);
        const teamId =
          userRes.data.user?.teamId?._id || userRes.data.user?.teamId;

        if (!teamId) {
          toast.error("You are not assigned to any team yet!");
          return;
        }
        setTeamId(teamId);

        const okrRes = await axios.get(`${API_URL}/okrs/team/${teamId}`, {
          withCredentials: true,
        });
        console.log(okrRes.data);
        setOkrs(okrRes.data.okr);
      } catch (err) {
        toast.error("Failed to fetch OKRs");
      }
    };

    fetchUserAndOKRs();
  }, []);

  return (
    <div className="okr-container">
      <h2 className="okr-title">Team OKRs 🎯</h2>

      <div className="okr-grid">
        {okrs.length > 0 ? (
          okrs.map((okr) => (
            <div key={okr._id} className="okr-card">
              <h3>{okr.objective}</h3>
              <div className="okr-progress">
                <span>Progress: {okr.progress}%</span>
                <div className="okr-bar">
                  <div
                    className="okr-bar-fill"
                    style={{ width: `${okr.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="okr-kr-list">
                {okr.keyResults.map((kr, i) => (
                  <div key={i} className="okr-kr">
                    <span className="kr-name">{kr.name}</span>
                    <span className="kr-progress">{kr.progress}%</span>
                  </div>
                ))}
              </div>

              <div className="okr-buttons">
                <Link to={`/EditOKR/${okr._id}`} >
                <button >✏️ Edit</button>
                </Link>
                <button
                  className="danger"
                  onClick={async () => {
                    try {
                      await axios.delete(`/okrs/${okr._id}`);
                      toast.success("OKR deleted");
                      setOkrs(okrs.filter((o) => o._id !== okr._id));
                    } catch {
                      toast.error("Delete failed");
                    }
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No OKRs found for your team.</p>
        )}
      </div>
    </div>
  );
};

export default OKRs;
