import React, { useEffect, useState } from "react";
import { HiOutlineDocument } from "react-icons/hi2";
import { Link } from "react-router-dom";

import type { AuthorDetailsDto } from "../../../data/authors";
import type { DocumentDetailsDto } from "../../../data/documents";
import { getAuthorDetailsById, getAuthorDocuments } from "../api";

import styles from "./author-preview.module.css";

interface Props {
    authorId: string;
}

export default function AuthorPreview({ authorId }: Props): React.JSX.Element {
    const [author, setAuthor] = useState<AuthorDetailsDto | undefined>();

    const [documents, setDocuments] = useState<DocumentDetailsDto[]>([]);

    useEffect(() => {
        const fetchAuthorById = async (id: string): Promise<void> => {
            try {
                const response = await getAuthorDetailsById(id);
                setAuthor(response);
            } catch (e) {
                console.error(e);
            }
        };

        const fetchDocumentsPreview = async (id: string): Promise<void> => {
            try {
                const response = await getAuthorDocuments(id, 1, 5);
                setDocuments(response.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchAuthorById(authorId);
        fetchDocumentsPreview(authorId);
    }, [authorId]);

    return (
        <div className={styles.authorPreview}>
            {author && (
                <>
                    <div>
                        <h4 className={"header-small"}>{author.name}</h4>
                        <p className={"body-small-text text-gray"}>{author.institution}</p>
                    </div>
                    <p className={"body-small-text"}>{author.topics}</p>
                </>
            )}

            <div className={styles.documentsContainer}>
                {documents.map((d) => (
                    <div key={d.id} className={styles.document}>
                        <HiOutlineDocument width={14} height={14} />
                        <p className={"body-small-text"}>{d.title}</p>
                    </div>
                ))}
            </div>

            <Link to={`/authors/${authorId}`}>View more</Link>
        </div>
    );
}
