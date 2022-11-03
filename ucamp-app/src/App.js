import React ,{useState, useEffect } from 'react';
import M from "materialize-css";
import './App.css';
import ProductCard from './components/ProductCard/ProductCard';
import Selector from './components/Selector/Selector';
import Paginator from './components/Paginator/Paginator';

import ProductService from './services/ProductService';

function App() {
  const [productList, setProductList] = useState( [] );
  const [products, setProducts] = useState( [] );
  const [sortEnabled, setSortEnabled] = useState( false );
  const [seachText, setSeachText] = useState( "" );
  const [conditions, setConditions] = useState( [] );
  const [pages, setPages] = useState( 0 );
  const [currentPage, setCurrentPage] = useState(1)
  
  const priceLevels = [
    {value: "menor", label: "Menor precio"},
    {value: "mayor", label: "Mayor precio"}
  ];

  const PAGE_SIZE = 30;

  useEffect( () => {
    M.AutoInit();
  }, []);

  async function handleChangeSearch({target}) {
      const response = await ProductService.search(seachText);
      setSeachText("");
      if(response.length > 0) {
        setProducts(response);
        const conds = await ProductService.listAllConditions(response);
        setConditions(conds);
        const prods = await ProductService.paginate(response, currentPage, PAGE_SIZE);
        setProductList(prods);
        setSortEnabled(true);
        setPages( Math.ceil(response.length / PAGE_SIZE ) );
        setCurrentPage(1);
        M.AutoInit();
      
      }
  }

  async function handleSelectedCondition(selected) {
    const prods = await ProductService.sortByCondition(products, selected);
    setCurrentPage(1);
    setProductList(prods);
  }

  async function handleSelectedPriceLevel(selected) {
    setProductList([]);
    const prods = await ProductService.sortByPrice(products, selected==="mayor");
    setCurrentPage(1);
    setProductList(prods);
  }

  async function handlePageChange({target}) {
    const newPage = parseInt(target.innerHTML);
    const prods = await ProductService.paginate(products, newPage, PAGE_SIZE);
    setCurrentPage(newPage);
    setProductList(prods);
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
      <div class="row">
        <div class="col s4">
          <h5>Catálogo</h5>
        </div>
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

      <Paginator 
        pages={pages}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        total={products.length}
      />

      <div class="row">
        { productList.length &&
          productList.map((prod) => {
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
