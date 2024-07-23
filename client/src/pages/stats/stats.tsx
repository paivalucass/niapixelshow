import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from '@mui/material'
import useStats from '@/hooks/useStats';
import { withProtectedRoute } from '@/components';
import { useRouter } from 'next/router';

const StatsPage: React.FC = () => {
    const { statsData, getStats, loading, error } = useStats();

    const [year, setYear] = useState<string>('0000');
    const [month, setMonth] = useState<string>('01');
    const [tableText, setTableText] = useState<string>('Estatísticas de produtos - Total');
    var index = 0;

    useEffect(() => {
        getStats(year, month);
    }, []);

    const applyFilter = () => (
        getStats(year, month),
        setTableText(`Estatísticas de produtos - ${year}-${month}`)
    );

    const resetFilter = () => (
        setYear('0000'),
        getStats('0000', month),
        setTableText(`Estatísticas de produtos - Total`)
    );

    const filterButton = () => {
        if (year != '0000') {
            return (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => applyFilter()}
                >
                    Filtrar
                </Button>
            )
        }
        else {
            return (
                <Button
                    variant="contained"
                    color="primary"
                >
                    Filtrar
                </Button>
            )
        }
    };

    const drawTable = () => {
        return (
            <TableContainer component={Paper} sx={{ boxShadow: 'none', border: 'none' }}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell sx={{ textAlign: 'center'}}>Produto</TableCell>
                        <TableCell sx={{ textAlign: 'center'}}>Quantidade</TableCell>
                        <TableCell sx={{ textAlign: 'center'}}>Valor total</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {statsData?.productName.map((statName, index) => (
                        <TableRow key={statName}>
                        <TableCell sx={{ textAlign: 'center'}}>{statName}</TableCell>
                        <TableCell sx={{ textAlign: 'center'}}>{statsData.productAmount[index]}</TableCell>
                        <TableCell sx={{ textAlign: 'center'}}>{statsData.productValue[index]}</TableCell>
                        </TableRow>
                    ))}
        </TableBody>
                </Table>
            </TableContainer>
        )
    };

    return (
        <Container maxWidth="lg" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', p: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Estatísticas
            </Typography>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'left', color: 'text.primary', mb: 1, mt: 1, fontSize: 30 }}>
                    Vendas totais
                </Typography>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '400', textAlign: 'left', color: 'text.primary', mb: 1, mt: 2, fontSize: 20 }}>
                    R$ { statsData?.totalValue },00
                </Typography>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'left', color: 'text.primary', mb: 1, mt: 1, fontSize: 30 }}>
                    Produto mais vendido
                </Typography>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '400', textAlign: 'left', color: 'text.primary', mb: 1, mt: 2, fontSize: 20 }}>
                    { statsData?.mostSold }
                </Typography>
            </Grid>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={2}>
                    <InputLabel>Ano</InputLabel>
                    <TextField
                        name='Ano'
                        variant="outlined"
                        fullWidth
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2}>
                    <InputLabel>Mês</InputLabel>
                    <Select
                        name="Mes"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        label="Mês"
                    >
                        <MenuItem value="01">01</MenuItem>
                        <MenuItem value="02">02</MenuItem>
                        <MenuItem value="03">03</MenuItem>
                        <MenuItem value="04">04</MenuItem>
                        <MenuItem value="05">05</MenuItem>
                        <MenuItem value="06">06</MenuItem>
                        <MenuItem value="07">07</MenuItem>
                        <MenuItem value="08">08</MenuItem>
                        <MenuItem value="09">09</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="11">11</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={2} sx={{ mt: 5 }}>
                    { filterButton() }
                </Grid>
                <Grid item xs={2} sx={{ mt: 5 }}>
                    <Button
                        id='resetButton'
                        variant="outlined"
                        color="primary"
                        onClick={() => resetFilter()}
                    >
                        reset
                    </Button>
                </Grid>
            </Grid>
            <Container maxWidth="lg" sx={{ backgroundColor: "#DA0037", borderRadius: '1rem', p: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom id='tableText' sx={{ fontWeight: '700', textAlign: 'left', color: '#EDEDED', mb: 1, mt: 1, fontSize: 20 }}>
                { tableText }
            </Typography>
                {drawTable()}
            </Container>
        </Container>
    );
};

export default StatsPage;