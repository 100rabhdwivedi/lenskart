import React, { useEffect, useState } from 'react'
import { glassesData } from '../utils/data'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductsNav from '../components/ProductsNav'

const FilteredProducts = () => {
  const [filteredData, setFilteredData] = useState(null)
  const { filterQuery } = useParams()

  useEffect(() => {
    const filterData = glassesData?.filter((item) => item?.category.toLowerCase() == filterQuery.toLowerCase())
    setFilteredData(filterData)

  }, [filterQuery])

  return (
    <>
    <ProductsNav  />
    <div className='flex justify-center font-final h-screen flex-wrap gap-8 mt-14'>
      {filteredData?.length > 0 ? filteredData.map((item) =>
        <ProductCard data={item} />)
        :
        <div>Not found </div>
      }
    </div></>
  )
}

export default FilteredProducts