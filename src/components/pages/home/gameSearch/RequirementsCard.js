export default function RequirementsCard({ label, requirements }){
    return (
        <div class='card requirements-card p-2 m-2'>
            <h4>{label}</h4>
            <div class='p-2'>
                <p><b>Procesador:</b> {requirements.processor || '-'}</p>
                <p><b>Memoria:</b> {requirements.memory || '-'}</p>
                <p><b>GPU:</b> {requirements.gpu || '-'}</p>
                <p><b>Almacenamiento:</b> {requirements.storage || '-'}</p>
            </div>
        </div>
    );
}