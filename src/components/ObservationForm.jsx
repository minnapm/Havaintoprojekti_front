import { useState } from 'react'

const ObservationForm = ({ createObservation }) => {
    const [newSpecies, setNewSpecies] = useState('')
    const [newAmount, setNewAmount] = useState('')
    const [newPlace, setNewPlace] = useState('')
    const [newDate, setNewDate] = useState('')
    const [category, setCategory] = useState('')
    const [file, setFile] = useState('')
    const [newDetails, setNewDetails] = useState('')

    const addObservation = (event) =>{
        event.preventDefault()
        console.log(file)
        createObservation({
            species: newSpecies,
            amount: newAmount,
            place: newPlace,
            date: newDate,
            category: category,
            image: file,
            details: newDetails,
        })

        setNewSpecies('')
        setNewAmount('')
        setNewPlace('')
        setNewDate('')
        setCategory('')
        setFile('')
        setNewDetails('')
    }

    const handleImage = (event) => {
      const reader = new FileReader()
      const file = event.target.files[0]
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        
        var result = reader.result
        setFile(result)
      }
    }

     /* const handleImage = (event) => {
        setFile(URL.createObjectURL(event.target.files[0]))
      }*/


    return (
        <div>
          <h2 className="title">Lisää Uusi Havainto</h2>
    
          <form id="obs_form" className="addobservation" onSubmit={addObservation}>
            <p className="required">*-merkityt ovat pakollisia kenttiä</p>
          <div>
              laji*:
              <input 
              className="observationinput"
              value={newSpecies}
              onChange = {event => setNewSpecies(event.target.value)} />
            </div>
            <div>
              määrä*:
              <input 
              className="observationinput"
              type="number"
              min="1"
              value={newAmount}
              onChange = {event => setNewAmount(event.target.value)} />
            </div>
            <div>
              paikka*:
              <input 
              className="observationinput"
              value={newPlace}
              onChange = {event => setNewPlace(event.target.value)} />
            </div>
            <div>
              aika*:
              <input 
              className="observationinput"
              type="date"
              max={(new Date).toISOString().split("T")[0]}
              value={newDate}
              onChange = {event => setNewDate(event.target.value)} />
            </div>
            <div>
              kuva:
              <input 
              className="observationinput"
              type="file"
              //value={image}
              name="image"
              accept="image/"
              onChange = {handleImage} />
              <img src={file} width="100" heigth="auto"/>
            </div>
            <div>
              lisätietoja:
              <input 
              className="observationinput"
              value={newDetails}
              onChange = {event => setNewDetails(event.target.value)} />
            </div>
            <div className="radio">
              <p>kategoria*:</p>
              <input 
              type="radio" 
              name="category"
              value="Kasvit"
              checked={category === 'Kasvit'}
              onChange={event => setCategory(event.target.value)}/>
              Kasvit 
              <br></br>
              <input 
              type="radio"
              name="category" 
              value="Sienet"
              checked={category === 'Sienet'}
              onChange={event => setCategory(event.target.value)}/>
              Sienet 
              <br></br>
              <input 
              type="radio" 
              name="category"
              checked={category === 'Linnut'}
              value="Linnut"
              onChange={event => setCategory(event.target.value)}/>
              Linnut  
              <br></br>
              <input 
              type="radio" 
              name="category"
              value="Perhoset"
              checked={category === 'Perhoset'}
              onChange={event => setCategory(event.target.value)}/>
              Perhoset  
              <br></br>
            </div>
            <button className="savebutton" type="submit">Tallenna</button>
          </form>
        </div>
      )
    
}


export default ObservationForm