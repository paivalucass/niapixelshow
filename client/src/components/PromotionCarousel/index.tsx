import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect } from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";
import PromotionCard from "../PromotionCard";
import useProduct from "@/hooks/useProduct";

const PromotionCarousel: React.FC = () => {
  const { products, getAllProducts, loading, error } = useProduct();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro: {error}</p>;
  }

  // Filtra os produtos onde promotionId é diferente de null
  const filteredProducts = products.filter((product) => product.promotionId !== null && product.promotionId !== undefined && product.promotionId !== "");
  const settings = {
    infinite: filteredProducts.length > 1,
    speed: 500,
    slidesToShow: (filteredProducts.length > 1) ? 2 : filteredProducts.length,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: filteredProducts.length > 1 ? 2 : filteredProducts.length,
          slidesToScroll: 1,
          infinite: filteredProducts.length > 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Slider {...settings}>
        {filteredProducts.map((product) => (
          <PromotionCard
            key={product.id} // Adicione a propriedade key aqui
            promotionId={product.promotionId}
            name={product.name}
            price={product.price}
            //discount={product.discount}
            image={product.image}
            onClick={() => console.log(`Produto ${product.name} clicado!`)}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default PromotionCarousel;
