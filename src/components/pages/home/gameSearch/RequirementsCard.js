export default function RequirementsCard({ requirements }){
    return (
        <div class='card'>
            <p>Procesador: {requirements.processor || '-'}</p>
            <p>Memoria: {requirements.memory || '-'}</p>
            <p>GPU: {requirements.gpu || '-'}</p>
            <p>Almacenamiento: {requirements.storage || '-'}</p>
        </div>
    );
}