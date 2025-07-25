import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import ProductsNav from '../components/ProductsNav';

// Convert numeric size to label
const getSizeLabel = (size) => {
    const [lensWidth] = size.split('-').map(Number);
    if (lensWidth <= 47) return 'Small';
    if (lensWidth <= 51) return 'Medium';
    return 'Large';
};

// Render star rating as ★ and ☆ with decimals rounded to nearest half-star
const renderStars = (star) => {
    const fullStars = Math.floor(star);
    const halfStar = star - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <>
            {'⭐'.repeat(fullStars)}
            {halfStar && '½'}
            {'☆'.repeat(emptyStars)}
        </>
    );
};

const SingleProduct = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const containerRef = useRef();
    const imageRef = useRef();
    const detailsRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image entrance
            gsap.from(imageRef.current, {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            // Details block entrance
            gsap.from(detailsRef.current, {
                x: 100,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
            });

            // Animate text blocks inside details
            gsap.from('.detail-item', {
                opacity: 0,
                y: 20,
                stagger: 0.1,
                delay: 0.8,
                duration: 0.6,
                ease: 'power2.out',
            });

            // Animate color swatches
            gsap.from('.color-swatch', {
                scale: 0,
                opacity: 0,
                stagger: 0.1,
                delay: 1,
                duration: 0.4,
                ease: 'back.out(1.7)',
            });

            // Reviews section entrance
            gsap.from('.reviews-section', {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 1.2,
                ease: 'power2.out',
            });

            // Back button hover effect
            const button = document.querySelector('.back-btn');
            const onEnter = () => gsap.to(button, { scale: 1.05, duration: 0.2 });
            const onLeave = () => gsap.to(button, { scale: 1, duration: 0.2 });

            button.addEventListener('mouseenter', onEnter);
            button.addEventListener('mouseleave', onLeave);

            return () => {
                button.removeEventListener('mouseenter', onEnter);
                button.removeEventListener('mouseleave', onLeave);
            };
        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!state) {
        return (
            <div className="min-h-screen bg-[#f9f9f9]">
                <ProductsNav />
                <div className="p-6 text-center text-red-500 font-semibold">
                    Product not found.
                </div>
            </div>
        );
    }

    const {
        name,
        desc,
        image,
        price,
        size,
        colors,
        category,
        wearing,
        review = "No reviews yet.",
        reviewer = "Anonymous",
        totalReviews = 0,
        star = 0,
    } = state;

    return (
        <div
            ref={containerRef}
            className="min-h-screen w-full font-santoshi"
        >
            <ProductsNav />
            <div className="max-w-5xl mx-auto px-6 py-10 mt-6 bg-white rounded-xl shadow-xl flex flex-col md:flex-row gap-10 overflow-hidden">
                <div ref={imageRef} className="md:w-1/2 w-full">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-[400px] object-cover rounded-xl shadow-md"
                    />
                </div>

                <div ref={detailsRef} className="flex-1 flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-[#025943] mb-3">{name}</h2>
                        <p className="text-gray-600 mb-5 italic text-base">{desc}</p>

                        <p className="text-2xl font-semibold text-[#025943] mb-4">
                            ₹<span className="text-black">{price}</span>
                        </p>

                        <div className="text-sm space-y-2">
                            <div className="detail-item">
                                <strong className="text-gray-700">Category:</strong>{' '}
                                <span className="bg-gray-100 px-3 py-1 rounded-md capitalize">
                                    {category} glasses
                                </span>
                            </div>
                            <div className="detail-item">
                                <strong className="text-gray-700">For:</strong>{' '}
                                <span className="bg-gray-100 px-3 py-1 rounded-md capitalize">{wearing}</span>
                            </div>
                            <div className="detail-item">
                                <strong className="text-gray-700">Size:</strong>{' '}
                                <span className="bg-gray-100 px-3 py-1 rounded-md">{size}</span>
                                <span className="text-xs text-gray-500 ml-2">({getSizeLabel(size)})</span>
                            </div>
                            <div className="detail-item">
                                <strong className="text-gray-700">Colors:</strong>
                                <div className="flex gap-2 mt-2">
                                    {colors?.map((color, index) => (
                                        <span
                                            key={index}
                                            className="color-swatch w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                                            style={{ backgroundColor: color }}
                                            title={color}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="back-btn mt-8 px-6 py-3 bg-[#025943] text-white rounded-md hover:bg-[#014f3e] transition duration-300 w-fit"
                    >
                        ← Back to Products
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section max-w-5xl mx-auto mt-10 px-6 py-8 bg-white rounded-xl shadow-md">
                <h3 className="text-2xl font-semibold text-[#025943] mb-4">Customer Reviews</h3>
                <p className="text-gray-500 italic">
                    {renderStars(star)} ({star.toFixed(1)}/5 based on {totalReviews} reviews)
                </p>
                <div className="mt-4 text-gray-700 italic">
                    “{review}”
                    <br />
                    <span className="text-sm text-gray-500">— {reviewer}</span>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
