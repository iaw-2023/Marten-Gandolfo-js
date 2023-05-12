import React, { useEffect, useState } from 'react';

export default function ProductsPage(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://marten-gandolfo-laravel.vercel.app/_api/products')
          .then(response => response.json())
          .then(data => {console.log(data); setProducts(data)})
          .catch(error => console.log(error));
      }, []);

    return (
        <div>
            <h1>Productos</h1>
            <table id="products" class="table table-striped table-bordered shadow-lg"> 
                <tbody>
                    {products.map(product => (
                        <tr>
                            <td><img src={product.product_image} width="150"/></td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}