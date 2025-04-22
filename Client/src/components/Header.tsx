import { AppBar, Container, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" sx={{ mb:4 }}>
        <Toolbar>
            <Container>
                <Typography variant="h6">E-Commerce</Typography> {/*Yazı içeriği eklemek ve bunu özelleştirmek için Typography kullanılır*/}
            </Container>
        </Toolbar>
    </AppBar>
    
  )
}