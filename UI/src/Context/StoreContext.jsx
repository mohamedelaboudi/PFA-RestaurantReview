import { createContext, useState } from "react";
import { menu_list } from "../assets/assets";
import PropTypes from "prop-types";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

   
    const url="https://localhost:7003";
    const[token, setToken]= useState("");

    const contextValue = {
        menu_list,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
        )

}
StoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
export default StoreContextProvider;