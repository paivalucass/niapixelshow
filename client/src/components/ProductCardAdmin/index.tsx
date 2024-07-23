import React from 'react';
import { ProductCard } from '@/components';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useProduct } from '@/hooks';
import { useRouter } from 'next/router';
import { Product } from '@/hooks/useProduct';

interface Props {
  product: Product;
  onClick: () => void;
}

const ProductCardAdmin: React.FC<Props> = ({ product, onClick }) => {
  const router = useRouter();
  const { deleteProduct } = useProduct();

  const handleDelete = () => {
    if (product.id && typeof product.id === 'string') {
      deleteProduct(product.id).then(() => {
        router.reload();
      });
    }
  };

  if (!product) {
    return <p>Produto não encontrado</p>; // Ou retornar null ou um componente de loading
  }

  return (
    <div id="product-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <ProductCard
        product={product}
        onClick={onClick}
        dataCy={`product-card-${product.name}`}
      />
      <Link href={`/product/edit?id=${product.id}`} passHref>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'black', display: 'block', margin: '10px auto' }} // Centering the button
        >
          EDITAR PRODUTO
        </Button>
      </Link>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDelete}
        sx={{ display: 'block' }}
      >
        EXCLUIR PRODUTO
      </Button>
    </div>
  );
};

export default ProductCardAdmin;
