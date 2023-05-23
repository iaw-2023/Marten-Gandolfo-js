import { Link } from 'react-router-dom';

export default function ProductRow({product}){
    return (
        <tr key={product.id}>
            <td>
                <Link to={'/products/' + product.id}>
                <img src={product.product_image} alt="" width="150" />
                </Link>
            </td>
            <td>
                <Link to={'/products/' + product.id}>{product.name}</Link>
            </td>
            <td>${product.price}</td>
        </tr>
    );
}