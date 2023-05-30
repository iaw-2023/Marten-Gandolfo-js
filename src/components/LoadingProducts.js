import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'
import ProductPlaceholder from './ProductPlaceholder';

export default function LoadingSpinner(){
    return (
        <div class="card-container">
            {[...Array(10)].map(() => (
                <ProductPlaceholder />
            ))}
        </div>
    );
}