import React, { useEffect, useRef ,useState} from "react";
// import bnnr1 from "../../assets/images/bnnr1.avif";
// import bnnr2 from "../../assets/images/bnnr2.avif";
// import bnnr3 from "../../assets/images/bnnr3.avif";
// import bnnr4 from "../../assets/images/bnnr4.avif";
// import bnnr5 from "../../assets/images/bnnr5.avif";

import bnr1 from '../../assets/images/banners/bnr1.png'
import bnr2 from '../../assets/images/banners/bnr2.png'
import bnr3 from '../../assets/images/banners/bnr3.png'
import bnr4 from '../../assets/images/banners/bnr4.png'
import bnr5 from '../../assets/images/banners/bnr5.png'
import bnr6 from '../../assets/images/banners/bnr6.png'
// import bnr7 from '../../assets/images/banners/bnr7.png'
// import bnr8 from '../../assets/images/banners/bnr8.png'
// import bnr9 from '../../assets/images/banners/bnr9.png'
// import bnr10 from '../../assets/images/banners/bnr10.png'


import { axiosInstance,API_URL } from "../../utils/axiosInstance";
export default function Banner() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scrollAmount = 0;

    const scrollInterval = setInterval(() => {
      const width = container.offsetWidth;

      // responsive scroll size
      let scrollStep = width;
      if (window.innerWidth >= 768) scrollStep = width / 2;
      if (window.innerWidth >= 1024) scrollStep = width / 3;

      scrollAmount += scrollStep;

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });

      if (scrollAmount >= container.scrollWidth / 2) {
        setTimeout(() => {
          container.scrollTo({
            left: 0,
            behavior: "auto",
          });
          scrollAmount = 0;
        }, 500);
      }
    }, 2000);

    return () => clearInterval(scrollInterval);
  }, []);

  const images = [bnr1,bnr2,bnr3
  ,bnr4,bnr5
  ,bnr6,
  ];
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(true)
  const allImages = [...banners, ...banners];
// console.log('ALL :',allImages)


  // Fetch banners
  const getBanners = async () => {
    try {
      const res = await axiosInstance.get('/homeBanner/getAllHomeBanner')
      setBanners(res.data.data || [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBanners()
  }, [])
  return (
    <div ref={containerRef} className="flex overflow-hidden w-full gap-1 ">
      {images.map((img, index) => (
  <img
    key={index}
    src={img}
    // src={`${API_URL}${img.homeBanner}`}
    // src={`http://localhost:8080/${img.homeBanner}`}
    alt={`Banner ${index + 1}`}
    className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 object-cover rounded-lg"
  />
))}
    </div>
  );
}