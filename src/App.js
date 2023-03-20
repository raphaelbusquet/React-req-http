// Estilos
import './App.css';

// Hooks
import { useState, useEffect } from 'react';

// Custom Hook

import { useFetch } from './hooks/useFetch';

const url = 'http://localhost:3000/products';

function App() {

  const [products, setProducts] = useState([]);

  // Custom Hook
  const {data: items} = useFetch(url);

  console.log(items);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // Resgatando dados
  // useEffect(() => {

  //  async function fetchData() {

  //   const res = await fetch(url);

  //   const data = await res.json();

  //   setProducts(data);

  //  }

  //   fetchData();

  // }, [])

  // Adionando dados

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });
    
    // - Carregamento dinâmico

    const addedProduct = await res.json();

    setProducts((prevProducts) => [...prevProducts, addedProduct]);

    setName('');
    setPrice('');
  };

  return (
    <div className="App">
     <h1>Lista de Produtos</h1>
     <ul>

      {items && items.map((product) => (
        <li key={product.id}>{product.name} - R$ {product.price}</li>
      ) )}

     </ul>
     <div className="add-product">
      <form onSubmit={handleSubmit}>
        <label>
           Nome:
          <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
           Preço:
          <input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.value)}/>
        </label>
        <input type="submit" Criar produto/>
      </form>
     </div>
    </div>
  );
}

export default App;
