export default function ErrorMessage({message}){
    return (
        <div class="alert alert-danger m-5" role="alert">{message}</div>
    );
}