import React, { useEffect } from 'react';
import M from "materialize-css";


function Selector({options, title, disabled, onSelect}) {
    useEffect(() => {
        M.AutoInit();
    }, []);

    return (
        <div className="input-field col s4">
          <select
            disabled={disabled}
            onChange={({target})=>onSelect(target.value)}
          >
            <option selected disabled={true} value={-1}>Seleccione</option>
            {
                options.length &&
                options.map( (option) => {
                    return <option value={option.value}>{option.label}</option>
                })
            }
          </select>
          <label>{title}</label>
        </div>
    );
}

export default Selector;