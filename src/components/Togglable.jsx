import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'


const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })


  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="newbutton" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="cancelbutton" onClick={toggleVisibility}>Peruuta</button>
      </div>
    </div>
  )

})

export default Togglable