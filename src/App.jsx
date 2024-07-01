import { useState, useEffect, useRef } from 'react'
import Observation from './components/Observation'
import ObservationForm from './components/ObservationForm'
import obsService from './services/observations'
import loginService from './services/login'
import Togglable from './components/Togglable'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="message">
      {message}
    </div>
  )
}

const Observations = (props) => {
  console.log(props.observations)
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
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newMessage, setNewMessage] = useState('')

  const obsFormRef = useRef()

  useEffect(() => {
    obsService
    .getAll()
    .then(observations => {
      //console.log("Observations from api: " + observations)
      setObservations(observations)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedObservationappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      obsService.setToken(user.token)
    }
  }, [])

  const menuLines = document.querySelector('.menu-lines')
  const nav = document.querySelector('.nav-menu')

  menuLines.addEventListener('click', (event) => {
    event.preventDefault()
    nav.classList.toggle('hide')
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedObservationappUser', JSON.stringify(user)
      )
      obsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNewMessage('wrong username or password')
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedObservationappUser')
  }

  const addObservation = (observationObject) =>{
    console.log("havainnon lisäämisnappia painettiin")
    obsFormRef.current.toggleVisibility()
    obsService
    .create(observationObject)
    .then(returnedObs => {
      setObservations(observations.concat(returnedObs))
      setNewMessage(`Lisättiin uusi havainto: ${observationObject.species}`)
        setTimeout( () => {
          setNewMessage(null)
        }, 3000)
    })
  }

  if (user === null) {
    return (
      <div>
        <h2>Kirjaudu sisään</h2>
        <Notification message={newMessage} />
        <form onSubmit = {handleLogin}>
          <div>
            käyttäjänimi
            <input 
            type="text" 
            value={username} 
            name="Username"
            onChange = {({ target }) => setUsername(target.value)} />
          </div>
          <div>
            salasana
            <input 
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">Kirjaudu</button>
        </form>
      </div>
    )
  }


  return (
  <div>
    <h2>Havaintopäiväkirja</h2>
    <Notification message={newMessage} />
      <form onSubmit = {handleLogout}>
        <div>
        <p>{user.name} kirjautunut sisään</p>
        <button type="submit">kirjaudu ulos</button>
        </div>
      </form>
      <Togglable buttonLabel="Uusi havainto" ref={obsFormRef}>
         <ObservationForm createObservation={addObservation} />
     </Togglable>
     <Observations observations={observations} />
  </div>
  )
}


export default App
