import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'

export default function LoadingSpinner(){
    return (
        <div class="d-flex justify-content-center mt-5">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}