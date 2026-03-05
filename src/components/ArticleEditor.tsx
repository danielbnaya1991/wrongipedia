"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback } from "react";

interface ArticleEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function ArticleEditor({ content, onChange }: ArticleEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Placeholder.configure({ placeholder: "Start writing your article..." }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const addTable = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="tiptap-editor">
      <div className="tiptap-toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          title="Italic"
        >
          <em>I</em>
        </button>
        <span className="border-r border-gray-300 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
          title="Heading 2"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
          title="Heading 3"
        >
          H3
        </button>
        <span className="border-r border-gray-300 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          title="Bullet list"
        >
          &bull; List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          title="Numbered list"
        >
          1. List
        </button>
        <span className="border-r border-gray-300 mx-1" />
        <button onClick={addLink} title="Insert link">
          Link
        </button>
        <button onClick={addImage} title="Insert image">
          Image
        </button>
        <button onClick={addTable} title="Insert table">
          Table
        </button>
        <span className="border-r border-gray-300 mx-1" />
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
          title="Blockquote"
        >
          Quote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal rule"
        >
          ―
        </button>
        <span className="border-r border-gray-300 mx-1" />
        <button onClick={() => editor.chain().focus().undo().run()} title="Undo">
          Undo
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} title="Redo">
          Redo
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
