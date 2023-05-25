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
      <h1>{product.name}</h1>
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
      <Alert message={"Producto agregado al carrito"} showAlert={showAlert}/>
    </div>
  );
}

export default ProductDetailsPage;