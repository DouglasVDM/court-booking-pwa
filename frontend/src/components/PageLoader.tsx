import Spinner from "react-bootstrap/Spinner";

const PageLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "10rem", height: "10rem" }}
      />{" "}
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default PageLoader;