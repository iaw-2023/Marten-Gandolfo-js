import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export default function ProductCard({product}){
    return (
        <Link to={'/products/' + product.id} style={{ textDecoration: 'none' }}>
            <div class="card" style={{width: "18rem", height: "22rem"}}>
                <img src={product.product_image} class="card-img-top" alt="" style={{ height: "2000px" }} />
                <div class="card-body" style={{ height: "120px" }}>
                    <h5 class="card-title" style={{ height: "40px" }}>{product.name}</h5>
                    <p class="card-text">${product.price}</p>
                </div>
            </div>
        </Link>
    );
}