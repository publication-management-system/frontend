import React, {useState} from "react";
import {LoginPageLayout} from "../../../layouts/loginpage/loginpagelayout.tsx";
import {Card} from "../../../components/card/card.tsx";
import {Input} from "../../../components/input/input.tsx";
import {Button} from "../../../components/button/button.tsx";
import {Form} from "../../../components/form/form.tsx";
import {useNavigate} from "react-router-dom";
import './loginpage.css'
import {client} from "../../../data/client.ts";



export const LoginPage = (): React.JSX.Element => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = async () => {
        const resp =  await client.post("/session/login", {email : email,password: password,})
            .then(response => response.data)

        const accessToken = resp.accessToken;

        if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            navigate('/app/dashboard');
        }
    }

    return (
        <LoginPageLayout className="gradient-background">
            <Card className="logincard">
                <div className="login-card-title">
                    <h1>Publication Management System</h1>
                    <h2>Log in to your account</h2>
                </div>
                <Form onSubmit={login}>
                    <Input value={email} label={'email'} type={'email'} onChange={(val) => setEmail(val.target.value)} />
                    <Input value={password} label={'password'} type={'password'} onChange={(val) => setPassword(val.target.value)} />

                    <Button>Login</Button>
                </Form>
            </Card>
        </LoginPageLayout>
    )
}