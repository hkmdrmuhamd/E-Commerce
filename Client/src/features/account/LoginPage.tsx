import { useAppDispatch } from "../../store/store";
import { LockOutline } from "@mui/icons-material";
import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form"
import { LoadingButton } from "@mui/lab";
import { loginUser } from "./accountSlice";
import { useNavigate } from "react-router";
import { getCart } from "../cart/cartSlice";

export default function LoginPage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate(); //Kullanıcıyı yönlendirmek için kullanılır
    
    const { register, handleSubmit, formState: {errors, isSubmitting, isValid} } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    async function submitForm(data: FieldValues) {
        await dispatch(loginUser(data));
        await dispatch(getCart());
        navigate("/catalog");
    }

    return (
        <Container maxWidth="xs">
            <Paper sx={{marginTop:8, padding: 2}} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <LockOutline />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center"}}>Login</Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt: 2}}>
                    <TextField 
                        {...register("username",{ required: "username is required" })}
                        label="Enter username" 
                        fullWidth required autoFocus 
                        sx={{ mb: 2 }} 
                        size="small"
                        error={!!errors.username} //ilk ! olmadığı durum geçerli olsun anlamına gelmektedir yani klasik if(!errors.username) buranın başına ikinci !'i koyunca bu ifadenin boolean tipinde true ya da false yazılmasını sağlıyoruz yani şöyle olur !!errors.username = true ya da false olacak
                        helperText={errors.username?.message}
                    ></TextField>
                    <TextField 
                        {...register("password",{ required: "password is required", minLength: {
                            value: 6,
                            message: "Min length is 6 characters"
                        } })}
                        label="Enter password" 
                        type = "password" 
                        fullWidth required 
                        sx={{ mb: 2 }} 
                        size="small"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    ></TextField>
                    <LoadingButton 
                        loading={isSubmitting}
                        disabled={!isValid} //Form valid olmadığı durumlarda buton çalışmasın
                        type="submit" 
                        variant="contained" 
                        fullWidth 
                        sx = {{ mt: 1 }}
                    >
                        Login
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    );
}