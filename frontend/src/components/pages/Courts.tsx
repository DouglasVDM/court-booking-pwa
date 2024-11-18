import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

const Courts = ({ courts, onCourtSelected }) => {
  const handleClick = (event) => {
    const selectedCourt = courts.find(
      (court) => court.court_id === parseInt(event.target.value)
    );

    onCourtSelected(selectedCourt);
  };

  return (
    <Form.Select aria-label="Select a court" size="lg" onClick={handleClick}>
      <option>Select court</option>
      {courts.map(({ court_id, court_name }) => (
        <option value={court_id} key={court_id}>
          {court_name}
        </option>
      ))}
    </Form.Select>
  );
};

Courts.propTypes = {
  courts: PropTypes.arrayOf(
    PropTypes.shape({
      court_id: PropTypes.number.isRequired,
      court_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCourtSelected: PropTypes.func.isRequired,
};

export default Courts;