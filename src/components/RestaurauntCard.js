import { CDN_URL } from "../utils/constants";

const RestaurauntCard = (props) => {
    const { restaurauntData } = props;
    const {cloudinaryImageId, name, cuisines, avgRatingString, costForTwo, sla} = restaurauntData?.info;
      return (
        <div className="restauraunt-card" style={{ backgroundColor: "#f0f0f0" }}>
          <img 
          className="restauraunt-logo"
          alt = "restauraunt-logo"
          src= { CDN_URL
           + 
          cloudinaryImageId
          }>
          </img>
          <h3>{ name }</h3>
          <h4>{ cuisines.join(", ") }</h4>
          <h4> { avgRatingString } stars</h4>
          <h4>{ costForTwo }</h4>
          <h4>{ sla?.slaString }</h4>
        </div>
      )
  }

export default  RestaurauntCard; 