import { Link } from 'react-router-dom';

export default function OrderDetailsRow({detail}){
    return (
        <tr key={detail.product.id}>
            <td width={150}>
                <Link to={'/products/' + detail.product.id}><img src={`data:image/webp;base64,${detail.product.product_image}`} alt='' width="150" /></Link>
            </td>
            <td>
                <Link to={'/products/' + detail.product.id}>{detail.product.name}</Link>
            </td>
            <td>{detail.units}</td>
            <td>${(+detail.subtotal).toFixed(2)}</td>
        </tr>
    );
}