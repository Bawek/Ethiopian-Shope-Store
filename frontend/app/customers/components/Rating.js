'use client'
// components/Rating.js
import { useState } from 'react';

const Rating = ({
  rating = 0,
  onRatingChange,
  size = 24,
  readOnly = false,
  maxStars = 5
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const getStarFill = (index) => {
    const effectiveRating = hoverRating || rating;
    const integerPart = Math.floor(effectiveRating);
    const decimalPart = effectiveRating - integerPart;

    if (index < integerPart) return 100;
    if (index === integerPart && decimalPart > 0) return decimalPart * 100;
    return 0;
  };

  const handleClick = (index, position) => {
    if (!readOnly && onRatingChange) {
      const newRating = position === 'half' ? index + 0.5 : index + 1;
      onRatingChange(newRating);
    }
  };

  const Star = ({ index }) => (
    <div 
      className="relative cursor-pointer"
      onMouseEnter={!readOnly ? () => setHoverRating(index + 1) : undefined}
      onMouseLeave={!readOnly ? () => setHoverRating(0) : undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`${!readOnly ? 'hover:scale-110' : ''} transition-transform`}
        width={size}
        height={size}
      >
        {/* Full star background */}
        <path
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          fill="currentColor"
          className="text-gray-300 dark:text-gray-600"
        />
        
        {/* Filled part */}
        <path
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          fill="currentColor"
          className="text-yellow-400"
          style={{ clipPath: `inset(0 ${100 - getStarFill(index)}% 0 0)` }}
        />
      </svg>
      
      {!readOnly && (
        <div className="absolute inset-0 flex">
          <button
            type="button"
            className="w-1/2 h-full"
            aria-label={`Rate ${index + 0.5} stars`}
            onClick={() => handleClick(index, 'half')}
          />
          <button
            type="button"
            className="w-1/2 h-full"
            aria-label={`Rate ${index + 1} stars`}
            onClick={() => handleClick(index, 'full')}
          />
        </div>
      )}
    </div>
  );

  return (
    <div 
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Product rating"
    >
      {[...Array(maxStars)].map((_, index) => (
        <Star key={index} index={index} />
      ))}
      <span className="sr-only">Rating: {rating} out of {maxStars} stars</span>
    </div>
  );
};

export default Rating;