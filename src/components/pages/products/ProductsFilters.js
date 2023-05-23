export default function ProductsFilters({categories, handleCategoryUpdate, handleSearch, inputRef}){
    return (
        <>
            <div>
                Categoria:
                <select id="category_id" name="category_id" type="number" onChange={handleCategoryUpdate}>
                    <option value="-1" selected>Todas</option>
                    {categories.map((category) => (<option value={category.id}>{category.name}</option>))}
                </select>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    ref={inputRef}
                    style={{ marginBottom: '1rem' }}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
        </>
    );

}