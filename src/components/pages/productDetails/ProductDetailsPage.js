import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../LoadingSpinner';
import Alert from '../../Alert';
import ErrorMessage from '../../ErrorMessage';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItem = cartItems.filter(item => item.id == id).pop();
  const [units, setUnits] = useState(cartItem ? cartItem.units : 1);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(`https://marten-gandolfo-laravel.vercel.app/_api/products/${id}`)
      .then(response => {
        if(response.status === 400) throw new Error('Código de producto inválido');
        if(response.status === 404) throw new Error('Producto no encontrado');
        if(!response.ok) throw new Error('Error al cargar el producto');
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        return setProduct(data);
      })
      .catch(error => {
        setIsLoading(false);
        setErrorMessage(error.message);
    });
  }, [id]);

  const handleUnitsChange = (unitsChange) => {
    const newUnits = Math.max(units + unitsChange, 0);
    setUnits(newUnits);
  };

  const addToCart = () => {
    const cartItem = { id: product.id, units: units };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== product.id);
    const updatedCart = units > 0 ? [...cart, cartItem] : cart;
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <div>

      <div class="card text-center" style={{margin: '30px'}}>
        <div class="card-header">
          {product.brand}
        </div>
        <div class="card-body">
          <img src={product.product_image} alt='' width="250"/>
          <h5 class="card-title">{product.name}</h5>
          <p class="card-text">${product.price} x unidad</p>
          <p class="card-text">{product.description}</p>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item">
                    <button class="page-link" onClick={() => handleUnitsChange(-1)} aria-label="Previous">
                        <span aria-hidden="true">-</span>
                    </button>
                </li>
                <li class="page-item">
                    <a class="page-link disabled"><span>{units}</span> unidades.</a>
                </li>
                <li class="page-item">
                    <button class="page-link" onClick={() => handleUnitsChange(1)} aria-label="Next">
                        <span aria-hidden="true">+</span>
                    </button>
                </li>
            </ul>
          </nav>
          <button class="btn btn-primary" onClick={addToCart}>Agregar al carrito <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
            </svg>
          </button>
          <Alert message={"Producto agregado al carrito"} showAlert={showAlert}/>
        </div>
        <div class="card-footer text-body-secondary">
          <a href={product.product_official_site}>{product.product_official_site}</a>
        </div>
      </div>



      {/* <h1>{product.name}</h1>
      <img src={product.product_image} alt='' width="150"/>
      <p>Precio: ${product.price}</p>
      <p>Marca: {product.brand}</p>
      <p>Descripción: {product.description}</p>
      <p>Sitio oficial: <a href={product.product_official_site}>{product.product_official_site}</a></p>
      <div>
        <label>Unidades:</label>
        <button onClick={() => handleUnitsChange(-1)}>-</button>
        <span>{units}</span>
        <button onClick={() => handleUnitsChange(1)}>+</button>
      </div>
      <button onClick={addToCart}>Agregar al carrito</button>
      <Alert message={"Producto agregado al carrito"} showAlert={showAlert}/> */}
    </div>
  );
}

export default ProductDetailsPage;