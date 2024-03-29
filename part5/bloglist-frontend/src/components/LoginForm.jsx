import PropTypes from 'prop-types'
const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <div>
          Username
          <input
            type="text"
            value={props.username}
            onChange={props.handleUsernameChange}
            id="username">
          </input>
        </div>
        <div style={{ margin: '40px' }}>
          Password
          <input
            type="text"
            id="password"
            autoComplete="off"
            value={props.password}
            onChange={props.handlePasswordChange}  //({target}) => setPassword(target.value) quicker but requires state management
          >
          </input>
        </div>
        <button type="submit" id="login-button" style={{ margin: '40px' }}>login</button>
      </form>
    </div>
  )}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm