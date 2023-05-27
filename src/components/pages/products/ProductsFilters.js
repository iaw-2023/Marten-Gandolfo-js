import 'bootstrap/dist/css/bootstrap.css';
import '../../../App.css'

export default function ProductsFilters({categories, handleCategoryUpdate, handleOrderUpdate, handleSearch, searchRef: searchRef}){
    return (
        <>
            <div class="filter-container">
                <div class="filter-row">
                    <select id="category_id" class="form-select" aria-label="Default select example" type="number" onChange={handleCategoryUpdate}>
                        <option value="-1" selected>Todas las categorias</option>
                        {categories.map((category) => (<option value={category.id}>{category.name}</option>))}
                    </select>
                                    
                    {/* <select id="category_id" name="category_id" type="number" onChange={handleCategoryUpdate}>
                        <option value="-1" selected>Todas</option>
                        {categories.map((category) => (<option value={category.id}>{category.name}</option>))}
                    </select> */}
                   
                </div>

                <div class="filter-row">

                    <div class="input-group mb-3">
                        <input type="text" ref={searchRef} class="form-control" placeholder="Nombre del producto" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSearch}>Buscar</button>
                    </div>

                    {/* <input
                        type="text"
                        placeholder="Buscar producto..."
                        ref={searchRef}
                        style={{ marginBottom: '1rem' }}
                    />
                    <button onClick={handleSearch}>Buscar</button> */}
                </div>
                
                <div class="filter-row">
                    
                    <select id="order_price" class="form-select" aria-label="Default select example" type="number" onChange={handleOrderUpdate}>
                        <option value="-1" selected>Orden por defecto de precios</option>
                        <option value="desc">Precios descendentes</option>
                        <option value="asc">Precios ascendentes</option>
                    </select>

                    {/* Seleccione orden de precios
                    <select name="priceOrder" id="priceOrder" onChange={handleOrderUpdate}>
                        <option value="desc">Precios descendentes</option>
                        <option value="asc">Precios ascendentes</option>
                    </select> */}
                </div>
            </div>
        </>
    );

}