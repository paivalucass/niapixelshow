import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  ButtonBase,
} from '@mui/material';
import { Product } from '@/hooks/useProduct';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  dataCy?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  dataCy,
}) => {
  if (!product) {
    return null;
  }

  const { name, price, image, promotion } = product;
  const oldPrice = promotion ? price / (1 - promotion.discount / 100) : price;

  return (
    <ButtonBase
      onClick={onClick}
      sx={{ display: 'block', textAlign: 'initial' }}
      data-cy={dataCy}
    >
      <Card sx={{ width: 200, borderRadius: 1.6, height: 280 }}>
        <CardMedia component='img' height='180' image={image} alt={name} />
        <CardContent style={{ height: '180' }}>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            fontSize={13}
            fontWeight={600}
          >
            {name}
          </Typography>
          {promotion ? (
            <Box>
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ textDecoration: 'line-through' }}
              >
                {`R$ ${oldPrice?.toFixed(2)}`}
              </Typography>
              <Typography color='green' fontWeight={600}>
                {`R$ ${price.toFixed(2)}`}
              </Typography>
            </Box>
          ) : (
            <Typography variant='body2' color='text.secondary'>
              {`R$ ${oldPrice?.toFixed(2)}`}
            </Typography>
          )}
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

export default ProductCard;
export type { ProductCardProps };