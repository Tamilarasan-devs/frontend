import React, { useEffect, useRef ,useState} from "react";
import bnr1 from '../../assets/images/banners/bnr1.jpg'
import bnr2 from '../../assets/images/banners/bnr2.jpg'
import bnr3 from '../../assets/images/banners/bnr3.jpg'
import bnr4 from '../../assets/images/banners/bnr4.jpg'
import bnr5 from '../../assets/images/banners/bnr5.jpg'



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
  ];
  const [banners, setBanners] = useState([])
  console.log('banners :',banners)
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
      {allImages.map((img, index) => (
  <img
    key={index}
    // src={img}
    src={`${img.homeBanner}`}
    alt={`Banner ${index + 1}`}
    className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 object-cover rounded-lg"
  />
))}
    </div>
  );
}