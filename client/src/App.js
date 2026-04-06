import './App.css';
import User from './getUser/user';
import AddUser from './Adduser/adduser';
import UpdateUser from './updateUser/updateUser';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  const route=createBrowserRouter([
    {
      path:'/',
      element:<User/>
    },
    {
      path:'/adduser',
      element:<AddUser/>
    },
    {
      path:'/updateuser/:id',
      element:<UpdateUser/>
    },
    {
      path:'*',
      element: <div style={{textAlign: 'center', padding: '50px'}}>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/">Go back to Home</a>
      </div>
    }
  ])
  return (
    <div className="App">
   <RouterProvider router={route}/>
   <Toaster />
    </div>
  );
}

export default App;
