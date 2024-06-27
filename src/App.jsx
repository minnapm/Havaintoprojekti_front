import { useState } from 'react'

const Observation = ({ observation }) => {
  return (
    <ul>
      <li>{observation.species}</li>
      <li>{observation.amount}</li>
      <li>{observation.place}</li>
      <li>{observation.date}</li>
    </ul>
  )
}

const Observations = (props) => {
  return (
    <ul>
      {props.observations.map(observation =>
        <Observation key={observation.id} observation={observation}/>
      )}
    </ul>
  )
}

const App = () => {
  const [observations, setObservations] = useState([ 
    { species: 'Auroraperhonen', amount: '6 kpl', place: 'Aurajoki, Turku', date: '5.6.2024'}
  ]) 

  return (
  <div>
    <h2>Havaintopäiväkirja</h2>
    <Observations observations={observations} />
  </div>
  )
}


export default App
