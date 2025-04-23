import { Alert, AlertTitle, Button, Container, List, ListItem, ListItemText } from "@mui/material";
import request from "../../api/request";
import { useState } from "react";


export default function ErrorPage() {

    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    function getValidationErrors() {
    // API'den validasyon hatalarını almak için bir istek gönderiyoruz
    request.Errors.getValidationError()

        // Eğer istek başarılı olursa (örneğin backend bir hata dönmezse)
        .then(() => console.log("no validation")) // Konsola "no validation" yazdırıyoruz

        // Eğer istek başarısız olursa (yani validation hataları varsa)
        .catch(errors => setValidationErrors(errors)) 
        // Hataları state'e set ediyoruz ki kullanıcıya gösterebilelim
}


    return(
        <Container>
            {
                validationErrors.length > 0 && (
                    <Alert severity="error" sx={{mb:2}}>
                        <AlertTitle>Validation Errors</AlertTitle>
                        <List>
                           {
                            validationErrors.map((error, index) => (
                                <ListItem key={index}>
                                    <ListItemText>{error}</ListItemText>
                                </ListItem>
                            ))
                           } 
                        </List>
                    </Alert>
                )
            }
            <Button sx={{mr: 2}} variant="contained" onClick={() => request.Errors.get400Error().catch(error => console.log(error))}>400 Error</Button>
            <Button sx={{mr: 2}} variant="contained" onClick={() => request.Errors.get401Error().catch(error => console.log(error))}>401 Error</Button>
            <Button sx={{mr: 2}} variant="contained" onClick={() => request.Errors.get404Error().catch(error => console.log(error))}>404 Error</Button>
            <Button sx={{mr: 2}} variant="contained" onClick={() => request.Errors.get500Error().catch(error => console.log(error))}>500 Error</Button>
            <Button sx={{mr: 2}} variant="contained" onClick={getValidationErrors}>Validation Error</Button>
        </Container>
    );
}