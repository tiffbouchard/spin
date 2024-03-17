// import React from "react";

// const SettingsContext = React.createContext();

// class SettingsProvider extends React.Component {
//   state = {
//     hoverToPlay: true,
//   };

//   render() {
//     return (
//       <SettingsContext.Provider value={{ ...this.state }}>
//         {this.props.children}
//       </SettingsContext.Provider>
//     );
//   }
// }

// const SettingsConsumer = SettingsContext.Consumer;


// export { SettingsContext, SettingsConsumer};

// export default SettingsProvider;

import React from "react";

const SettingsContext = React.createContext();

export { SettingsContext };
