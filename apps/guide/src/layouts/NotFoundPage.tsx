import { Link } from "react-router-dom";

const NotPoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>404</h1>
      <p style={{ fontSize: "1.25rem", marginTop: "1rem" }}>Page Not Found</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};
export default NotPoundPage;
