import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://marten-gandolfo-laravel.vercel.app/_api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.log(error) /*TODO handle error*/);
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.product_image} alt='' width="150"/>
      <p>Precio: ${product.price}</p>
      <p>Marca: {product.brand}</p>
      <p>Descripción: {product.description}</p>
      <p>Sitio oficial: <a href={product.product_official_site}>{product.product_official_site}</a></p>
    </div>
  );
}

export default ProductDetailsPage;