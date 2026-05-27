import React, { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import type { RegisterData } from "../../data/user";

import { registerUser } from "./api";
import { RegisterStep, RegisterSteps } from "./register-steps";

import styles from "./register-form.module.css";

const defaultRegister: RegisterData = {
    email: "",
    firstName: "",
    institutionAddress: "",
    institutionEmailAddress: "",
    institutionName: "",
    institutionPhoneNumber: "",
    lastName: "",
    password: "",
    confirmPassword: "",
};

interface Props {
    onRegisterSuccess: () => void;
}

export const RegisterForm = ({ onRegisterSuccess }: Props): React.JSX.Element => {
    const [currentStep, setCurrentStep] = useState<number>(1);

    const { register, handleSubmit } = useForm<RegisterData>({
        defaultValues: defaultRegister,
    });

    const navigate = useNavigate();

    const handleNext = () => {
        setCurrentStep((currentStep) => Math.min(currentStep + 1, 3));
    };

    const handlePrev = () => {
        if (currentStep === 1) {
            navigate("/");
            return;
        }

        setCurrentStep((currentStep) => Math.max(currentStep - 1, 1));
    };

    const submitRegister = (data: FieldValues) => {
        const request = { ...data } as RegisterData;
        registerUser(request)
            .then(() => {
                onRegisterSuccess();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form onSubmit={handleSubmit(submitRegister)} className={styles.formContainer}>
            <RegisterSteps stepCount={3} currentStep={currentStep}>
                <RegisterStep label="Tell us about yourself" visible={currentStep === 1}>
                    <Input label="First Name" type="text" {...register("firstName")} />

                    <Input label="Last Name" type="text" {...register("lastName")} />
                </RegisterStep>

                <RegisterStep label="Where do you work?" visible={currentStep === 2}>
                    <Input label="Institution Name" type="text" {...register("institutionName")} />

                    <Input label="Institution Address" type="text" {...register("institutionAddress")} />

                    <Input label="Institution Email Address" type="email" {...register("institutionEmailAddress")} />

                    <Input label="Institution Phone Number" type="tel" {...register("institutionPhoneNumber")} />
                </RegisterStep>

                <RegisterStep label="Let's set up your credentials" visible={currentStep === 3}>
                    <Input label="Email" type="email" {...register("email")} />

                    <Input label="Password" type="password" {...register("password")} />

                    <Input label="Confirm Password" type="password" {...register("confirmPassword")} />
                </RegisterStep>
            </RegisterSteps>

            <div className={styles.registerStepActions}>
                <Button type="button" onClick={handlePrev}>
                    Previous
                </Button>

                <Button type="button" onClick={handleNext} className={currentStep === 3 ? styles.hidden : ""}>
                    Next
                </Button>

                <Button type="submit" className={currentStep === 3 ? "" : styles.hidden}>
                    Register
                </Button>
            </div>
        </form>
    );
};
