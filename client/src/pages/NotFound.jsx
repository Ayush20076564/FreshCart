import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="py-5">
      <div className="container text-center">
        <h1 className="display-3 fw-bold text-success">404</h1>
        <p className="lead text-muted">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-success rounded-pill px-4 mt-3">
          Go Home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;