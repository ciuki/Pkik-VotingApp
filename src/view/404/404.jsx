import React, {useContext } from "react";
import { CustomThemeContext } from "../../utils/custom-theme-provider";

const NotFound = () => {
    const { currentTheme} = useContext(CustomThemeContext)
    const isDark = Boolean(currentTheme === 'dark')
    return (
        <div className='notfound-parent'>
            <h1  style={{color: isDark ? '#ffffff' : '#000000'}}>
                404 Not Found
            </h1>
        </div>
    );
};

export default NotFound;