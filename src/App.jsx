import { useState, useEffect } from 'react'
import Observation from './components/Observation'
import ObservationForm from './components/ObservationForm'
import observationService from './services/observations'

const Observations = (props) => {
  return (
    <ul>
      {props.observations.map(observation =>
        <Observation key={observation.id} observation={observation}/>
      )}
    </ul>
  )
}

//{ species: 'Auroraperhonen', amount: '6 kpl', place: 'Aurajoki, Turku', date: '5.6.2024'}

const App = () => {
  const [observations, setObservations] = useState([]) 

  useEffect(() => {
    observationService
    .getAll()
    .then(observations => {
      setObservations(observations)
    })
  })

  const menuLines = document.querySelector('.menu-lines')
  const nav = document.querySelector('.nav-menu')

  menuLines.addEventListener('click', (event) => {
    event.preventDefault()
    nav.classList.toggle('hide')
  })

  const addObservation = (observationObject) =>{
    console.log("havainnon lisäämisnappia painettiin", event.target)
    blogService
    .create(observationObject)
    .then(returnedObservation => {
      setObservations(observations.concat(returnedObservation))
    })
  }


  return (
  <div>
    <h2>Havaintopäiväkirja</h2>
    <Observations observations={observations} />
    <ObservationForm createObservation={addObservation} />
  </div>
  )
}


export default App
