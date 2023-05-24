import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../LoadingSpinner';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItem = cartItems.filter(item => item.id == id).pop();
  const [units, setUnits] = useState(cartItem ? cartItem.units : 1);

  useEffect(() => {
    fetch(`https://marten-gandolfo-laravel.vercel.app/_api/products/${id}`)
      .then(response => {
        if(!response.ok) throw new Error('Product not found');
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        return setProduct(data);
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
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
    alert("Producto agregado al carrito");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
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
    </div>
  );
}

export default ProductDetailsPage;