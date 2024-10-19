/* import PropTypes from "prop-types"; */
function subjectBtn({ topic, onClick }) {
  return (
    <>
      <button
        className="p-3 text-2xl font-medium rounded-md text-white bg-blue-600/50 text-left hover:bg-blue-800/50"
        onClick={onClick}
      >
        {topic}
      </button>
    </>
  );
}
/* subjectBtn.propTypes = {
  value: PropTypes.string,
}; */
export default subjectBtn;
