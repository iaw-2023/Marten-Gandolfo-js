import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductsPage(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://marten-gandolfo-laravel.vercel.app/_api/products')
          .then(response => response.json())
          .then(data => setProducts(data))
          .catch(error => console.log(error) /*TODO handle error*/);
      }, []);

    if (products.length === 0) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Productos</h1>
            <table id="products" class="table table-striped table-bordered shadow-lg"> 
                <tbody>
                    {products.map(product => (
                        <tr>
                            <td>
                                <Link to={'/products/' + product.id}><img src={product.product_image} alt='' width="150"/></Link>
                            </td>
                            <td>
                                <Link to={'/products/' + product.id}>{product.name} </Link>
                            </td>
                            <td>${product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}