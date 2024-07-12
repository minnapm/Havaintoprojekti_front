
const Observation = ({ observation, deleteObservation, user }) => {
  return (
    <div className="observationcontainer">
      <table className="observation">
        <tr>
          <th>{observation.species}</th>
        </tr>
        <td>
          <ul>
            <li>{observation.amount} kpl</li>
            <li>{observation.place}</li>
            <li>{observation.date}</li>
          </ul>
            <p className="observationuser">lisännyt: {observation.user.username}</p>
        </td>
        <td>
          <img className="observationimage" src={observation.image} />
        </td>
      </table>
      {user.username === observation.user.username && (
        <button className="deleteobservation" onClick = {deleteObservation}>Poista</button>
      )}
    </div>
  )
}

  export default Observation