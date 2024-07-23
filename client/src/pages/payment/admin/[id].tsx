import React, {  useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid, MenuItem, Select, InputLabel, FormControl  } from '@mui/material';
import useOrder from '@/hooks/useOrder';
import useUser from '@/hooks/useUser';
import useEmail from '@/hooks/useEmail';
import { withProtectedRoute } from '@/components';
import { useRouter } from 'next/router';
import { Order } from '@/types';

const OrderDetails: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const { orderData, getOrderById, updateOrder, loading, error } = useOrder();
    const { userData, getUserByEmail} = useUser();
    const { sendEmail } = useEmail();
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        const fetchOrder = async () => {
            await getOrderById(id as string);
        }
        fetchOrder()
    }, [id, getOrderById]);

    useEffect(() => {
        const fetchUser = async () => {
            if(orderData){
                await getUserByEmail(orderData.email as string);
            }
        }
        fetchUser()
    }, [orderData, getUserByEmail]);

    const handleConfirm = () => {
        updateOrder(id as string, {status: status});
        if(status === 'Pago'){
            sendEmail({order: orderData as Order, name: userData?.name as string, stat: 'Confirmação'}, orderData?.email as string)
        }
        else if(status === 'Erro no Pagamento'){
            sendEmail({order: orderData as Order, name: userData?.name as string, stat: 'Erro'}, orderData?.email as string)
        }
        router.back();
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', p: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" color="secondary" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', mb: 4, mt: 1 }}>
                Alterar Status do Pedido
            </Typography>
            {orderData && (
                <>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 4, mb: 1 }}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" color="secondary" sx={{ fontWeight: 600 }}>Nome:</Typography>
                        <Typography variant="body1" color="secondary">{userData?.name as string}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" color="secondary" sx={{ fontWeight: 600 }}>Email:</Typography>
                        <Typography variant="body1" color="secondary">{orderData.email}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" color="secondary" sx={{ fontWeight: 600 }}>Produto:</Typography>
                        <Typography variant="body1" color="secondary">{orderData.item}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" color="secondary" sx={{ fontWeight: 600 }}>Quantidade:</Typography>
                        <Typography variant="body1" color="secondary">{orderData.qtd}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" color="secondary" sx={{ fontWeight: 600 }}>Valor:</Typography>
                        <Typography variant="body1" color="secondary">{orderData.price}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body1" color="secondary" sx={{ fontWeight: 600 }}>Status:</Typography>
                        <Typography variant="body1" color="secondary">{orderData.status}</Typography>
                    </Box>
                </Box>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            label="Status"
                            data-cy={'select_status'}
                        >
                            <MenuItem value="Erro no Pagamento">Erro no Pagamento</MenuItem>
                            <MenuItem value="Aguardando Pagamento">Aguardando Pagamento</MenuItem>
                            <MenuItem value="Pago">Pago</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                </>
            )}
            <Box textAlign='left'>
                <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ mt: 2 }}>
                    Confirmar Alteração
                </Button>
            </Box>
        </Container>
    );
};

export default withProtectedRoute(OrderDetails);
