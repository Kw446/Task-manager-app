import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './updateUser.css'
import axios from 'axios'
import { toast } from 'react-hot-toast';
const UpdateUser = () => {
    const addData={
        name:"",
        email:"",
        password:""
    }
    const [user,setUser]=useState(addData)

 const{id}=useParams();
  const navigate = useNavigate()

  const inputHandler=(e)=>{
    const {name,value}=e.target
    console.log(name,value)
    setUser({...user,[name]:value})
}
useEffect(()=>{

    axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get_by_id/${id}`)
    .then((res)=>{
        setUser(res.data.data);

    })
    .catch((error)=>{
        console.log("error while fetching data", error);
    })
} ,[id])

const submitForm = async (e) => {
  e.preventDefault();

  // Basic validation - password is optional for updates
  if (!user.name.trim() || !user.email.trim()) {
    alert('Please fill in name and email fields');
    return;
  }

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/api/user/update_user/${id}`,user);
    console.log('Response:', res.data);

    if (res.data.success) {
      toast.success(res.data.message,{position:'top-left'});
      navigate('/');
    } else {
      toast.error(res.data.message || 'Failed to update user',{position:'top-left'});
    }

  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error('Error updating user: ' + (error.response?.data?.message || error.message),{position:'top-left'});
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

  <h3>Update User</h3>

  <div className="inputGroup">
    <label htmlFor="name">Name:</label>
    <input type="text" name="name" value={user.name} onChange={inputHandler} autoComplete='off' placeholder='Enter Your name'/>
  </div>

  <div className="inputGroup">
    <label htmlFor="email">Email:</label>
    <input type="email" name="email" value={user.email} onChange={inputHandler} autoComplete='off' placeholder='Enter Your email'/>
  </div>

  <div className="inputGroup">
    <label htmlFor="password">Password (leave empty to keep current):</label>
    <input type="password" name="password" value={user.password} onChange={inputHandler} autoComplete='off' placeholder='Enter new password (optional)'/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      
    </div>
  )
}

export default UpdateUser
