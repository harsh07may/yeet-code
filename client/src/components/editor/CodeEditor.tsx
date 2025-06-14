"use client";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef } from "react";
import { Button } from "../ui/button";
type Props = {
  langauge: "python" | "javascript";
  defaultValue?: string;
};

function CodeEditor({ langauge = "javascript", defaultValue }: Props) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

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
          theme="dark"
          defaultLanguage={langauge}
          defaultValue={defaultValue}
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
