import React, {ChangeEvent, useState} from "react";
import {Form} from "../../../form/form.tsx";
import {Button} from "../../../button/button.tsx";
import {authenticatedClient} from "../../../../data/client.ts";

interface UploadProfileImageProps {
    userId?: string
}

interface UploadProfileImageState {
    file: File | undefined
}

export const UploadProfileImage = (props: UploadProfileImageProps): React.JSX.Element => {
    const [imgFile, setImgFile] = useState<UploadProfileImageState>({file: undefined});

    const uploadProfileImage = async () => {
        if (!imgFile || !imgFile.file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', imgFile.file);

        const resp = await authenticatedClient.post(`/api/users/${props.userId}/profile-image`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => response.data)

        console.log(resp)
    }

    const onFileAdded = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target)
        setImgFile({
            file: e.target.files?.[0] ?? undefined
        })
    }

    return (
        <Form onSubmit={uploadProfileImage} className={'upload-profile-image-form'}>
            <div className={'input-field'}>
                <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(imgFile.file ?? new Blob())}
                />

                <label htmlFor='fileUploadProfile'>Upload image</label>
                <input id={'fileUploadProfile'}
                       type={'file'}
                       onChange={onFileAdded}/>
            </div>
            <Button> Upload Image</Button>
        </Form>
    )
}