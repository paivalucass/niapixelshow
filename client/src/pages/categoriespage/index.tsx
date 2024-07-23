import React, { useState, useEffect } from 'react';
import { useCategories } from '../../hooks';
import { Box, Button, Container, TextField, Typography, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBack';
import styles from './categoriespage.module.css';

const CategoriesPage: React.FC = () => {
    const {
        categoryData,
        categories,
        createCategory,
        updateCategory,
        getCategoryByName,
        deleteCategory,
        getAllCategories,
        loading,
        error,
        resetError,
    } = useCategories();

    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [isCreating, setIsCreating] = useState(false); // estado para controlar a tela de criação
    const [isEditing, setIsEditing] = useState(false); // estado para controlar a tela de edição
    const [editCategoryName, setEditCategoryName] = useState('');
    const [editCategoryDescription, setEditCategoryDescription] = useState('');
    const [originalCategoryName, setOriginalCategoryName] = useState(''); // variável para armazenar o nome original da categoria

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState('');

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        getAllCategories(); // carregar categorias ao iniciar
    }, [getAllCategories]);

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) {
            setSnackbarMessage('O nome da categoria é obrigatório!');
            setSnackbarOpen(true);
            return;
        }

        await createCategory({ name: newCategoryName, description: newCategoryDescription });
        setNewCategoryName('');
        setNewCategoryDescription('');
        setIsCreating(false); // esconder a tela de criação após criar a categoria
        await getAllCategories(); // atualizar lista de categorias
    };

    const handleUpdateCategory = async () => {
        if (!editCategoryName.trim()) {
            setSnackbarMessage('O nome da categoria é obrigatório!');
            setSnackbarOpen(true);
            return;
        }

        await updateCategory(originalCategoryName, { name: editCategoryName, description: editCategoryDescription });
        setEditCategoryName('');
        setEditCategoryDescription('');
        setIsEditing(false);
        await getAllCategories();
    };

    const handleDeleteCategory = async (categoryName: string) => {
        await deleteCategory(categoryName);
        await getAllCategories();
    };

    const handleEditClick = (categoryName: string, categoryDescription: string) => {
        setOriginalCategoryName(categoryName);
        setEditCategoryName(categoryName);
        setEditCategoryDescription(categoryDescription);
        setIsEditing(true);
    };

    const handleOpenDeleteDialog = (categoryName: string) => {
        setCategoryToDelete(categoryName);
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setCategoryToDelete('');
    };

    const handleConfirmDelete = async () => {
        await handleDeleteCategory(categoryToDelete);
        handleCloseDeleteDialog();
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleGoBack = () => {
        window.history.back();
      };      

      return (
        <Container maxWidth="md" className={styles.container}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={handleGoBack}>
                    <ArrowBackIosIcon sx={{ color: 'black' }}/>
                </IconButton>
                <Typography variant="h4" component="h1" sx={{ fontWeight: '700', textAlign: 'center', color: 'text.secondary', flexGrow: 1 }}>
                Gerenciamento de Categorias
                </Typography>
            </Box>

            {loading && <Typography>Carregando...</Typography>}
            {error && (
                <Box className={styles.error}>
                    <Typography>Erro: {error}</Typography>
                    <Button variant="contained" color="error" className={styles.button} onClick={resetError}>Resetar Erro</Button>
                </Box>
            )}

            <Box className={styles.categoryList}>
                <Typography variant="h5" component="h2">Categorias</Typography>
                <ul>
                    {categories.map((category) => (
                        <li className={styles.listItem} key={category.name}>
                            <Typography variant="h6">{category.name}</Typography>
                            <Typography>{category.description}</Typography>
                            <Button variant="contained" color="primary" onClick={() => handleEditClick(category.name, category.description || '')}data-cy = {`id-edit-${category.name}`}>Editar</Button>
                            <Button variant="contained" color="secondary" sx={{ ml: 1, borderRadius: '10px' }} onClick={() => handleOpenDeleteDialog(category.name)}data-cy = {`id-delete-${category.name}`}>Excluir</Button> 
                        </li>
                    ))}
                </ul>
            </Box>

            <Box className={styles.createCategory}>
                <Button variant="contained" color="primary" onClick={() => setIsCreating(!isCreating)}>
                    {isCreating ? 'Cancelar' : 'Criar Categoria'}
                </Button>
                {isCreating && (
                    <Box className={styles.createForm}>
                        <Typography variant="h6" component="h2">Nova Categoria</Typography>
                        <TextField
                            name="Nome da Categoria"
                            className={styles.inputField}
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            label="Nome da Categoria"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                style: { paddingLeft: '4px', paddingRight: '4px', background: '#fff' }
                            }}
                            InputProps={{
                                style: { padding: '2px' }
                            }}
                        />
                        <TextField
                            className={styles.inputField}
                            type="text"
                            value={newCategoryDescription}
                            onChange={(e) => setNewCategoryDescription(e.target.value)}
                            label="Descrição (opcional)"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                                style: { paddingLeft: '4px', paddingRight: '4px', background: '#fff' }
                            }}
                            InputProps={{
                                style: { padding: '2px' }
                            }}
                        />
                        <Button variant="contained" color="primary" onClick={handleCreateCategory}>
                            Criar
                        </Button>
                    </Box>
                )}
            </Box>

            {isEditing && (
                <Box className={styles.editCategory}>
                    <Typography variant="h6" component="h2" className={styles.editHeader}>Editar Categoria</Typography>
                    <TextField
                        name="Nome da Categoria Novo"
                        className={styles.inputField}
                        label="Nome da Categoria"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                            style: { paddingLeft: '4px', paddingRight: '4px', background: '#fff' } 
                        }}
                        InputProps={{
                            style: { padding: '2px' }
                        }}
                    />
                    <TextField
                        className={styles.inputField}
                        label="Descrição (opcional)"
                        value={editCategoryDescription}
                        onChange={(e) => setEditCategoryDescription(e.target.value)}
                        fullWidth
                        InputLabelProps={{
                            style: { paddingLeft: '4px', paddingRight: '4px', background: '#fff' }
                        }}
                        InputProps={{
                            style: { padding: '2px' }
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdateCategory}>
                        Salvar
                    </Button>
                    <Button variant="outlined" color="secondary" sx={{ ml: 1, borderRadius: '10px' }} onClick={() => setIsEditing(false)}>
                        Cancelar
                    </Button>
                </Box>
            )}

            <Dialog
                open={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar Exclusão"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza de que deseja excluir a categoria {categoryToDelete}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary" sx={{ borderRadius: '10px' }}>
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} data-cy = "tag" color="secondary" variant="contained" autoFocus sx={{ borderRadius: '10px' }}>
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} data-cy = "error-tag" severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CategoriesPage;