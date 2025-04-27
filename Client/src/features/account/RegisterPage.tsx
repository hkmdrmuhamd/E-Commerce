import { useAppDispatch } from "../../store/store";
import { LockOutline } from "@mui/icons-material";
import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form"
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import request from "../../api/request";
import { toast } from "react-toastify";

export default function RegisterPage() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate(); //Kullanıcıyı yönlendirmek için kullanılır
    
    const { register, handleSubmit, setError, formState: {errors, isSubmitting, isValid} } = useForm({
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
        mode: "onTouched" //Bu yapı sayesinde kullanıcı içeriği dolduruken gerekli kurallara göre doldurmazsa butona tıklamadan önce uyarı mesajlarını görür.
    });

    async function submitForm(data: FieldValues) {
        request.Account.register(data)
            .then(() => {
                toast.success("user created.");
                navigate("/login")
            })
            .catch(error => {
                const { data } = error;
                data.forEach((errors:any) => {
                    if(errors.code == "DuplicateUserName")
                        setError("username", {message: errors.description});
                    else if(errors.code == "DuplicateEmail")
                        setError("email", {message: errors.description});
                })
            });
    }

    return (
        <Container maxWidth="xs">
            <Paper sx={{marginTop:8, padding: 2}} elevation={3}>
                <Avatar sx={{ mx: "auto", color: "secondary.main", textAlign: "center", mb: 1 }}>
                    <LockOutline />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ textAlign: "center"}}>Register</Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt: 2}}>
                    <TextField 
                        {...register("name",{ required: "name is required" })}
                        label="Enter your Full Name" 
                        fullWidth autoFocus 
                        sx={{ mb: 2 }} 
                        size="small"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    ></TextField>
                    <TextField 
                        {...register("username",{ required: "username is required" })}
                        label="Enter username" 
                        fullWidth 
                        sx={{ mb: 2 }} 
                        size="small"
                        error={!!errors.username} //ilk ! olmadığı durum geçerli olsun anlamına gelmektedir yani klasik if(!errors.username) buranın başına ikinci !'i koyunca bu ifadenin boolean tipinde true ya da false yazılmasını sağlıyoruz yani şöyle olur !!errors.username = true ya da false olacak
                        helperText={errors.username?.message}
                    ></TextField>
                    <TextField 
                        {...register("email",{ 
                            required: "email is required", 
                            pattern: {
                                value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                                message: "Email is not valid."
                            }
                        })}
                        label="Enter email" 
                        fullWidth 
                        sx={{ mb: 2 }} 
                        size="small"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    ></TextField>
                    <TextField 
                        {...register("password",{ required: "password is required", minLength: {
                            value: 6,
                            message: "Min length is 6 characters"
                        } })}
                        label="Enter password" 
                        type = "password" 
                        fullWidth 
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
                        Register
                    </LoadingButton>
                </Box>
            </Paper>
        </Container>
    );
}