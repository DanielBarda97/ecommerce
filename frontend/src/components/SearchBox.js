import React,{ useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-inline-block'>
      <Form.Control 
      type='text' 
      name='q' 
      onChange={(e) => setKeyword(e.target.value)} 
      placeholder='Search Product...' 
      className='me-sm-2 ms-sm-5 d-inline-block w-auto'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2 d-inline'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
