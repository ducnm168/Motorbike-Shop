import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import LoginPage from './pages/Auth/LoginPage.jsx'
import RegisterPage from './pages/Auth/RegisterPage.jsx'
import MotorcycleListPage from './pages/Motorcycles/MotorcycleListPage.jsx'
import MotorcycleDetailPage from './pages/Motorcycles/MotorcycleDetailPage.jsx'
import AccessoryListPage from './pages/Accessories/AccessoryListPage.jsx'
import SparePartListPage from './pages/SpareParts/SparePartListPage.jsx'
import SparePartDetailPage from './pages/SpareParts/SparePartDetailPage.jsx'
import AccessoriesDetailPage from './pages/Accessories/AccessoryDetailPage.jsx'
import AccountInfoPage from './pages/User/AccountInfoPage.jsx'
import PromotionPage from './pages/Promotions/PromotionPage.jsx'
import EventPage from './pages/Events/EventPage.jsx'
import AccountSettingsPage from './pages/User/AccountSettingsPage.jsx'
import MotorcycleOrderListPage from './pages/Order/MotorcycleOrderListPage.jsx'
import SPAccessoryOrderListPage from './pages/Order/SPAccessoryOrderListPage.jsx'
import CheckOutPage from './pages/Order/CheckOutPage.jsx'
import OrderDetailPage from './pages/Order/OrderDetailPage.jsx'
import PaymentPage from './pages/Order/PaymentPage.jsx'

import DashboardPage from './pages/Admin/DashboardPage.jsx'
import ManageProductPage from './pages/Admin/ManageProductPage.jsx'
import ManageOrderPage from './pages/Admin/ManageOrderPage.jsx'
import CreateMotorcyclePage from './pages/Admin/CreateMotorcyclePage.jsx'
import CreateAccessoryPage from './pages/Admin/CreateAccessoryPage.jsx'
import CreateSparepartPage from './pages/Admin/CreateSparePartPage.jsx'
import ManageOrderDetailPage from './pages/Admin/OrderDetailPage.jsx'

import { AuthContext } from './contexts/AuthContext.jsx'
import { Navigate } from 'react-router-dom';

function App() {
  const { isLoggedIn, isLoading, isAdmin } = useContext(AuthContext)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-[#de0000] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/dang-nhap' element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />} />
        <Route path='/dang-ky' element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage />} />
        <Route path='/xe-may' element={<MotorcycleListPage />} />
        <Route path='/phu-kien' element={<AccessoryListPage />} />
        <Route path='/phu-tung' element={<SparePartListPage />} />
        <Route path='/khuyen-mai' element={<PromotionPage />} />
        <Route path='/su-kien' element={<EventPage />} />
        <Route path='/xe-may/:slug' element={<MotorcycleDetailPage />} />
        <Route path='/phu-tung/:slug' element={<SparePartDetailPage />} />
        <Route path='/phu-kien/:slug' element={<AccessoriesDetailPage />} />
        <Route path='/account/profile' element={!isLoggedIn ? <Navigate to="/" /> : <AccountInfoPage />} />
        <Route path='/account/settings' element={!isLoggedIn ? <Navigate to="/" /> : <AccountSettingsPage />} />
        <Route path='/dat-hang' element={!isLoggedIn ? <Navigate to='/dang-nhap' /> : <CheckOutPage />} />
        <Route path='/account/orders/motorcycle' element={!isLoggedIn ? <Navigate to="/" /> : <MotorcycleOrderListPage />} />
        <Route path='/account/orders/accessory-sparepart' element={!isLoggedIn ? <Navigate to="/" /> : <SPAccessoryOrderListPage />} />
        <Route path='/account/orders/motorcycle/:id' element={!isLoggedIn ? <Navigate to="/" /> : <OrderDetailPage />} />
        <Route path='/payment' element={!isLoggedIn ? <Navigate to="/" /> : <PaymentPage />} />
      </Route>

      <Route path='admin/dashboard' element={isAdmin ? <DashboardPage /> : <Navigate to="/" />} />
      <Route path='admin/products' element={isAdmin ? <ManageProductPage /> : <Navigate to="/" />} />
      <Route path='admin/orders' element={isAdmin ? <ManageOrderPage /> : <Navigate to="/" />} />
      <Route path='admin/orders/:id' element={isAdmin ? <ManageOrderDetailPage /> : <Navigate to="/" />} />
      <Route path='admin/add-motorcycle' element={isAdmin ? <CreateMotorcyclePage /> : <Navigate to="/" />} />
      <Route path='admin/add-accessory' element={isAdmin ? <CreateAccessoryPage /> : <Navigate to="/" />} />
      <Route path='admin/add-sparepart' element={isAdmin ? <CreateSparepartPage /> : <Navigate to="/" />} />
      <Route path='admin/update-motorcycle' element={isAdmin ? <CreateMotorcyclePage /> : <Navigate to="/" />} />
      <Route path='admin/update-accessory' element={isAdmin ? <CreateAccessoryPage /> : <Navigate to="/" />} />
      <Route path='admin/update-sparepart' element={isAdmin ? <CreateSparepartPage /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
