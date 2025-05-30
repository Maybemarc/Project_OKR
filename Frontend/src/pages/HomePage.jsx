import OKRHighlightsCarousel from "../components/OKRhighlighter";

const HomePage = () => {
  return (
    <div className="home_container">
      <h1 className="home_title">Welcome to MyOKR</h1>
      <p className="home_subtitle">Track, Measure & Achieve Your Goals</p>

      <div className="okr_blocks">
        <div className="okr_block">
          <h2>Team Performance</h2>
          <p>Visualize progress of teams across different departments.</p>
        </div>

        <div className="okr_block">
          <h2>Objective Overview</h2>
          <p>View key objectives and their overall completion rate.</p>
        </div>

        <div className="okr_block">
          <h2>Personal Achievements</h2>
          <p>See what you've accomplished and what's next.</p>
        </div>
      </div>
      <div className="recent_okrs">
        <h2 className="section_title">Recent OKRs Summary</h2>
        <div className="okr_summary_list">
          <div className="okr_summary_item">
            <h3>Increase Customer Satisfaction</h3>
            <p>
              Progress: <strong>80%</strong>
            </p>
            <p>Owner: John Doe</p>
          </div>

          <div className="okr_summary_item">
            <h3>Optimize Website Performance</h3>
            <p>
              Progress: <strong>65%</strong>
            </p>
            <p>Owner: Priya Raj</p>
          </div>

          <div className="okr_summary_item">
            <h3>Launch New Feature Set</h3>
            <p>
              Progress: <strong>50%</strong>
            </p>
            <p>Owner: Aamir Ali</p>
          </div>
        </div>
      </div>
      <div className="team_performance">
        <h2 className="section_title">Team Performance Overview</h2>
        <div className="team_cards">
          <div className="team_card">
            <h3>Marketing Team</h3>
            <p>
              OKRs Completed: <strong>9/10</strong>
            </p>
            <p>
              Performance: <span className="progress_tag high">High</span>
            </p>
          </div>
          <div className="team_card">
            <h3>Development Team</h3>
            <p>
              OKRs Completed: <strong>7/10</strong>
            </p>
            <p>
              Performance: <span className="progress_tag medium">Moderate</span>
            </p>
          </div>
          <div className="team_card">
            <h3>Sales Team</h3>
            <p>
              OKRs Completed: <strong>5/10</strong>
            </p>
            <p>
              Performance: <span className="progress_tag low">Low</span>
            </p>
          </div>
        </div>
      </div>
      <div className="company_progress">
        <h2 className="section_title">Company-Wide Progress</h2>
        <div className="progress_container">
          <p>
            Overall Completion Rate: <strong>72%</strong>
          </p>
          <div className="progress_bar_outer">
            <div className="progress_bar_inner" style={{ width: "72%" }}></div>
          </div>
        </div>
      </div>
      <OKRHighlightsCarousel/>
      <footer className="footer">
  <div className="footer-container">
    <p>© {new Date().getFullYear()} MyOKR. All rights reserved.</p>
  </div>
</footer>



    </div>
  );
};

export default HomePage;
