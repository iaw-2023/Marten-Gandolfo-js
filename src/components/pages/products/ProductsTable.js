import ProductRow from './ProductRow.js';

export default function ProductsTable({products, handlePageChange}){
    return (
        <>
            <table className="table table-striped table-bordered shadow-lg">
                <tbody>
                    {products.data.map((product) => <ProductRow product={product}/>)}
                </tbody>
            </table>
            <div>
                <label>Pagina:</label>
                <button onClick={() => handlePageChange(-1)}>{'<'}</button>
                <span>{products.current_page}</span>
                <button onClick={() => handlePageChange(1)}>{'>'}</button>
            </div>
        </>
    );
}