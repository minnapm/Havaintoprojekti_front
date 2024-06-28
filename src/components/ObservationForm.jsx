import { useState } from 'react'

const ObservationForm = ({ createObservation }) => {
    const [newSpecies, setNewSpecies] = useState('')
    const [newAmount, setNewAmount] = useState('')
    const [newPlace, setNewPlace] = useState('')
    const [newDate, setNewDate] = useState('')

    const addObservation = (event) =>{
        event.preventDefault()
        createObservation({
            species: newSpecies,
            amount: newAmount,
            place: newPlace,
            date: newDate,
        })

        setNewSpecies('')
        setNewAmount('')
        setNewPlace('')
        setNewDate('')
    }

    return (
        <div>
          <h2>Create a New Observation</h2>
    
          <form onSubmit={addObservation}>
          <div>
              species
              <input 
              value={newSpecies}
              onChange = {event => setNewSpecies(event.target.value)} />
            </div>
            <div>
              amount
              <input 
              value={newAmount}
              onChange = {event => setNewAmount(event.target.value)} />
            </div>
            <div>
              place
              <input 
              value={newPlace}
              onChange = {event => setNewPlace(event.target.value)} />
            </div>
            <div>
              date
              <input 
              value={newDate}
              onChange = {event => setNewDate(event.target.value)} />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      )
    
}


export default ObservationForm