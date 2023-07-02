import 'bootstrap/dist/css/bootstrap.css';
import '../../../App.css'

export default function ProductsFilters({categories, handleCategoryUpdate, handleOrderUpdate, handleSearch, searchRef: searchRef}){
    return (
        <>
            <div class="filter-container">
                <div class="filter-row">
                    <select id="category_id" class="form-select mb-3" aria-label="Default select example" type="number" onChange={handleCategoryUpdate}>
                        <option value="-1" selected>Todas las categorias</option>
                        {categories && categories.map((category) => (<option value={category.id}>{category.name}</option>))}
                    </select>
                   
                </div>

                <div class="filter-row">

                    <div class="input-group mb-3">
                        <input type="text" ref={searchRef} class="form-control" placeholder="Nombre del producto"/>
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSearch}>Buscar</button>
                    </div>
                </div>
                
                <div class="filter-row">
                    
                    <select id="order_price" class="form-select" aria-label="Default select example" type="number" onChange={handleOrderUpdate}>
                        <option value="-1" selected>Orden por defecto</option>
                        <option value="desc">Precios descendentes</option>
                        <option value="asc">Precios ascendentes</option>
                    </select>
                </div>
            </div>
        </>
    );

}