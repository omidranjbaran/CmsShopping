import Home from "./Pages/Home/Home"
import Products from './Pages/Products/Products'
import Users from './Pages/Users/Users'
import Comments from './Pages/Comments/Comments'
import Orders from "./Pages/Orders/Orders"
import Discount from "./Pages/Discount/Discount"




let routes = [
    {path:'/',element:<Home/>},
    {path:'home',element:<Home/>},
    {path:'/products', element:<Products/>},
    {path:'/comments', element:<Comments/>},
    {path:'/users', element:<Users/>},
    {path:'/orders', element:<Orders/>},
    {path:'/discount', element:<Discount/>},
]

export default routes