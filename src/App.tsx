import { useState } from 'react';
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation,
} from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';

import Login from './assets/Auth/Login';
import Signup from './assets/Auth/Signup';
import ForgotPassword from './assets/Auth/ForgotPassword';
import Home from './pages/Home';
import Electronics from './assets/Categories/Electronics';
import Clothes from './assets/Categories/clothes/Clothes';
import Accessories from './assets/Categories/Accessories/Accessories';
import Food from './assets/Categories/Food';
import Furniture from './assets/Categories/Furniture';
import Cosmetics from './assets/Categories/Cosmetics/Cosmetics';
import Lighting from './assets/Categories/Lighting';
import Navbar from './assets/components/Navbar';
import MensShirts from './assets/Categories/clothes/MensShirts';
import MensShoes from './assets/Categories/clothes/MensShoes';
import WomensDresses from './assets/Categories/clothes/WomensDresses';
import WomensShoes from './assets/Categories/clothes/WomensShoes';
import { CartProvider } from './assets/components/CartContext';
import Sunglasses from './assets/Categories/Cosmetics/Sunglasses';
import Fragrances from './assets/Categories/Cosmetics/Fragrances';
import GirlsDresses from './assets/Categories/clothes/GirlsDresses';
import Latops from './assets/Categories/Accessories/Laptops';
import Smartphones from './assets/Categories/Accessories/Smartphones';
import Sidebar from './assets/components/SideBar';
import Cart from './pages/Cart';
import OrderSummaryPage from './pages/OrderSummaryPage';
import PaymentPage from './pages/PaymentForm';
import ProductDetails from './assets/components/ProductDetails';
import Profile from './pages/Profile';
import MotorCycle from './assets/Categories/Automobile/Motorcycle';
import Automotive from './assets/Categories/Automobile/Automotive';

const drawerWidth = '10rem';

// Styled component for the main content area
const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: '-10rem',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft:'.5rem',
  }),
}));

// To offset the navbar height
const AppBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

// Main App content logic
function AppContent() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Routes where Navbar/Sidebar should be hidden
  const hideNavbarRoutes = ['/login', '/signup', '/forgot-password', ];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Navbar and Sidebar only on main pages */}
      {!hideNavbar && (
        <>
          <Navbar onMenuClick={() => setDrawerOpen(!drawerOpen)} />
          <Sidebar
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            drawerWidth={drawerWidth}
          />
        </>
      )}

      {/* Main content */}
      <Main open={drawerOpen}>
        {!hideNavbar && <AppBarOffset />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/food" element={<Food />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/cosmetics" element={<Cosmetics />} />
          <Route path="/lighting" element={<Lighting />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/smart-phones" element={<Smartphones />} />
          <Route path="/laptops" element={<Latops />} />
          <Route path="/men-clothes" element={<MensShirts />} />
          <Route path="/women-clothes" element={<WomensDresses />} />
          <Route path="/men-shoes" element={<MensShoes />} />
          <Route path="/women-shoes" element={<WomensShoes />} />
          <Route path="/girlsDresses" element={<GirlsDresses />} />
          <Route path="/sunglasses" element={<Sunglasses />} />
          <Route path="/fragrances" element={<Fragrances />} />
          <Route path="/motorcycle" element={<MotorCycle />} />
          <Route path="/automotive" element={<Automotive />} />
          <Route path="/checkout/summary" element={<OrderSummaryPage />} />
          <Route path="/checkout/payment" element={<PaymentPage amount={0} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Main>
    </Box>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
