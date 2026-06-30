import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Navbar} from '../src/components/navbar';
import Footer from '../src/components/footer';
import {Home} from './pages/Home';
import Products from './pages/Products';
import {ProductDetail} from '../src/pages/ProductDetails';
import Cart from '../src/pages/cart';
import Login from '../src/pages/login';
import Checkout from '../src/pages/checkout';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Main Content Area with Routes */}
        <main className="grow">
           <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
           </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;