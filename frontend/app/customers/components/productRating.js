'use client'
import { useState } from 'react';

const Rating = ({ product, isInteractive = false, onRate }) => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleStarClick = (index) => {
        if (isInteractive) {
            setSelectedRating(index + 1);
            onRate?.(index + 1);
        }
    };

    const currentRating = isInteractive
        ? hoverRating || selectedRating
        : Math.round(product?.rating?.rate || 0);

    return (
        <div className="flex items-center mt-2 mb-4">
            {[...Array(5)].map((_, index) => (
                <button
                    key={index}
                    type="button"
                    className={`p-1 ${isInteractive ? "cursor-pointer" : "cursor-default"}`}
                    onClick={() => handleStarClick(index)}
                    onMouseEnter={() => isInteractive && setHoverRating(index + 1)}
                    onMouseLeave={() => isInteractive && setHoverRating(0)}
                    disabled={!isInteractive}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={index < currentRating ? "#fbbf24" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-5 h-5 ${index < currentRating ? "text-yellow-400" : "text-gray-300"
                            } transition-colors duration-150`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 17.25L18.18 21l-1.64-7.03L22 9.25l-7.19-.61L12 2.25l-2.81 6.39L2 9.25l5.46 4.72L5.82 21z"
                        />
                    </svg>
                </button>
            ))}
            {product?.rating && (
                <span className="ml-2 text-sm text-gray-500">
                    ({isInteractive ? selectedRating || product.rating.rate : product.rating.rate})
                </span>
            )}
        </div>
    );
};

// Usage in your Next.js page/components
export default function ProductCard() {
    const handleRate = (rating) => {
        console.log('User rated:', rating);
        // Add your rating submission logic here
    };

    return (
        <div className="p-4">
            {/* Product content */}
            <Rating
                product={{ rating: { rate: 4.5, count: 120 } }}
                isInteractive={true}
                onRate={handleRate}
            />
            {/* Rest of product content */}
        </div>
    );
}