"use client"

import { useState } from "react";

type CommentProps = {
    children: any
    props: any
}

function filterComment(comment_props_array: CommentProps[]) {
    console.log(comment_props_array)
    const comment_line_map: { [key: number]: string } = {}
    for (const comment_props of comment_props_array) {
        if (typeof comment_props != "string") {
            const data = comment_props.props.children
            if (data.trim() !== "\n") {
                comment_line_map[parseInt(data.split(" ")[0])] = data.split(" ").slice(1).join(" ")
            }
        }
    }
    return comment_line_map
}

export default function HoverCodeCard({ children }: any) {
    const [hover_line, setHoverLine] = useState<number | null>(null)
    const [hover_comment, setHoverComment] = useState<string | null>(null)

    let code = children[0]
    let comment = children[1]

    const comment_props: CommentProps[] = comment.props.children
    const comments = filterComment(comment_props)

    const handleMouseOver = (lineNumber: number) => {
        setHoverLine(lineNumber);
        setHoverComment(comments[lineNumber] || null);
    };

    console.log()

    return (
        <div>
            {code}
        </div>
    );
}
