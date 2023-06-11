import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

export default function ToastComponent({id, toastTitle, toastBody, addButton, buttonText, buttonLink}){
    return (
        <div class="toast-container position-fixed bottom-0 end-0 p-3 data-bs-delay=10">
            <div id={id} class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="https://marten-gandolfo-laravel-promocion.vercel.app/logo" width="50" class="rounded me-2" alt="..."/>
                    <strong class="me-auto">{toastTitle}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    {toastBody}
                    {addButton && (
                        <div id="extraButton" class="mt-2 pt-2">
                            <Link type="button" to={buttonLink} class="btn btn-primary btn-sm">{buttonText}</Link>
                        </div>
                    )}
                </div>     
            </div>
        </div> 
    );
}