import './Button.scss'

const Button = (props) => {
  return (
    <button className="main-button" type="button">
      <img className="logo" src={props.logo} alt="spotify-logo"/>
      <a href={props.link}>
        {props.label}
      </a>
    </button>
  )
}

export default Button;