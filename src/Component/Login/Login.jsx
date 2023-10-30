import axios from 'axios'
import Joi from 'joi'
import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login(props) {

  let { saveUserData } = props

  const [user, setUser] = useState({
    email: "",
    password: "",
  })
 

  const [errorApi, setErrorApi] = useState("")
  const [errorList, setErrorList] = useState([])
  const [loading, setLoading] = useState(false)


  let navigate = useNavigate()

  function addUser(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }

  async function submitForm(e) {
    e.preventDefault()
    let valid = validData()
    if (valid.error == undefined) {
      setLoading(true)
       await axios.post("https://wearher-from-mimi.com/api/login", user).then((data)=>{
       
          navigate('/home')
          localStorage.setItem("token", data.data)
          saveUserData()
          setLoading(false)
      
      }).catch((err)=>{
        setErrorApi(err.response.data.msg)
        setLoading(false)
        console.log(err.response.data.msg);
    
      })
    } else {
      setErrorList(valid.error.details)
      console.log(valid.error.details);
    }
  }


 

  function validData() {

    const schema = Joi.object({
      email: Joi.string().required().email({ tlds: { allow: ['net', 'com'] } }),
      password: Joi.string().required().pattern(new RegExp(/^[A-Z][a-z0-9]{5,20}$/)),
    })
    return schema.validate(user, { abortEarly: false })
  }



  return (
    <div className='container bg-dark'>
      {errorApi == "" ? <div className='bg-transparent'></div> : <div className='alert alert-danger mt-2'>{errorApi}</div>}
      {errorList.length > 0 ? errorList.map((e) => <div className='alert alert-danger mt-2'>{e.message}</div>) : <div className='bg-transparent'></div>}
      <div className='row mt-3'>

        <div className='col-md-12 d-flex flex-column justify-content-center align-items-center bg-dark p-3'>
          <h2 className='text-white font1'>Login To Our Website</h2>
          <form className='w-100 text-center' onSubmit={submitForm}>




            <input type="text" placeholder='Enter Your Email' className='form-control  text-dark mt-3 bg-dark-subtle' name='email' id='email' onChange={addUser} />

            <input type="password" placeholder='Enter Your Password' className='form-control bg-dark-subtle text-dark mt-3 ' name='password' id='password' onChange={addUser} />


            {loading ? <button className='btn mt-4 btn-outline-light w-75 '>
              <i className=" fa-solid fa-spinner fa-spin fs-3"></i>
            </button> :
              <button className='btn mt-4 btn-outline-light w-75 '>Login</button>}

          </form>
          <p className='text-white mt-4'>Don't have an account? <Link to='/register' className='font1 fs-4 link-underline link-underline-opacity-0'>Registet Now!</Link> </p>

        </div>
      </div>
    </div>
  )
}
