import 'bootstrap/dist/css/bootstrap.css';
import '../../../App.css';

export default function Register(){
    return (
        <>
            <div className = "registerPage">
                <div class="card" style={{ height: '275px' }}>
                    <h5 class="card-header">Es nuevo aqui? Registrese</h5>
                    <div class="card-body">
                        <input type="text" class="form-control mb-3" name="username" placeholder="Ingrese aquí su correo"></input>
                        <input type="password" class="form-control mb-3" name="password" placeholder="Ingrese la contraseña que desee utilizar"/>
                        <input type="password" class="form-control mb-3" name="passwordConfirmation" placeholder="Confirme su contraseña"/>
                        <button class="btn btn-primary" type="submit">Registrar</button>
                    </div>
                </div>
            </div>
        </>
    );
}