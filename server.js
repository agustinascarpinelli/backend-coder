const express =require ('express')
const Container=require('./container.js')
const container=new Container ([])

const app=express()

const routerProducts=express()

app.use('/products', routerProducts)

routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static('public'))
const PORT=8080

const server=app.listen(PORT, ()=>{
    console.log("Server on")
})

server.on("error", error=>console.log(error))

routerProducts.get('/:id', (req,res)=>{
    let id =parseInt(req.params.id)
    let product=container.getById(id)
    if (product===null){
        res.send({error:"The id provided is not a number or is not in the array"}) 
    }
    else{
        res.json(product)
      
    }

})

routerProducts.post('/change', (req,res)=>{
    let id=parseInt(req.body.id)
    if (isNaN(id)){
        res.send({error:"The id provided is not a number"})
     
    }
    else{
        let product=container.getById(id)
        let newProduct=req.body
       product.name=newProduct.name
       product.price=newProduct.price
       product.thumbnail=newProduct.thumbnail
        res.json({product:product})
    }

})

routerProducts.put('/change/:id', (req,res)=>{
    let id=parseInt(req.params.id)
    if (!isNaN(id)){
       let product=container.getById(id)
       let newProduct=req.body
      product.name=newProduct.name
      product.price=newProduct.price
      product.thumbnail=newProduct.thumbnail
       res.json(product)

    }
    else{
        res.send({error:"The id provided is not a number"})
    }

})


routerProducts.delete('/delete/:id', (req,res)=>{
    let id=parseInt(req.params.id)
   const deleteId =container.deleteById(id)
   res.send({"The product has been removed, the new Array is":container.getAll()})
    if (deleteId===null){
        res.send({error:"The id provided is not a number"})
    }


})

routerProducts.post('/add',(req,res)=>{
    let product= req.body
    container.save(product)
    res.json(product)
})

routerProducts.get('/products', async (req,res)=>{
const products=container.getAll()
res.json(products)

}
        
)