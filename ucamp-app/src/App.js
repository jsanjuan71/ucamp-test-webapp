import React ,{useState, useEffect } from 'react';
import M from "materialize-css";
import './App.css';
import ProductCard from './components/ProductCard/ProductCard';
import Selector from './components/Selector/Selector';

import ProductService from './services/ProductService';

function App() {
  const [products, setProducts] = useState( [] );
  const [sortEnabled, setSortEnabled] = useState( false );
  const [seachText, setSeachText] = useState( "" );
  const [conditions, setConditions] = useState( [{"value":"new", "label":"new"}] );
  
  const priceLevels = [
    {value: "menor", label: "Menor precio"},
    {value: "mayor", label: "Mayor precio"}
  ];

  useEffect( () => {
    M.AutoInit();
  }, []);

  async function handleChangeSearch({target}) {
      const response = await ProductService.search(seachText);
      setProducts(response);
      setSeachText("");
      if(response.length > 0) {
        setSortEnabled(true);
        M.AutoInit();
      }
  }

  async function handleSelectedCondition(selected) {
    console.log("condition:", selected);
  }

  async function handleSelectedPriceLevel(selected) {
    console.log("price:", selected);
  }

  return (
    <>
      <nav>
        <div class="nav-wrapper">
          <form onSubmit={handleChangeSearch}>
            <div class="input-field">
              <input onInput={({target}) => setSeachText(target.value)} value={seachText} id="search" type="search" required placeholder="Escriba y presione enter" />
              <label class="label-icon" for="search"><i class="material-icons">search</i></label>
              <i class="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">Catálogo</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            
          </ul>
        </div>
      </nav>
      <div class="row">
        <Selector
          disabled={!sortEnabled}
          options={priceLevels}
          title="Ordenar por precio"
          onSelect={handleSelectedPriceLevel}
         />

        <Selector
          disabled={!sortEnabled}
          options={conditions}
          title="Ordenar por condición"
          onSelect={handleSelectedCondition}
         />
      </div>

      <div class="row">
        { products.length &&
          products.map((prod) => {
            return (
              <ProductCard
                id={prod.id}
                title={prod.title}
                thumbnail={prod.thumbnail}
                condition={prod.condition}
                currency={prod.currency_id}
                price={prod.price}
                stock={prod.available_quantity}
              />
            )
          })
        }
      </div>
    </>
  );
}

export default App;
