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
        <div class='card'>
            <img src={gameInfo.header_image} width={300}/>
            <h3>{gameInfo.name}</h3>
            <div>
                <p>Requisitos Minimos:</p>
                <RequirementsCard requirements={parseRequirements(gameInfo.pc_requirements.minimum)} />
                <p>Requisitos Recomendados:</p>
                <RequirementsCard requirements={parseRequirements(gameInfo.pc_requirements.recommended)} />
            </div>
        </div>   
    );
}