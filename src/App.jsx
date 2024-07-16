import { useState, useEffect, useRef } from 'react'
import Observation from './components/Observation'
import ObservationForm from './components/ObservationForm'
import obsService from './services/observations'
import loginService from './services/login'
import Togglable from './components/Togglable'
import userService from './services/users'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'


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
  const [newMessage, setNewMessage] = useState(null)
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

  const addUser = (userObject) =>{
    userService
    .createUser(userObject)
    .then(async returnedUser => {

      const user = await loginService.login({
        username: userObject.username, password: userObject.password,
      })
      window.localStorage.setItem(
        'loggedObservationappUser', JSON.stringify(user)
      )
      obsService.setToken(user.token)
      setUser(user)

      setNewMessage(`Käyttäjä luotu onnistuneesti: ${userObject.username}`)
        setTimeout( () => {
          setNewMessage(null)
        }, 3000)
    })

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
    if (window.confirm(`Haluatko varmasti poistaa ${observation.species} pysyvästi?`)) {
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
           <p>Havaintopäiväkirja</p>
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
        <Notification message={newMessage} />
        <LoginForm 
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
           />
        <SignupForm createNewUser={addUser} />
      </div>
    )}
      {user && (<div class="grid-container">
        <Notification message={newMessage} />
        <div className="grid-item one">
        <p className="newobservationtext"> Luo uusi havainto tästä: </p>
          <Togglable buttonLabel="Uusi havainto" ref={obsFormRef}>
            <ObservationForm createObservation={addObservation} />
        </Togglable>
        </div>
        <div className="grid-item two">
        <Observations observations={observations} deleteObservationOf={deleteObservationOf} user={user}/>
        </div>
        <div className="grid-item three">
          <form onSubmit = {handleLogout}>
            <div className="logout">
            <p>{user.username}</p> 
            <p>kirjautunut sisään</p>
            <button className="logoutbutton" type="submit">Kirjaudu ulos</button>
            </div>
          </form> 
        </div>
        
      </div>)}
    </div>
    
  )
}

//<h2 className="title">Havaintopäiväkirja</h2>
export default App
