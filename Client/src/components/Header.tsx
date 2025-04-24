import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Stack, Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const links = [
  { title: "Home", to: "/" },
  { title: "Catalog", to: "/catalog" },
  { title: "About", to: "/about" },
  { title: "Contact", to: "/contact" }, // contct yazmışsın lan, düzelttim
  { title: "Error", to: "/error" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    color: "text.primary"
  },
  "&.active": {
    color: "warning.main"
  } 
}

export default function Header() {
  const { cart } = useCartContext();
  //Sepetteki tüm ürünlerin adetlerini (quantity) toplayarak toplam ürün sayısını hesaplayalım:
  const itemCount = cart?.cartItems.reduce((total, item) => total + item.quantity, 0);//reduce() dizideki elemanları işleyerek tek bir değer üretir. Başlangıç değeri burada 0 olarak belirtilmiş.
  
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">E-Commerce</Typography>
          <Stack direction="row">
            {links.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                sx={navStyles}
              >
                {link.title}
              </Button>
            ))}
          </Stack>
        </Box>

        <Box>
          <IconButton component={Link} to="/cart" size="large" edge="start" color="inherit">
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}