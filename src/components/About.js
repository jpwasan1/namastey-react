import User from "./User";
import UserClass from "./UserClass";
import React from "react";
import UserContext from "../utils/UserContext";

class About extends React.Component {
  constructor(props) {
    super(props);

  this.state = {
    userInfo: {
        name : 'Dummy',
        location: 'Default'
    }
  };  

    // console.log("Parent Constructor");
  }

   componentDidMount(){
    // console.log("Parent Component Did Mount");
  }

  render() {
    // console.log("Parent Render");

    return (
      <div>
        <h1>About Class Component</h1>
        <div>
          loggedIn User
          <UserContext.Consumer>
            {
              ({ loggedInUser }) => (
            <h1 className="text-xl font-bold">{loggedInUser}</h1>
                )
            }
          </UserContext.Consumer>
        </div>
        <h2>This is Namastey React Web Series</h2>
        <UserClass name={"First"} location={"Dehradun Class"} />
      </div>
    );
  }
}

// const About = () => {
//   return (
//     <div>
//       <h1>About</h1>
//       <h2>This is Namastey React Web Series</h2>
//       <UserClass name={"Akshay Saini (class)"} location={"Dehradun class"} />
//     </div>
//   );
// };

export default About;
