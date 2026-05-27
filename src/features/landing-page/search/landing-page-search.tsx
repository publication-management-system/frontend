import type React from "react";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "../../../components/button/button";
import { Input } from "../../../components/input/input";
import type { SearchResults } from "../../../data/search";
import { searchAuthors, searchDocuments } from "../api/search-api";

import styles from "./landing-page-search.module.css";

interface LandingPageSearchProps {
    onSearchResults: (searchResults?: SearchResults) => void;
}

export default function LandingPageSearch({ onSearchResults }: LandingPageSearchProps): React.JSX.Element {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (values: FieldValues) => {
        const [authors, documents] = await Promise.all([searchAuthors(values.term), searchDocuments(values.term)]);

        onSearchResults({ authors, documents, term: values.term } as SearchResults);
    };

    return (
        <form className={styles.searchContainer} onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("term", { required: true })} placeholder={"Search for author names or works..."} />
            <div className={styles.searchActions}>
                <Button type={"submit"}>Search</Button>
                <Button
                    type={"reset"}
                    className={styles.clearBtn}
                    onClick={() => {
                        onSearchResults(undefined);
                    }}
                >
                    Clear
                </Button>
            </div>
        </form>
    );
}
