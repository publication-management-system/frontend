import React, { useEffect, useState } from "react";
import { HiOutlineAcademicCap, HiOutlineDocument } from "react-icons/hi2";
import { Link } from "react-router-dom";

import PagedResults from "../../../components/paged-results/paged-results";
import type { SearchResults } from "../../../data/search";
import { searchAuthors, searchDocuments } from "../api/search-api";

import styles from "./search-results.module.css";

interface LandingPageSearchResultsProps {
    searchResults: SearchResults;
}

interface SearchCardData {
    id: string;
    title: string;
    desc?: string;
    type: "author" | "document";
}

function SearchResultCard({ id, title, desc, type }: SearchCardData) {
    const url = type === "author" ? `/authors/${id}` : `/documents/${id}`;

    return (
        <Link to={url} className={styles.searchResultCard}>
            {type === "author" && <HiOutlineAcademicCap width={24} height={24} />}

            {type === "document" && <HiOutlineDocument width={24} height={24} />}

            <div className={styles.searchResultCardContents}>
                <h4 className={"body-text"}>{title}</h4>
                {desc && <p className={"body-text-small"}>{desc}</p>}
            </div>
        </Link>
    );
}

export function LandingPageSearchResults({ searchResults }: LandingPageSearchResultsProps): React.JSX.Element {
    const [results, setResults] = useState<SearchResults>(searchResults);

    useEffect(() => {
        setResults(searchResults);
    }, [searchResults]);

    const authors = results.authors.data.map(
        (author) =>
            ({
                title: author.name,
                desc: author.institution,
                type: "author",
                id: author.id,
            }) as SearchCardData,
    );

    const documents = results.documents.data.map(
        (d) =>
            ({
                title: d.title,
                desc: d.volume && d.publisher ? `${d.volume} ${d.publisher}` : undefined,
                type: "document",
                id: d.id,
            }) as SearchCardData,
    );

    const fetchAuthors = async (type: "next" | "prev") => {
        const response = await searchAuthors(
            results.term,
            type === "next" ? results.authors.pageNumber + 1 : results.authors.pageNumber - 1,
        );

        setResults((prev) => ({
            ...prev,
            authors: response,
        }));
    };

    const fetchDocuments = async (type: "next" | "prev") => {
        const response = await searchDocuments(
            results.term,
            type === "next" ? results.documents.pageNumber + 1 : results.documents.pageNumber - 1,
        );

        setResults((prev) => ({
            ...prev,
            documents: response,
        }));
    };

    return (
        <div className={styles.searchResultsContainer}>
            {results.authors.totalPages > 0 && (
                <PagedResults
                    title="Authors"
                    pageNumber={results.authors.pageNumber}
                    totalPages={results.authors.totalPages}
                    onNextPage={() => fetchAuthors("next")}
                    onPrevPage={() => fetchAuthors("prev")}
                >
                    {authors.map((d) => (
                        <SearchResultCard key={d.id} id={d.id} title={d.title} desc={d.desc} type={d.type} />
                    ))}
                </PagedResults>
            )}

            {results.documents.totalPages > 0 && (
                <PagedResults
                    title="Documents"
                    pageNumber={results.documents.pageNumber}
                    totalPages={results.documents.totalPages}
                    onNextPage={() => fetchDocuments("next")}
                    onPrevPage={() => fetchDocuments("prev")}
                >
                    {documents.map((d) => (
                        <SearchResultCard key={d.id} id={d.id} title={d.title} desc={d.desc} type={d.type} />
                    ))}
                </PagedResults>
            )}
        </div>
    );
}
