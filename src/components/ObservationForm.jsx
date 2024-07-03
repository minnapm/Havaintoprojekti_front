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
          <h2 className="title">Lisää Uusi Havainto</h2>
    
          <form className="addobservation" onSubmit={addObservation}>
          <div>
              laji
              <input 
              value={newSpecies}
              onChange = {event => setNewSpecies(event.target.value)} />
            </div>
            <div>
              määrä
              <input 
              value={newAmount}
              onChange = {event => setNewAmount(event.target.value)} />
            </div>
            <div>
              paikka
              <input 
              value={newPlace}
              onChange = {event => setNewPlace(event.target.value)} />
            </div>
            <div>
              aika
              <input 
              value={newDate}
              onChange = {event => setNewDate(event.target.value)} />
            </div>
            <button className="savebutton" type="submit">Tallenna</button>
          </form>
        </div>
      )
    
}


export default ObservationForm