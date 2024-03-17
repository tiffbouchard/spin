import "./Card.scss";

const Card = (props) => {

  const { image, name, id, handleClick} = props;
  
  return ( 
      <div>
        <div className="card" key={id} onClick={handleClick}>
            <div className="img-container">
              <img id={id} src={image} alt={`${name}`}/>
            </div>
            <div className="name" id={id}>{name}</div>
        </div>
      </div>
     
    );
}
 
export default Card;