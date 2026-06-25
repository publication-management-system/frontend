import React, { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import type { AcceptInvitationDto, Invitation, RegisterData } from "../../data/user";

import { registerUserViaInvitation } from "./api";
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

export const RegisterInvitationForm = ({
    invitation,
    onRegisterSuccess,
}: {
    invitation: Invitation;
    onRegisterSuccess: () => void;
}): React.JSX.Element => {
    const [currentStep, setCurrentStep] = useState<number>(1);

    const { register, handleSubmit } = useForm<AcceptInvitationDto>({
        defaultValues: defaultRegister,
    });

    const navigate = useNavigate();

    const handleNext = () => {
        setCurrentStep((currentStep) => Math.min(currentStep + 1, 2));
    };

    const handlePrev = () => {
        if (currentStep === 1) {
            navigate("/");
            return;
        }

        setCurrentStep((currentStep) => Math.max(currentStep - 1, 1));
    };

    const submitRegister = (data: FieldValues) => {
        const request = { ...data } as AcceptInvitationDto;
        registerUserViaInvitation(request)
            .then(() => {
                onRegisterSuccess();
            })
            .catch((error: unknown) => {
                console.log(error);
            });
    };

    return (
        <form onSubmit={handleSubmit(submitRegister)} className={styles.formContainer}>
            <RegisterSteps stepCount={2} currentStep={currentStep}>
                <RegisterStep label="Tell us about yourself" visible={currentStep === 1}>
                    <Input label="First Name" type="text" required={true} {...register("firstName")} />

                    <Input label="Last Name" type="text" required={true} {...register("lastName")} />
                </RegisterStep>

                <RegisterStep label="Let's set up your credentials" visible={currentStep === 2}>
                    <Input label="Password" type="password" required={true} {...register("password")} />

                    <Input label="Confirm Password" type="password" required={true} {...register("confirmPassword")} />
                </RegisterStep>
            </RegisterSteps>

            <Input hidden type="text" defaultValue={invitation.id} {...register("invitationId")} />
            <Input hidden type="email" defaultValue={invitation.email} {...register("emailAddress")} />

            <div className={styles.registerStepActions}>
                <Button type="button" onClick={handlePrev}>
                    Previous
                </Button>

                <Button type="button" onClick={handleNext} className={currentStep === 2 ? styles.hidden : ""}>
                    Next
                </Button>

                <Button type="submit" className={currentStep === 2 ? "" : styles.hidden}>
                    Register
                </Button>
            </div>
        </form>
    );
};
