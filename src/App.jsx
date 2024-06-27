import { useState } from 'react'

const Observation = ({ observation }) => {
  return (
    <div>
      <p>{observation.species}</p>
      <p>{observation.amount}</p>
      <p>{observation.place}</p>
      <p>{observation.date}</p>
    </div>
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

  const menuLines = document.querySelector('.menu-lines')
  const nav = document.querySelector('.nav-menu')

  menuLines.addEventListener('click', (event) => {
    event.preventDefault()
    nav.classList.toggle('hide')
  })


  return (
  <div>
    <h2>Havaintopäiväkirja</h2>
    <Observations observations={observations} />
  </div>
  )
}


export default App
