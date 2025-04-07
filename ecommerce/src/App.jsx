
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Admin/components/Dashboard'
import Login from './Admin/components/Login'
import Products from './Admin/components/Products'
import Users from './Admin/components/Users'
import LayOut from './Admin/components/LayOut'
import AdminCoupons from './Admin/components/AdminCoupons'
import CheckoutForm from './Admin/components/checkOutForm'
import VendorProductManager from './vendor/components/VendorProductManager'
import VendorLogin from './vendor/components/VendorLogin'
import VendorRegister from './vendor/components/VendorRegister'

function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path='login' element={<Login/>}/>
      <Route path='/' element={<LayOut/>}>
<Route path='users' element={<Users/>}/>
<Route path='layout' element={<LayOut/>}/>
<Route path='dashboard' element={<Dashboard/>}/>
<Route path='coupons' element={<AdminCoupons/>}/>
<Route path='checkout' element={<CheckoutForm/>}/>
<Route path='/' element={<Dashboard/>}/>
<Route path='products' element={<Products/>}/>

      </Route>

      {/* vendor */}
<Route path='vendor' element={<VendorProductManager/>}/>
<Route path='vendor-login' element={<VendorLogin/>}/>
<Route path='vendor-register' element={<VendorRegister/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
