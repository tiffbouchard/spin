import React from "react";

import { getUser } from "../utils/spotifyService";

const UserContext = React.createContext();

class UserProvider extends React.Component {
  state = {
    user: '',
  };

  componentDidMount = () => {
    this.getUser();
  }
  

  getUser = async () => {
    try {
      const user = await getUser();
      this.setState({user: user.data});
    } catch (err) {
      console.warn(err);
    }
  }
  

  render() {
    return (
      <UserContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;


export { UserContext, UserConsumer};

export default UserProvider;