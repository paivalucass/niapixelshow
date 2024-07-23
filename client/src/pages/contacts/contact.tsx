import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper } from '@mui/material'
import useStats from '@/hooks/useStats';
import { withProtectedRoute } from '@/components';
import { useRouter } from 'next/router';

const ContactsPage: React.FC = () => {
    return (
        <Container maxWidth="sm" sx={{ backgroundColor: 'background.paper', borderRadius: '1rem', p: 4, boxShadow: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'center', color: 'text.primary', mb: 4, mt: 1 }}>
                Contatos
            </Typography>
            <Grid container spacing={1} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '700', textAlign: 'left', color: 'text.primary', mb: 1, mt: 1, fontSize: 20 }}>
                        Desenvolvedores
                    </Typography>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '400', textAlign: 'left', color: 'text.primary', mb: 1, mt: 1, fontSize: 15 }}>
                        enhr@cin.ufpe.br
                    </Typography>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '400', textAlign: 'left', color: 'text.primary', mb: 1, mt: 1, fontSize: 15 }}>
                        lfblcp@cin.ufpe.br
                    </Typography>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '400', textAlign: 'left', color: 'text.primary', mb: 1, mt: 1, fontSize: 15 }}>
                        tjgc@cin.ufpe.br
                    </Typography>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '400', textAlign: 'left', color: 'text.primary', mb: 1, mt: 1, fontSize: 15 }}>
                        nrc2@cin.ufpe.br
                    </Typography>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '400', textAlign: 'left', color: 'text.primary', mb: 1, mt: 1, fontSize: 15 }}>
                        vxq@cin.ufpe.br
                    </Typography>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '400', textAlign: 'left', color: 'text.primary', mb: 1, mt: 1, fontSize: 15 }}>
                        lacp@cin.ufpe.br
                    </Typography>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: '400', textAlign: 'left', color: 'text.primary', mb: 1, mt: 1, fontSize: 15 }}>
                        fml2@cin.ufpe.br
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ContactsPage;