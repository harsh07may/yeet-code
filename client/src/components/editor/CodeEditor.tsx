"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";

const availableLanguages = ["python", "javascript"];

function CodeEditor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(
    availableLanguages[0]
  );

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current?.getValue());
  }
  return (
    <>
      <div className="relative p-2">
        <div className="flex gap-2 absolute top-5 right-10 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger className="capitalize">
              <Button variant="outline" className="cursor-pointer">
                {selectedLanguage}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {availableLanguages.map((lang) => (
                <DropdownMenuItem
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className="capitalize"
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Editor
          height="600px"
          theme="dark"
          defaultLanguage={selectedLanguage}
          defaultValue={""}
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
