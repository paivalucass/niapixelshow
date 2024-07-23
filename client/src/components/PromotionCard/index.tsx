import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePromotion } from "@/hooks";
import { useRouter } from "next/router";

interface Props {
  name: string;
  price: number;
  discount?: number;
  image?: string;
  promotionId?: string; // Updated from id to promotionId
  onClick: () => void;
}

const PromotionCard: React.FC<Props> = ({
  name,
  price,
  discount,
  image,
  promotionId,
  onClick,
}) => {
  const router = useRouter();
  const { deletePromotion, promotionData } = usePromotion();

  const handleDelete = () => {
    if (promotionId) {
      deletePromotion(promotionId).then(() => {
        router.reload();
      });
    }
  };

  const handleEdit = () => {
    router.push(`/admin/promotions/edit/${promotionId}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {image && (
        <CardMedia component="img" height="140" image={image} alt={name} />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Preço: R${price.toFixed(2)}
        </Typography>
        {discount && (
          <Typography variant="body2" color="text.secondary">
            Desconto: {discount}%
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Link href={`/admin/promotions/edit/${promotionId}`} passHref>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            onClick={handleEdit}
          >
            Editar
          </Button>
        </Link>
        <Button
          size="small"
          color="error"
          variant="contained"
          onClick={handleDelete}
        >
          Excluir
        </Button>
      </CardActions>
    </Card>
  );
};

export default PromotionCard;
