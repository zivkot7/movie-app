// "use client";
// import { useState } from "react";
// import styles from "./Carousel.module.css";

// const Carousel = ({ items }) => {
//   const [scrollPosition, setScrollPosition] = useState(0);

//   const scrollLeft = () => {
//     const container = document.getElementById("carousel-container");
//     setScrollPosition(scrollPosition - container.offsetWidth);
//     container.scrollLeft -= container.offsetWidth;
//   };

//   const scrollRight = () => {
//     const container = document.getElementById("carousel-container");
//     setScrollPosition(scrollPosition + container.offsetWidth);
//     container.scrollLeft += container.offsetWidth;
//   };

//   return (
//     <div className={styles.carousel}>
//       <div id="carousel-container" className={styles.container}>
//         {items.map((item, index) => (
//           <div key={index} className={styles.item}>
//             {item}
//           </div>
//         ))}
//       </div>
//       <button onClick={scrollLeft} className={styles.button}>
//         Previous
//       </button>
//       <button onClick={scrollRight} className={styles.button}>
//         Next
//       </button>
//     </div>
//   );
// };

// export default Carousel;
