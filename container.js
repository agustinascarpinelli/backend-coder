
class Container {
    constructor(products) {
      this.id = 1;
    this.products = products;
    }
  
    save(product) {
      if (this.products.length === 0) {
        product.id = this.id
      }
      else {
        this.id++
        product.id = this.id
      }
      this.products.push(product)
    }
  
    getById(id) {
      const prod=this.products
   
        if (id >= 1 && id <= prod.length) {
  
          const productId = prod.filter(prod=>prod.id===id)
          return productId
        }
  
      
  
  
  
      else {
        console.log("The id provided couldnt be found")
        return null
      }
    }
  
  
    getAll() {
      return this.products
    }
  
  
    deleteById(id) {
      if (!isNaN(id)) {
        if (id >= 1 && id <= this.products.length) {
          const newProducts = this.products.filter(prod => prod.id !== id)
          this.products = newProducts
          return this.products
        }
        else {
          return null
        }
  
      }
    }
  
  }
  
  module.exports = Container