import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";

export default function MercadoPagoForm ({ buyItems, getTotalPrice }) {
    initMercadoPago('TEST-672f85d4-ce06-4bd5-b0ed-e038d3924111', {
        locale: 'es',
    });

    const initialization = {
        amount: getTotalPrice(), // monto a ser pagado
        payer: {
            email: localStorage.getItem('user_email'), // email del usuario registrado
        },
    };
        
    const customization = {
        maxInstallments: 12,
        visual: {
            style: {
                theme: 'default', // | 'dark' | 'bootstrap' | 'flat'
            },
        },
    };

        
    const onReady = () => {
        // callback llamado cuando Brick esté listo
    };
            
    const onSubmit = (cardFormData) => {
        // callback llamado cuando el usuario haga clic en el botón enviar los datos
        // ejemplo de envío de los datos recolectados por el Brick a su servidor
        return new Promise((resolve, reject) => {
            fetch(process.env.REACT_APP_API_URL + `_api/payWithMercadopago`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardFormData),
            })
            .then((response) => {
                // recibir el resultado del pago
                console.log("Respuesta de pago recibida para evaluar");
                if (!response.ok) throw new Error("Error con el pago.");
                return response.json();
            })
            .then((data) => {
                console.log("Respuesta de pago recibida exitosamente:", data);
                if (data.status !== undefined && data.status === "approved"){
                    buyItems();
                }
            })
            .then((response) => {
                // resolve
                console.log("Resuelvo");
                resolve();
            })
            .catch((error) => {
                console.log("Error");
                // tratar respuesta de error al intentar crear el pago
                reject();
            });
        });
    };
        
    const onError = (error) => {
            // callback llamado para todos los casos de error de Brick
    };

    return (
        <>
            <CardPayment
            initialization={initialization}
            customization={customization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
            />
        </>
        
    );
};