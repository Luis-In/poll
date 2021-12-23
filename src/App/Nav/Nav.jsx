import { useState } from "react"; 
import { Link } from "react-router-dom";
import useStyles from "./NavStyle"
import { AppBar, Container, Toolbar, Box, Menu, MenuItem, Typography, Button, IconButton} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

const Nav = () => {
    const classes = useStyles()
    const pages = ["socios", "eventos"]
    const [anchorElNav, setAnchorElNav] = useState(null)
    
    function handleOpenNavMenu(e) {
        setAnchorElNav(e.currentTarget)
    }
    function handleCloseNavMenu() {
        setAnchorElNav(null)
    }

    return (
        <>
        <AppBar position="static" style={{backgroundColor: "#272727"}} enableColorOnDark="true">
            <Container maxWidth="xl">
                <Toolbar disableGutters className={classes.nav}>
                    <Box sx={{flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
                        <IconButton
                            size="large"
                            aria-label="Menu de navegación"
                            aria-controls="Nav-menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu} 
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                              display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {
                                pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))
                            }
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {
                            pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))
                        }
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{mr: 2, display: { xs: 'flex' }}}
                    >
                        Club Social Progreso
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
        </>
    );
}
 
export default Nav;