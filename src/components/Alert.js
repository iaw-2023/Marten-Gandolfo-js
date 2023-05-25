export default function Alert({message, showAlert}){
    return showAlert && (<div class="alert alert-success" role="alert">{message}</div>);
}