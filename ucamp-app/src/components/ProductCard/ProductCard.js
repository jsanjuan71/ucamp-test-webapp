import React from 'react';


function ProductCard({id, title, thumbnail, price, currency, stock, condition}) {
    return (
        <div class="col s3 m3">
            <div class="card">
                <div class="card-image">
                    <img class="thumbnail" src={thumbnail} alt={id}/>
                </div>
                <div class="card-content">
                    <span class="card-title">{title} &nbsp;<sup>{condition}</sup></span>
                    <p><sub>{id}</sub></p>
                </div>
                <div class="card-action">
                    
                    <div class="row">
                        <div class="col s6"><b>{currency}</b>&nbsp;{price}</div>
                        <div class="col s6 pull-right">Quedan: {stock}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;