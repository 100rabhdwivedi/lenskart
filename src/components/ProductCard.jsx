import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ data }) => {
  const singlePrice = data.price;
  const discount = Math.round(singlePrice * 0.10);
  const offerText = `BUY 1 FOR ₹${singlePrice} | 2 FOR ₹${(singlePrice * 2) - discount}`;
  const navigate = useNavigate()
  return (
    <div className="w-[400px] h-[350px] bg-white rounded-md shadow-md p-3 flex flex-col gap-2" onClick={() => navigate('/products/details', {state: data }) }>
      {/* Image */}
      <div className="w-full h-[200px] bg-[#f7f7f7] rounded-md flex items-center justify-center">
        <img
          src={data.image}
          alt={data.name}
          className="max-h-[170px] w-full object-cover"
        />
      </div>

      {/* Name + Price */}
      <div className="flex justify-between items-center mt-1">
        <h3 className="text-[16px] uppercase font-semibold">{data.name}</h3>
        <p className="text-[15px] font-medium">₹{singlePrice}</p>
      </div>

      {/* Color Dots */}
      {data.colors?.length > 0 && (
        <div className="flex gap-2 mt-[2px]">
          {data.colors.map((color, index) => (
            <span
              key={index}
              className="w-[16px] h-[16px] rounded-full border border-gray-400"
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </div>
      )}

      {/* Offer Tag */}
      <div className="mt-1">
        <div className="text-[13px] font-medium text-[#025943] bg-[#C6FFE2] px-2 py-[6px] w-fit">
          {offerText}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
