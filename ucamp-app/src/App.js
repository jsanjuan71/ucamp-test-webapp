import React ,{useState, useEffect} from 'react';
import './App.css';
import ProductCard from './components/ProductCard/ProductCard';
import ProductService from './services/ProductService';

function App() {
  const [products, setProducts] = useState( [] );
  
  useEffect(() => {
    async function fetchData() {
      const response = await ProductService.search("iphone");
      setProducts(response);
    }
    fetchData();
  }, []); 

  return (
    <>
      <nav>
        <div class="nav-wrapper">
          <form>
            <div class="input-field">
              <input id="search" type="search" required placeholder="Escriba y presione enter" />
              <label class="label-icon" for="search"><i class="material-icons">search</i></label>
              <i class="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
      <h6>Products</h6>
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
