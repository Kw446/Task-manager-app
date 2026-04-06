import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './adduser.css'
import axios from 'axios'
import { toast } from 'react-hot-toast';
const AddUser = () => {
    const addData={
        name:"",
        email:"",
        password:""
    }
    const [user,setUser]=useState(addData)
const inputHandler=(e)=>{
    const {name,value}=e.target
    console.log(name,value)
    setUser({...user,[name]:value})
}
  const navigate = useNavigate()

const submitForm = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!user.name.trim() || !user.email.trim() || !user.password.trim()) {
    alert('Please fill in all fields');
    return;
  }

  try {
    const res = await axios.post(
      'http://localhost:5000/api/user/create',user);
    console.log('Response:', res.data);

    if (res.data.success) {
      toast.success(res.data.message,{position:'top-left'});
      navigate('/');
    } else {
      toast.error(res.data.message || 'Failed to create user',{position:'top-left'});
    }

  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error('Error creating user: ' + (error.response?.data?.message || error.message),{position:'top-left'});
  }
};

  return (
    <div className='addUser'>
      
      <form className='addUserForm' onSubmit={submitForm}>

        <div className="formHeader">
          <button 
            type="button" 
            className="btn btn-secondary backBtn" 
            onClick={() => navigate('/')}
          >
      Back
    </button>
  </div>

  <h3>Add new User</h3>

  <div className="inputGroup">
    <label htmlFor="name">Name:</label>
    <input type="text" name="name" value={user.name} onChange={inputHandler} autoComplete='off' placeholder='Enter Your name'/>
  </div>

  <div className="inputGroup">
    <label htmlFor="email">Email:</label>
    <input type="email" name="email" value={user.email} onChange={inputHandler} autoComplete='off' placeholder='Enter Your email'/>
  </div>

  <div className="inputGroup">
    <label htmlFor="password">Password:</label>
    <input type="password" name="password" value={user.password} onChange={inputHandler} autoComplete='off' placeholder='Enter Your password'/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      
    </div>
  )
}

export default AddUser
