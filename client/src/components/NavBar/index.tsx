import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Tabs, Tab, Box, Container, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth, useUser } from "@/hooks";

const Navbar: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { authenticated, logout, loading, user } = useAuth();
  const { userData, getUserById } = useUser();
  const router = useRouter();

    useEffect(() => {
        if (user && user.uid) {
            getUserById(user.uid);
        }
    }, [user, getUserById]);
    

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

    const handleLogout = () => {
        logout();
        handleClose();
        router.push('/home/user');
    };

  const handleLogin = async () => {
    handleClose();
    await new Promise((resolve) => setTimeout(resolve, 100));
    router.push("/sign-in");
  };

  const handleProfile = () => {
    router.push("/profile");
    handleClose();
  };

  const handleOrders = () => {
    router.push(`/orders/user/${userData?.email}`);
    handleClose();
  };

    const handleCart = () => {
        if (user && user.uid) {
            router.push(`/cart/${user.uid}`);
        } else {
            router.push('/sign-in');
        }
    };
    const handleAdmin = () => {
        router.push('/admin');
        handleClose();
    }

  const isAdmin = () => {
    if (userData?.is_admin === true) {
      return true;
    } else {
      return false;
    }
  };

    return (
        <AppBar position="static" style={{ backgroundColor: '#DA0037', borderRadius: '1rem', marginTop: '2rem' }}>
            <Container maxWidth='lg'>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap component="div" sx={{ color: '#EDEDED', fontWeight: '700' }}>
                        niapixelshow
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                        <Tabs data-cy = {'select_navbar'} value={value} onChange={handleChange} sx={{
                            '& .MuiTab-root': {
                                color: '#EDEDED', 
                                fontWeight: 'regular', 
                                fontSize: '1rem',
                                mx: '1.3rem',
                                '&:hover': {
                                    color: '#FFFFFF',
                                    fontWeight: '600',
                                },
                            },
                            '& .Mui-selected': { 
                                fontWeight: '600', 
                                borderRadius: '6px',
                            },
                        }}>
                            <Tab label="Inicio" onClick={() => router.push('/')} disableRipple />
                            <Tab label="Sobre nós" onClick={() => router.push('/aboutuspage')} disableRipple />
                            <Tab label="Contato" onClick={() => router.push('/contacts/contact')} disableRipple />
                        </Tabs>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <IconButton aria-label="cart" sx={{ color: '#EDEDED' }} onClick={handleCart} data-cy="cart-icon">
                            <ShoppingCartIcon />

                        </IconButton>
                        <IconButton aria-label="account" sx={{ color: '#EDEDED' }} onClick={handleMenu}>
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: '#DA0037',
                                    color: '#EDEDED',
                                    borderRadius: '8px',
                                },
                                '& .MuiMenuItem-root': {
                                    py: '4px',
                                    px: '20px',
                                    borderRadius: '8px', 
                                    mx: '8px',
                                    '&:hover': {
                                        color: '#FFFFFF',
                                        backgroundColor: '#C3002F',
                                        borderRadius: '6px',
                                        fontWeight: '500',
                                    },
                                    fontWeight: '400',
                                    fontSize: '14px',
                                    justifyContent: 'center',
                                }
                            }}
                        >
                            {authenticated ? (
                                isAdmin() ? (
                                    <>
                                    <MenuItem onClick={handleProfile}>Perfil</MenuItem>
                                    <MenuItem onClick={handleAdmin}>Dashboard</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </>
                                ) : (
                                    <>
                                    <MenuItem onClick={handleProfile}>Perfil</MenuItem>
                                    <MenuItem onClick={handleOrders}>Pedidos</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </>
                                )
                            ) : (
                                <MenuItem onClick={handleLogin}>Login</MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
