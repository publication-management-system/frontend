import React from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";

import { login } from "./api";

import styles from "./login-form.module.css";

interface Props {
    onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: Props): React.JSX.Element {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (values: FieldValues) => {
        const response = await login(values.email as string, values.password as string);
        const accessToken = response.accessToken;

        if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            onLoginSuccess();
        }
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("email", { required: true })} placeholder={"Email"} />
            <Input {...register("password", { required: true })} type={"password"} placeholder={"Password"} />

            <Button type="submit">Login</Button>
        </form>
    );
}
