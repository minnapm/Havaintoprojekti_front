import PropTypes from 'prop-types'


const LoginForm = ({ 
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
   }) => {
    return (
        <div>
            <h2 className="logintitle">Kirjaudu sisään</h2>
            <form className="login" onSubmit = {handleSubmit}>
            <div>
                käyttäjänimi
                <input 
                className="logininput"
                type="text" 
                value={username} 
                name="Username"
                onChange = {handleUsernameChange} />
            </div>
            <div>
                salasana
                <input 
                className="logininput"
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange} />
            </div>
            <button className="loginbutton" type="submit">Kirjaudu</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

export default LoginForm 