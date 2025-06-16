"use client";

import React, { useRef, useState, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useTheme } from "next-themes";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import ComboxBox from "../../app/(main)/problems/_components/ComboxBox";

type Props = { codeSnippets: { code: string; language: string }[] };

/**
 * `CodeEditor` is a React component that renders a Monaco code editor instance
 * with Python as the default language.`
 */
function CodeEditor({ codeSnippets }: Props) {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const selectedSnippet = useMemo(() => {
    return codeSnippets.find(
      (s) => s.language.toLowerCase() === selectedLanguage.toLowerCase()
    );
  }, [codeSnippets, selectedLanguage]);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function handleRun() {
    alert(editorRef.current?.getValue());
  }
  function handleSubmit() {
    alert(editorRef.current?.getValue());
  }

  return (
    <>
      <div className="relative p-2 space-y-2">
        <ComboxBox
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />

        <Editor
          height="600px"
          loading={<Skeleton className="w-full h-full" />}
          theme={theme === "light" ? "light" : "vs-dark"}
          defaultLanguage="python"
          defaultValue="# some comment"
          language={selectedLanguage}
          value={selectedSnippet?.code}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
          }}
        />

        <div className="flex gap-2 absolute bottom-5 right-10">
          <Button onClick={handleRun} variant="outline">
            Run
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </>
  );
}

export default CodeEditor;
