import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import ProductCarousel from '@/components/ProductCarouselAdmin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link'; 
import { useRouter } from 'next/router';

// Componente da página de produtos
const ProductPage: React.FC = () => {
  const router = useRouter();
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
            <IconButton 
              onClick={() => router.push('/home/admin')} // Redireciona para a página de produtos
              sx={{ mr: 2, color: 'white', '&:hover': { backgroundColor: 'rgba(255, 0, 0, 0.5)' } }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
      <Typography variant="h4" gutterBottom  sx={{ color:'white', padding: 2, textAlign: 'center', fontWeight: 'bold' }}>Produtos</Typography>
      <ProductCarousel />
      <Link href="/product/create" passHref>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ display: 'block', margin: '50px auto' }} // Centering the button
      >
        Cadastrar Produto
      </Button>
      </Link>
    
    </Box>
  );
};


export default ProductPage;
