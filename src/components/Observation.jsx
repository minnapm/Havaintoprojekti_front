
const Observation = ({ observation }) => (
    <div className="observation">
      <p>{observation.species}</p>
      <p>{observation.amount}</p>
      <p>{observation.place}</p>
      <p>{observation.date}</p>
    </div>
  )

  export default Observation