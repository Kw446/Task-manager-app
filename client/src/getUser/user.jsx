import React, { useEffect,useState } from 'react'
import axios from 'axios'
import './user.css'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const User = () => {
  const [users, setUser] = useState([]);
useEffect(()=>{
  const fecthUserData=async()=>{
    try{
const response =await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/get_all_users`);
setUser(response.data.data);

    }catch(error){
      console.log("error while fetching data", error);
    }
  };
  fecthUserData();
},[]);

const DeleteUser=async(id)=>{
  try{
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/user/delete_user/${id}`)
    .then((response)=>{  
      if(response.data.success){
        setUser(users.filter((user)=>user._id !== id));
      }
      toast.success(response.data.message,{position:'top-left'});
    });

  }catch(error){
    console.log("error while deleting user", error);
  }

}

  return (
    <div className='userTable'>
      <Link to="/adduser" type="button" className="btn btn-primary">AddUser <i className="fa-solid fa-user-plus"></i></Link>
      <h3 style={{ marginTop: '15px', textAlign: 'center',color: 'rgb(0, 0, 0.65)' }}>
    Task Manager
  </h3>
      {users.length === 0 ? (
          <div style={{textAlign: 'center', margin: '20px'}}>
            <h1>No Users Found</h1>
            <p>There are no users to display. Please add some users.</p>
            <a href="/adduser">Add User</a>
          </div>
        ) : null}

        <table className='table table-bordered'>
<thead>
    <tr>
      <th scope='column'>S.NO</th>
        <th scope='column'>Name</th>
        <th scope='column'>Email</th>
        <th scope='column'>Action</th>
    </tr>
</thead>
<tbody>
  {users.map((user,index)=>{
    return(
      <tr>
        <td>{index + 1}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td className='actionButton'>
         <Link to={`/updateuser/${user._id}`} type="button" className="btn btn-primary"> <i className="fa-solid fa-pen-to-square"></i></Link>
        <Link onClick={() => DeleteUser(user._id)} type="button" className="btn btn-danger"><i className="fa-solid fa-trash"></i></Link>
        </td>
      </tr>
    )
  })}
</tbody>
  </table>    
    </div>
  )
}

export default User
