import { Link } from 'react-router-dom';

export default function OrderDetailsRow({detail}){
    return (
        <tr key={detail.product.id}>
            <td>
                <Link to={'/products/' + detail.product.id}><img src={detail.product.product_image} alt='' width="150" /></Link>
            </td>
            <td>
                <Link to={'/products/' + detail.product.id}>{detail.product.name}</Link>
            </td>
            <td>{detail.units}</td>
            <td>${detail.subtotal}</td>
        </tr>
    );
}