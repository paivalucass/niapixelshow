import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { PromotionCarousel } from "@/components";

const Promotions: React.FC = () => {
  const router = useRouter();

  const handleCreatePromotion = () => {
    router.push("/admin/promotions/create");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <h1>ADMIN</h1>
      <PromotionCarousel />
      <Button
        style={{
          backgroundColor: "#FFFFFF",
          color: "#121212",
          fontWeight: 800,
        }}
        variant="contained"
        onClick={handleCreatePromotion}
      >
        Cadastrar nova promoção
      </Button>
    </div>
  );
};

export default Promotions;
