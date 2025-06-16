"use client";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";

type Props = { codeSnippets: { code: string; language: string }[] };

/**
 * `CodeEditor` is a React component that renders a Monaco code editor instance
 * with Python as the default language.`
 */
function CodeEditor({ codeSnippets }: Props) {
  const { theme } = useTheme();
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const snippet = codeSnippets.find(
    (s) => s.language.toLowerCase() === selectedLanguage.toLowerCase()
  );
  // TODO: Add a combobox that changes the selectedLanguage

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current?.getValue());
  }
  return (
    <>
      <div className="relative p-2">
        <Editor
          height="600px"
          loading={<Skeleton className="w-full h-full" />}
          theme={theme == "light" ? "light" : "vs-dark"}
          defaultLanguage={selectedLanguage}
          defaultValue={snippet?.code ?? "//some comment"}
          onMount={handleEditorDidMount}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
        <div className="flex gap-2 absolute bottom-5 right-10">
          <Button
            onClick={showValue}
            variant="outline"
            className="cursor-pointer"
          >
            Run
          </Button>
          <Button
            onClick={showValue}
            variant="default"
            className="cursor-pointer"
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
