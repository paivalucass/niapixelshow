import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, IconButton, Snackbar, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { Product, useProduct } from '@/hooks';

// Componente de formulário de produto
const ProductForm: React.FC<{ onSubmit: (data: Product) => void, edit?: boolean, productData?: Product}> = ({ onSubmit, edit = false, productData, onDelete }) => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<Product>(productData ? productData : {
    name: '',
    description: '',
    price: 0,
    status: false,
    category: {
      name: '',
      description: ''
    }
  });
  
  // Estado para controlar a página do formulário (0: Formulário, 1: Upload de Foto)
  const [page, setPage] = useState(0);

  // Estados para controlar o Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success");
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();
  const { deleteProduct } = useProduct(); // Hook personalizado para operações de produto

  const validateForm = () => {
    let formErrors: any = {};
    if (!formData.name) formErrors.name = 'Nome é obrigatório';
    if (!formData.description) formErrors.description = 'Descrição é obrigatória';
    if (!formData.price) formErrors.price = 'Valor é obrigatório';
    if (!formData.category.name) formErrors.categoryName = 'Categoria é obrigatória';
    if (!formData.category.description) formErrors.categoryDescription = 'Descrição da categoria é obrigatória';
    if (formData.status === null || formData.status === undefined) formErrors.status = 'Disponibilidade é obrigatória';
    return formErrors;
  };

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;

    if (name?.startsWith('category.')) {
      const categoryField = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        category: {
          ...prevState.category,
          [categoryField]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name as string]: value });
    }

    setErrors({ ...errors, [name as string]: '' });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formData.status = (formData.status === "true");
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price.toString()),
      });
    } else {
      setErrors(formErrors);
      setSnackbarSeverity("warning")
      setSnackbarMessage('Por favor, preencha todos os campos obrigatórios.');
      setSnackbarOpen(true);
    }
  };

  // Função fictícia para lidar com o upload de fotos (a lógica real deve ser adicionada)
  const handleUpload = () => {
    console.log('Foto enviada!');
  };

  // Função para lidar com a exclusão do produto
  const handleDelete = () => {
    const id = router.query.id;
    if (id && typeof id === "string") {
      deleteProduct(id).then(() => {
        setSnackbarMessage('Produto excluído com sucesso!');
        setSnackbarOpen(true);
        setTimeout(() => {
          router.push(`/product`);
        }, 2000); // 2 segundos de atraso antes de redirecionar
      });
    }
  };

  // Função para fechar o Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ backgroundColor: 'white', mt: 4, p: 4, borderRadius: 1, boxShadow: 3, mx: 'auto' }}>
      {page === 0 ? (
        <>
          <Typography variant="h4" gutterBottom sx={{ padding: 2, textAlign: 'center', fontWeight: 'bold' }}>
            {edit ? "Editar Produto" : "Cadastrar Produto"}
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton 
              onClick={() => router.push('/product')} // Redireciona para a página de produtos
              sx={{ mr: 2, color: 'black', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Box display="flex" justifyContent="space-between" gap={2}>
            <TextField
              name="name"
              label="Nome"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="description"
              label="Descrição"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
          <Box display="flex" justifyContent="space-between" gap={2}>
            <TextField
              name="price"
              label="Valor"
              value={formData.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="category.name"
              label="Categoria"
              value={formData.category.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Box>
          <TextField
            name="category.description"
            label="Descrição da Categoria"
            value={formData.category.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Disponível</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem component="option" value={"true"}>Sim</MenuItem>
              <MenuItem component="option" value={"false"}>Não</MenuItem>
            </Select>
          </FormControl>
          <Box textAlign="center" mt={4}>
            <Button type="button" variant="contained" sx={{ backgroundColor: "black", color: "white" }} onClick={() => { setPage(1); }}>
              PRÓXIMO
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom sx={{ padding: 2, textAlign: 'center', fontWeight: 'bold' }}>
            Upload da Foto do Produto
          </Typography>
          <Box display="flex" alignItems="center" mb={2}>
            <IconButton 
              onClick={() => setPage(0)} // Volta para a página 0 (formulário de produto)
              sx={{ mr: 2, color: 'black', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Box mt={4} textAlign="center">
            <input type="file" accept="image/*" />
            <Button variant="contained" color="primary" onClick={handleUpload} sx={{ mt: 2 }}>
              Enviar Foto
            </Button>
            {!edit ? (
              <Box mt={2}>
                <Button type="submit" variant="contained" color="success" sx={{ mr: 2, mt: 20 }}>
                  Cadastrar Produto
                </Button>
              </Box>
            ) : (
              <Box mt={2}>
                <Button type="submit" variant="contained" color="success" sx={{ mr: 2, mt: 20 }}>
                  Salvar Produto
                </Button>
                <Button type="button" variant="contained" color="error" onClick={handleDelete} sx={{ mt: 20 }}>
                  Excluir Produto
                </Button>
              </Box>
            )}
          </Box>
        </>
      )}
      {/* Snackbar para exibir mensagens de sucesso */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductForm;
