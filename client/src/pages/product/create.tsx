import React, { useState } from 'react';
import { Box, Container, Snackbar, Alert } from '@mui/material';
import ProductForm from '@/components/ProductForm';
import { useProduct } from '@/hooks';
import { useRouter } from 'next/router';

// Componente de página para criar um novo produto
const CreateProductPage: React.FC = () => {
  const router = useRouter(); // Hook do Next.js para roteamento
  const { createProduct } = useProduct(); // Hook personalizado para criar um produto

  // Estados para controlar o Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success");

  // Função para lidar com o fechamento do Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Função de callback para lidar com o envio do formulário
  const handleSubmit = (data: any) => {
    // Chama a função createProduct e, em seguida, redireciona para a página de produtos
    createProduct(data).then(() => {
      setSnackbarSeverity("success")
      setSnackbarMessage('Produto cadastrado com sucesso!');
      setSnackbarOpen(true);
      setTimeout(() => {
        router.push(`/product`);
      }, 2000);
    }).catch(()=>{
      setSnackbarSeverity("error");
      setSnackbarMessage('Não foi possível cadastrar o produto!');
      setSnackbarOpen(true);
    })
  };

  return (
    <Container maxWidth="md"> {/* Define a largura máxima do container */}
      <Box mt={4}> {/* Define a margem superior */}
        {/* Componente ProductForm que renderiza o formulário para criar um produto */}
        <ProductForm onSubmit={handleSubmit} />
      </Box>
      {/* Snackbar para exibir mensagens de sucesso */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateProductPage;
