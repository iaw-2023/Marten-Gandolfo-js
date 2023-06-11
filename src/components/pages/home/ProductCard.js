import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../App.css'

export default function ProductCard({product}){
    return (
            <div class="card product-card">
                <Link class='black-link' to={'/products/' + product.id}>
                    <img src={`data:image/webp;base64,${product.product_image}`} class="card-img-top" alt="" />
                    <div class="card-body">
                        <h5 class="card-title line-clamp-3">{product.name}</h5>
                        <p class="card-text">${product.price}</p>
                    </div>
                </Link>
            </div>

    );
}