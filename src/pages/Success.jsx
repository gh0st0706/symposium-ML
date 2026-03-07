import { Link } from "react-router-dom";

function Success() {
  return (
    <section className="container success-wrap">
      <div className="card success-card">
        <h2>Registration Successful</h2>
        <p>Your symposium registration has been saved successfully.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default Success;
