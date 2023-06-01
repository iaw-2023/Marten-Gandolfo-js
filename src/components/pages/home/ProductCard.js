import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../../../App.css'

export default function ProductCard({product}){
    return (
            <div class="card" style={{width: "18rem"}}>
                <Link to={'/products/' + product.id} style={{ textDecoration: 'none', color: 'black'}}>
                    <img src={product.product_image} class="card-img-top" alt="" style={{ height: "12rem", objectFit: "cover" }} />
                    <div class="card-body" style={{ height: "8rem" }}>
                        <h5 class="card-title line-clamp-3">{product.name}</h5>
                        <p class="card-text">${product.price}</p>
                    </div>
                </Link>
            </div>

    );
}