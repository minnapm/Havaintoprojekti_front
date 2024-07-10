
const Observation = ({ observation, deleteObservation, user }) => {
  return (
    <div className="observationcontainer">
      <div className="observation">
      <p>{observation.species}</p>
      <p>{observation.amount} kpl</p>
      <p>{observation.place}</p>
      <p>{observation.date}</p>
      <p>lisännyt: {observation.user.username}</p>
      </div>
      {user.username === observation.user.username && (
        <button className="deleteobservation" onClick = {deleteObservation}>Poista</button>
      )}
    </div>
  )
}

  export default Observation