import Home  from './Dashboard/Pages/Home/Home'
import Product from './Dashboard/Pages/Products/Products'
import Users from './Dashboard/Pages/Users/Users'
import Newuser from './Dashboard/Pages/Newuser/Newuser'
let routes = [
    {path:'/',element:<Home/>},
    {path:'/products', element:<Product/>},
    {path:'/users', element:<Users/>},
    {path:'/newuser', element:<Newuser/>},
]

export default routes