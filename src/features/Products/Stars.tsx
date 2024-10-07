interface StarsProps {
    rating: number;
  }
  
  export const Stars: React.FC<StarsProps> = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
  
    return (
      <div className="flex">
        {[...Array(totalStars)].map((_, index) => {
          if (index < filledStars) {
            return <span key={index} className="text-purple-500 text-xl">★</span>; 
          } else if (index === filledStars && halfStar) {
            return <span key={index} className="text-purple-500 text-xl">☆</span>; 
          } else {
            return <span key={index} className="text-gray-400 text-xl">☆</span>; 
          }
        })}
      </div>
    );
  };