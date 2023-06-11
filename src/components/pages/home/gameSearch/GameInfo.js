import RequirementsCard from "./RequirementsCard";

export default function GameInfo({ gameInfo }){
    const parseRequirements = (requirementsString) => {
        if(!requirementsString) return {};

        const requirements = {};
        const processorMatch = requirementsString.match(/<strong>Processor:<\/strong>(.*?)(<br>|<\/li>)/);
        const memoryMatch = requirementsString.match(/<strong>Memory:<\/strong>(.*?)(<br>|<\/li>)/i);
        const gpuMatch = requirementsString.match(/<strong>Graphics:<\/strong>(.*?)(<br>|<\/li>)/i);
        const storageMatch = requirementsString.match(/<strong>Storage:<\/strong>(.*?)(<br>|<\/li>)/i);

        requirements.processor = processorMatch ? processorMatch[1].trim() : null;
        requirements.memory = memoryMatch ? memoryMatch[1].trim() : null;
        requirements.gpu = gpuMatch ? gpuMatch[1].trim() : null;
        requirements.storage = storageMatch ? storageMatch[1].trim() : null;
        
        return requirements;
    }
    
    return (
        <div class='card gameinfo-card p-2 m-1'>
            <div class='gameinfo-head'>
                <img class='gameinfo-image m-2' src={gameInfo.header_image} width={'35%'}/>
                <h5 class='gameinfo-title m-3 line-clamp-3' ><b>{gameInfo.name}</b></h5>
            </div>
            <div class='card-container m-0'>
                <RequirementsCard label={'Requisitos Minimos:'} requirements={parseRequirements(gameInfo.pc_requirements.minimum)} />
                <RequirementsCard label={'Requisitos Recomendados:'} requirements={parseRequirements(gameInfo.pc_requirements.recommended)} />
            </div>
        </div>   
    );
}