import { useState } from 'react'

const SignupForm = ({ createNewUser }) => {
    const [newUserName, setNewUserName] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const addUser = (event) =>{
        event.preventDefault()
        createNewUser({
            username: newUserName,
            password: newPassword,
        })

        setNewUserName('')
        setNewPassword('')
    }

    return (
        <div>
          <h2 className="signuptitle">Luo uusi käyttäjä</h2>
    
          <form className="signup" onSubmit={addUser}>
          <div>
              käyttäjänimi
              <input 
              className="signupinput"
              value={newUserName}
              onChange = {event => setNewUserName(event.target.value)} />
            </div>
            <div>
              salasana
              <input 
              className="signupinput"
              type="password"
              value={newPassword}
              onChange = {event => setNewPassword(event.target.value)} />
            </div>
            <button className="signupbutton" type="submit">Tallenna</button>
          </form>
        </div>
      )
    
}


export default SignupForm
