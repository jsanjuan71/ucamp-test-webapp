import React, { useEffect } from 'react';
import M from "materialize-css";


function Paginator({pages, onPageChange, currentPage, total}) {
    useEffect(() => {
        M.AutoInit();
    }, []);

    return (
      <div class="row">
        <div class="col s8">
            <ul class="pagination">
              {
                Array.from({ length: pages }, ((_, i) => {
                  return (<a key={i} class="btn-small" onClick={onPageChange}>{i+1}</a>) 
                }))
              }
            </ul>
            
        </div>
        {
          pages > 0 && (
            <div class="col s2">
              <p>Página: {currentPage} de {pages}</p>
            </div>
          )
        }
        {
          total > 0 && (
            <div class="col s2">
              <p>{total} productos</p>
            </div>
          )
        }
        
        
      </div>
    );
}

export default Paginator;