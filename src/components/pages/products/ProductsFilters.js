export default function ProductsFilters({categories, handleCategoryUpdate, handleOrderUpdate, handleSearch, searchRef: searchRef}){
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
                    ref={searchRef}
                    style={{ marginBottom: '1rem' }}
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>

            <div>
                Seleccione orden de precios
                <select name="priceOrder" id="priceOrder" onChange={handleOrderUpdate}>
                    <option value="desc">Precios descendentes</option>
                    <option value="asc">Precios ascendentes</option>
                </select>
            </div>
        </>
    );

}