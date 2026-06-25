import Quill from "quill";
// @ts-expect-error - quilljs-markdown has no types
import QuillMarkdown from "quilljs-markdown";
import { useEffect, useRef } from "react";

import "quill/dist/quill.snow.css";
import "quilljs-markdown/dist/quilljs-markdown-common-style.css";
import styles from "./editor.module.css";

interface EditorProps {
    value?: string;
    onChange: (html: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
    const holderRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (quillRef.current || !holderRef.current) return;

        const quill = new Quill(holderRef.current, {
            theme: "snow",
            placeholder: "Write something…",
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote", "code-block"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                ],
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        new QuillMarkdown(quill, {});

        if (value) quill.clipboard.dangerouslyPasteHTML(value);

        quill.on("text-change", () => {
            onChange(quill.root.innerHTML);
        });

        quillRef.current = quill;
    }, []);

    return (
        <div className={styles.editorContainer}>
            <div ref={holderRef} />
        </div>
    );
}
