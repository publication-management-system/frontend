import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Card} from "../../../components/card/card.tsx";
import {RegisterStep, RegisterSteps} from "../../../components/register/steps/registersteps.tsx";
import {Input} from "../../../components/input/input.tsx";
import {Button} from "../../../components/button/button.tsx";
import {LoginPageLayout} from "../../../layouts/loginpage/loginpagelayout.tsx";
import {client} from "../../../data/client.ts";

interface AcceptInvitationData {
    email: string;
    invitationId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

const defaultRegister: AcceptInvitationData = {
    invitationId: "", middleName: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: ""
}

const AcceptInvitationPage = (): React.JSX.Element => {

    const {invitationId} = useParams();

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [acceptInvitation, setAcceptInvitation] = useState<AcceptInvitationData>(defaultRegister);

    const navigate = useNavigate();

    const handleNext = () => {
        setCurrentStep((currentStep) => ((currentStep % 3) + 1));
    }

    const handlePrev = () => {
        if (currentStep == 1) {
            navigate('/');
        }
        setCurrentStep((currentStep) => (Math.max(currentStep - 1, 1)));
    }

    const onSubmit = async () => {

        const acceptInvitationDto: AcceptInvitationData = {
            ...acceptInvitation,
            invitationId: invitationId ?? ''
        }

        await client.post("/session/accept-invitation", {...acceptInvitationDto})
            .then(response => response.data)
            .catch(err => console.log(err));

        navigate("/login");
    }

    return (
        <LoginPageLayout className="gradient-background">
            <Card className="logincard register-card">
                <RegisterSteps stepCount={2} currentStep={currentStep}>
                    <RegisterStep label={'Tell us about yourself'} visible={currentStep == 1}>
                        <Input value={acceptInvitation.firstName} label={'First Name'} type={'text'} onChange={(val) => setAcceptInvitation({...acceptInvitation, firstName: val.target.value})}/>
                        <Input value={acceptInvitation.lastName} label={'Last Name'} type={'text'} onChange={(val) => setAcceptInvitation({...acceptInvitation, lastName: val.target.value})}/>
                    </RegisterStep>
                    <RegisterStep label={`Let's set up your credentials`} visible={currentStep === 2}>
                        <Input value={acceptInvitation.email} label={'Email'} type={'email'} onChange={(val) => setAcceptInvitation({...acceptInvitation, email: val.target.value})}/>
                        <Input value={acceptInvitation.password} label={'Password'} type={'password'} onChange={(val) => setAcceptInvitation({...acceptInvitation, password: val.target.value})}/>
                        <Input value={acceptInvitation.confirmPassword} label={'Confirm Password'} type={'password'} onChange={(val) => setAcceptInvitation({...acceptInvitation, confirmPassword: val.target.value})}/>
                    </RegisterStep>
                </RegisterSteps>

                <div className={'register-card-buttons'}>
                    <Button onClick={handlePrev}>
                        Previous
                    </Button>
                    <Button onClick={handleNext} className={currentStep === 2 ? 'hidden-step-button' : ''}>
                        Next
                    </Button>
                    <Button onClick={onSubmit} className={currentStep === 2 ? '' : 'hidden-step-button'}>
                        Register
                    </Button>
                </div>
            </Card>
        </LoginPageLayout>
    )
}

export default AcceptInvitationPage;