import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero container">
      <div className="card">
        <h2>CSI College of Engineering</h2>
        <p>Department: CSE - Artificial Intelligence and Machine Learning</p>
        <p>
          Join us for a one-day symposium with technical events, innovation talks,
          and hands-on learning sessions.
        </p>
        <Link to="/register" className="btn btn-primary cta-btn">
          Register
        </Link>
      </div>
    </section>
  );
}

export default Home;
