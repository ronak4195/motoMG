import React, {useState} from 'react'
import './AddProduct.css'
import add from '../../assets/uploadImage.svg'
import { useAppContext } from '../../Context/Context';

const AddProduct = () => {
    const [image,setImage] = useState(false);
    const { baseURL } = useAppContext(); 
    const[productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"helmets",
        quantity:"",
        price:"",
        mrp:""
    })
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }
    const Add_Product = async ()=>{
        console.log(productDetails);
        let responsedata;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);

        await fetch(`${baseURL}/upload`, {
            method:'Post',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data)=>{responsedata=data})

        if(responsedata.success){
            product.image = responsedata.image_url;
            console.log(product);
            await fetch(`${baseURL}/addproduct`,{
                method:'Post',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }
    }
    
  return (
    <div className='addproduct'>
        <div className="addproductitemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='TypeHere'/>
        </div>
        {/* <div className="addproductitemfield">
            <p>Product ID</p>
        <input value={productDetails.id} onChange={changeHandler} type="text" name='id' placeholder='TypeHere'/>
        </div> */}
        <div className="productprice">
            <p>Product price</p>
            <input value={productDetails.price} onChange={changeHandler} type="text" name='price' placeholder='TypeHere' />
        </div>
        <div className="productprice">
            <p>Product mrp</p>
            <input value={productDetails.mrp} onChange={changeHandler} type="text" name='mrp' placeholder='TypeHere' />
        </div>
        <div className="productcategory">
            <p>Product category</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" >
                <option value="helmets">helmet</option>
                <option value="ridinggears">ridinggear</option>
                <option value="accessories">accessories</option>
            </select>
        </div>
        <div className="productquantity">
            <p>Product quantity</p>
            <input value={productDetails.quantity} onChange={changeHandler} type="text" name='quantity' placeholder='TypeHere' />
        </div>
        <div className="image">
            <label htmlFor="fileinput">
                <img src={image?URL.createObjectURL(image):add} alt="" />
    
            </label>
            <input onChange={imageHandler} type="file" name='image' id='fileInput'/>
        </div>
        <button onClick={()=>{Add_Product()}} className='addProdBtn'>ADD</button>
    </div>
  )
}

export default AddProduct

