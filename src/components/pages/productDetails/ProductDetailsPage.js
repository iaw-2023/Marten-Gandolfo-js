import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../LoadingSpinner';
import ErrorMessage from '../../ErrorMessage';
import ToastComponent from '../../ToastComponent';
import 'bootstrap/dist/css/bootstrap.css';
import { Toast } from 'bootstrap/dist/js/bootstrap.bundle';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItem = cartItems.filter(item => item.id == id).pop();
  const [units, setUnits] = useState(cartItem ? cartItem.units : 1);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + `_api/products/${id}`)
      .then(response => {
        if(response.status === 400){setErrorMessage('Código de producto inválido'); return ;}
        if(response.status === 404){setErrorMessage('Producto no encontrado'); return ;}
        if(!response.ok){setErrorMessage('Error al cargar el producto'); return ;}
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        return setProduct(data);
      })
      .catch(error => {
        setIsLoading(false);
        setErrorMessage('Error al cargar el producto');
    });
  }, [id]);

  const handleUnitsChange = (unitsChange) => {
    if(units + unitsChange > 0){
      const newUnits = Math.max(units + unitsChange, 0);
      setUnits(newUnits);
    }
  };

  const addToCart = () => {
    const cartItem = { id: product.id, units: units };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== product.id);
    const updatedCart = units > 0 ? [...cart, cartItem] : cart;
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleToastShow = () => {
    const toastElement = document.getElementById('liveToast');
    const toast = new Toast(toastElement);
    toast.show();
  };

  const handleClick = () => {
    addToCart();
    handleToastShow();
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (errorMessage) {
    return <ErrorMessage message={errorMessage} />;
  }

  return (
    <div>

      <div class="card card-details text-center">
        <div class="card-header">
          {product.brand}
        </div>
        <div class="card-body">
          <img src={`data:image/webp;base64,${product.product_image}`} alt='' width="250"/>
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
                    <div class="page-link disabled"><span>{units}</span> unidades.</div>
                </li>
                <li class="page-item">
                    <button class="page-link" onClick={() => handleUnitsChange(1)} aria-label="Next">
                        <span aria-hidden="true">+</span>
                    </button>
                </li>
            </ul>
          </nav>
          <button class="btn btn-primary" id="liveToastBtn" onClick={handleClick}>Agregar al carrito <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
            </svg>
          </button>
        </div>
        <div class="card-footer text-body-secondary">
          <Link to={product.product_official_site}>{product.product_official_site}</Link>
        </div>
      </div>

      <ToastComponent id={'liveToast'} toastTitle={'Producto agregado al carrito.'} toastBody={'Usted agrego '+product.name+'.'} addButton={true} buttonText={'Ver carrito'} buttonLink={'/cart'}></ToastComponent>

    </div>
  );
}

export default ProductDetailsPage;