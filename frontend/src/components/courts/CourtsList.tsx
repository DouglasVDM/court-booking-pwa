import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const Courts = ({ courts }) => {
  const handleClick = (event) => {
    const selectedCourt = courts.find(
      (court) => court.court_id === parseInt(event.target.value)
    );
  };

  return (
    <>
      {courts.map(({ court_id, court_name, has_lights }) => (
        <Card key={court_id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{court_name}</Card.Title>
            <Card.Text>{has_lights ? "Has lights" : ""}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};
Courts.propTypes = {
  courts: PropTypes.arrayOf(
    PropTypes.shape({
      court_id: PropTypes.number.isRequired,
      court_name: PropTypes.string.isRequired,
    })
  ).isRequired,
//   onCourtSelected: PropTypes.func.isRequired,
};

export default Courts;
