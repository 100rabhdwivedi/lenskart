import { Route, Routes,Navigate  } from 'react-router-dom'
import Home from '../pages/Home'
import VideoGallery from '../components/VideoGallery'
import { AnimatePresence } from 'framer-motion'
import Contact from '../pages/Contact'
import Products from '../pages/Products'
import FilteredProducts from '../pages/FilteredProducts'
import SingleProduct from '../pages/SingleProduct'
import About from '../pages/About'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/Signuppage'

const IndexRoutes = () => {

    return (
        <AnimatePresence mode="wait">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/gallery' element={<VideoGallery />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/about' element={<About />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/:filterQuery' element={<FilteredProducts />} />
                <Route path='/products/details' element={<SingleProduct />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    )
}

export default IndexRoutes