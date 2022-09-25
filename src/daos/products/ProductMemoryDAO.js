import MemoryContainer from '../../containers/messages/MemoryContainer.js'

export default class ProductMemoryDao extends MemoryContainer {
    
    add(product) {
        product.id = this.buildId(this.getAll());
        this.content.push(product);
        return product;
    }

    updateById(id = +id, product) {
        const productFound = this.getById(id);
        if (!productFound) {
            return 'Product not found'
        }
        let products = this.getAll()
        let index = products.indexOf(product => product.id === id)
        
        product.id = productFound[0].id;

        products.splice(index,1,product);
        return `Product with ID: ${id} Updated`;
    }
}