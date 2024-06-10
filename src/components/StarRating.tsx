import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Radio, HStack, Box } from "@chakra-ui/react";

interface StarRatingProps {
  rating: number;
  setRating: (value: number) => void;
  count?: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  setRating,
  count = 5,
  size = 20,
}) => {
  const [hover, setHover] = useState<number | null>(null);

  const handleRatingChange = (ratingValue: number) => {
    setRating(ratingValue);
  };

  return (
    <HStack spacing="2px">
      {[...Array(count)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= (hover ?? rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            cursor="pointer"
            transition="color 200ms"
          >
            <Radio
              name="rating"
              onChange={() => handleRatingChange(ratingValue)}
              value={ratingValue.toString()} // Convert number to string
              style={{ display: "none" }}
            />
            <FaStar size={size} />
          </Box>
        );
      })}
    </HStack>
  );
};

export default StarRating;
