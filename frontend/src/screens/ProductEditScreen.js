import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductsDetails, updateProduct } from '../actions/productAction'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { 
    loading: loadingUpdate, 
    error: errorUpdate, 
    success: successUpdate
  } = productUpdate

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productslist')
    } else {
      if(!product.name || product._id !== productId){
        dispatch(listProductsDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
    
  }, [dispatch, history, productId, product, successUpdate])

  const  uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try{
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch(error){
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock
    }))
  }

  return (
    <>
      <Link to='/admin/productslist' className='btn btn-dark my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
          <Row>
            <Form.Group controlId='name' as={Col} lg={7}>
              <Form.Label>Product Name</Form.Label>
              <Form.Control 
              type='name' 
              placeholder='Enter product name' 
              value={name} 
              onChange={(e)=>setName(e.target.value)}
              className='border'>
              </Form.Control>
            </Form.Group>
            
            <Form.Group controlId='category' as={Col} lg={5}>
              <Form.Label>Category</Form.Label>
              <Form.Control 
              type='text' 
              placeholder='Enter category' 
              value={category} 
              onChange={(e)=>setCategory(e.target.value)}
              className='border'>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='image' as={Col} lg={7}>
              <Form.Label>Image</Form.Label>
              <Form.Control 
              type='text' 
              placeholder='Enter image url' 
              value={image} 
              onChange={(e)=>setImage(e.target.value)}
              className='border'>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='image-file' as={Col} lg={5}>
              <Form.Label>Upload Image</Form.Label>
              <Form.File 
              id="image-file"
              hidden
              onChange={uploadFileHandler}
              />
              <Form.Label className="btn btn-dark" style={{width:"100%"}}>Choose Image</Form.Label>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand' as={Col} lg={5}>
              <Form.Label>Brand</Form.Label>
              <Form.Control 
              type='text' 
              placeholder='Enter brand' 
              value={brand} 
              onChange={(e)=>setBrand(e.target.value)}
              className='border'>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='price' as={Col} lg={4}>
              <Form.Label>Price</Form.Label>
              <Form.Control 
              type='number' 
              placeholder='Enter product price' 
              value={price} 
              onChange={(e)=>setPrice(e.target.value)}
              className='border'>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' as={Col} lg={3}>
              <Form.Label>In Stock</Form.Label>
              <Form.Control 
              type='number' 
              placeholder='Enter count in stock' 
              value={countInStock} 
              onChange={(e)=>setCountInStock(e.target.value)}
              className='border'>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description' as={Col} lg={12}>
              <Form.Label>Description</Form.Label>
              <Form.Control 
              as='textarea'
              rows={4}
              type='text' 
              placeholder='Enter description' 
              value={description} 
              onChange={(e)=>setDescription(e.target.value)}
              className='border'>
              </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
              Update
            </Button>
          </Row>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen