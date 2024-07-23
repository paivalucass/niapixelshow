import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Container, Snackbar, Alert } from '@mui/material';
import ProductForm from '@/components/ProductForm';
import { useProduct } from '@/hooks';

// Componente de página para editar um produto existente
const EditProductPage: React.FC = () => {
  const router = useRouter(); // Hook do Next.js para roteamento
  const { id } = router.query; // Obtém o ID do produto a partir da URL

  const { productData, getProductById, updateProduct, deleteProduct } = useProduct(); // Hook personalizado para manipulação de produtos

  // Estados para controlar o Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // useEffect para buscar os dados do produto quando o ID estiver disponível
  useEffect(() => {
    if (id && typeof id === "string") {
      getProductById(id); // Busca os dados do produto pelo ID
    }
  }, [id]);

  // Função de callback para lidar com o envio do formulário
  const handleSubmit = (data: any) => {
    if (id && typeof id === "string") {
      updateProduct(id, data).then(() => {
        setSnackbarMessage('Produto salvo com sucesso!');
        setSnackbarOpen(true);
        setTimeout(() => {
          router.push(`/product`);
        }, 2000);// Redireciona para a página de produtos após a atualização
      });
    }
  };


  // Função para fechar o Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md"> {/* Define a largura máxima do container */}
      <Box mt={4}> {/* Define a margem superior */}
        {productData ? (
          // Renderiza o formulário de produto com os dados existentes
          <ProductForm onSubmit={handleSubmit} edit productData={productData} />
        ) : (
          // Exibe uma mensagem de carregamento enquanto os dados do produto estão sendo buscados
          <Typography>Carregando...</Typography>
        )}
      </Box>
      {/* Snackbar para exibir mensagens de sucesso */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditProductPage;
