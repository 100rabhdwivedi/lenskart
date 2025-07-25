import { glassesData } from '../utils/data'
import ProductsNav from '../components/ProductsNav'
import ProductCard from "../components/ProductCard"
import Transition from '../components/Transition'
const Products = () => {

    return (
        <>
                <ProductsNav />
            <div className="min-h-screen overflow-hidden w-full   font-final text-gray-800">
                <div className="flex flex-wrap gap-6 justify-center  py-8 px-4">
                    {glassesData.map((item) => (
                        <ProductCard key={item.id} data={item} />
                    ))}
                </div>


            </div>
        </>
    )
}

export default Transition(Products)