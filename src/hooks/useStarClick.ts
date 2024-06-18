import { useState, MouseEvent } from "react";

const useStarClick = () => {
  const [clicked, setClicked] = useState<Set<number>>(new Set());

  const handleStarClick = (event: MouseEvent, id: number) => {
    event.stopPropagation();
    setClicked((prevClicked) => {
      const newClicked = new Set(prevClicked);
      if (newClicked.has(id)) {
        newClicked.delete(id);
      } else {
        newClicked.add(id);
      }
      return newClicked;
    });
  };

  return { clicked, handleStarClick };
};

export default useStarClick;
