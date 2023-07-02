export default function RequirementsCard({ label, requirements, requirementsText }){
    return (
        (requirements.processor || requirements.memory || requirements.gpu || requirements.storage || requirementsText) ?
            <div class='card requirements-card p-2 m-2 w-100 d-flex'>
                <h4>{label}</h4>
                {(requirements.processor || requirements.memory || requirements.gpu || requirements.storage) || !requirementsText ?
                    <div class='p-2'>
                        <p><b>Procesador:</b> {requirements.processor || '-'}</p>
                        <p><b>Memoria:</b> {requirements.memory || '-'}</p>
                        <p><b>GPU:</b> {requirements.gpu || '-'}</p>
                        <p><b>Almacenamiento:</b> {requirements.storage || '-'}</p>
                    </div>
                :
                    <p dangerouslySetInnerHTML={{ __html: requirementsText }} />
                }
            </div>
        :
            <></>
    );
}