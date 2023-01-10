import React, {useContext} from "react";

import { CustomThemeContext } from "../../utils/custom-theme-provider";

const NotFound = () => {
    return (
        <div className='notfound-parent'>
            <h1  style={{color: '#ffffff'}}>
                404 Not Found
            </h1>
        </div>
    );
};

export default NotFound;