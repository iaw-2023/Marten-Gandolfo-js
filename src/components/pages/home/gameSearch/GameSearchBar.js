export default function GameSearchBar({ handleClearSearch, searchTerm, handleSearchTermChange, handleSearch }){
    return (
        <div class="input-group">
            <button class="btn btn-outline-secondary" type="button" onClick={handleClearSearch}>&lt;</button>
            <input type="text" value={searchTerm} onChange={handleSearchTermChange} class="form-control" placeholder="Nombre del juego"/>
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSearch}>Buscar</button>
        </div>
    );
}