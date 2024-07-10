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

//renderöi havainnot, järjestys: uusin ylimpänä
const Observations = (props) => {
  return (
    <ul>
      {props.observations.map(observation =>
        <Observation key={observation.id} observation={observation} deleteObservation = { () => props.deleteObservationOf(observation.id)} user={props.user}/>
      ).reverse()}
    </ul>
  )
}

const App = () => {
  const [observations, setObservations] = useState([]) 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const [hamburgerHidden, setHamburgerHidden] = useState(true)
  const [headerState, setHeaderState] = useState("Etusivu")

  const obsFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedObservationappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      obsService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    console.log('Listening: ', headerState);
    if (headerState === 'Etusivu') {
      obsService
    .getAll()
    .then(observations => 
      setObservations( observations )
    )}
    else if (headerState === 'Kasvit') {
      obsService
      .getPlants()
      .then(observations => 
        setObservations( observations )
      )}
    else if (headerState === 'Sienet') {
      obsService
      .getMushrooms()
      .then(observations => 
        setObservations( observations )
      )}
    else if (headerState === 'Linnut') {
      obsService
      .getBirds()
      .then(observations => 
        setObservations( observations )
      )}
    else if (headerState === 'Perhoset') {
      obsService
      .getButterflies()
      .then(observations => 
        setObservations( observations )
      )}
  }, [headerState]);

  const handleHamburgerClick = (event) => {
    setHamburgerHidden(!hamburgerHidden) 
  }

  const handleHomepageClick = () => {
    setHeaderState("Etusivu")
    setHamburgerHidden(true) 
  }

  const handlePlantsClick = (event) => {
    setHeaderState("Kasvit")
    setHamburgerHidden(true) 
  }

  const handleMushroomsClick = (event) => {
    setHeaderState("Sienet")
    setHamburgerHidden(true) 
  }

  const handleBirdsClick = (event) => {
    setHeaderState("Linnut")
    setHamburgerHidden(true) 
  }

  const handleButterfliesClick = (event) => {
    setHeaderState("Perhoset")
    setHamburgerHidden(true) 
  }

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

  const deleteObservationOf = (id) => {
    const observation = observations.find(o => o.id === id)
    console.log('this observation ' + observation.species + ' was requested to be deleted')
    if (window.confirm(`Poista ${observation.species} pysyvästi?`)) {
      obsService
      .updateToDelete(id)
      .then(response => {
        console.log('Resource deleted succesfully:', response.data)
        setNewMessage(`${observation.species} poistettiin havainnoista.`)
        setTimeout( () => {
          setNewMessage(null)
        }, 3000)
        setObservations(observations.filter((item) => item.id != id))
      })
      .catch(error => {
        console.error('Error deleting resource:', error)
      })
    }
  }


  return (
    <div>
      <header>
      <nav className="navbar">
        <div className="logo">
          <a href="/">
          </a> 
      </div>
          <div className="menu-lines" onClick={handleHamburgerClick}>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span> 
          </div>
          <div className={hamburgerHidden ? "nav-menu hide" : "nav-menu"}>
              <a className="#etusivu" onClick={handleHomepageClick}>Etusivu</a>
              <a className="#kasvit" onClick={handlePlantsClick}>Kasvit</a>
              <a className="#sienet" onClick={handleMushroomsClick}>Sienet</a>
              <a className="#linnut" onClick={handleBirdsClick}>Linnut</a>
              <a className="#perhoset" onClick={handleButterfliesClick}>Perhoset</a>
          </div>
      </nav>
   </header>
      {!user &&(
      <div>
        <h2 className="logintitle">Kirjaudu sisään</h2>
        <Notification message={newMessage} />
        <form className="login" onSubmit = {handleLogin}>
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
          <button className="loginbutton" type="submit">Kirjaudu</button>
        </form>
      </div>
    )}
      {user && (<div>
        <h2 className="title">Havaintopäiväkirja</h2>
        <Notification message={newMessage} />
          <form onSubmit = {handleLogout}>
            <div className="login">
            <p>{user.username}</p> 
            <p>kirjautunut sisään</p>
            <button className="loginbutton" type="submit">Kirjaudu ulos</button>
            </div>
          </form>
          <Togglable buttonLabel="Uusi havainto" ref={obsFormRef}>
            <ObservationForm createObservation={addObservation} />
        </Togglable>
        <Observations observations={observations} deleteObservationOf={deleteObservationOf} user={user}/>
      </div>)}
    </div>
    
  )
}


export default App
