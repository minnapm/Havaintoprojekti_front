
const Observation = ({ observation, deleteObservation, user }) => {
  return (
    <div className="observationcontainer">
      <table className="observation">
        <tr>
          <th>{observation.species}</th>
        </tr>
        <tr>
          <td className="column1">
              <p> {observation.amount} kpl</p>
              <p> {observation.place}</p>
              <p> {observation.date}</p>
          </td>
          <td>
            <img className="observationimage" src={observation.image} />
          </td>
        </tr>
        <tr>
          <td>
            <p className="observationuser">lisännyt: {observation.user.username}</p>
          </td>
        </tr>
      </table>
      {user.username === observation.user.username && (
        <button className="deleteobservation" onClick = {deleteObservation}>Poista</button>
      )}
    </div>
  )
}

  export default Observation