import { createContext } from "react";
import { useState } from "react";

export const VisitorContext = createContext();

const VisitorContextProvider = (props) => {
  const [ user, setUsername ] = useState(null);

  const setUser = (username) => {
    setUsername(username);
  }

  return (
    <VisitorContext.Provider value={{user, setUser}}>
      { props.children }
    </VisitorContext.Provider>
  )
}

export default VisitorContextProvider;