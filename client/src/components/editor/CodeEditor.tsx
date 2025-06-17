"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import ComboxBox from "../../app/(main)/problems/_components/ComboxBox";
import { executeCodeApi } from "@/services/webApis/webApis";
import { SERVER_URL } from "@/services/axios";
import { io, Socket } from "socket.io-client";
import { Loader2 } from "lucide-react";

type Props = {
  codeSnippets: { code: string; language: string }[];
};

function CodeEditor({ codeSnippets }: Props) {
  const { theme } = useTheme();
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const selectedSnippet = useMemo(() => {
    return codeSnippets.find(
      (s) => s.language.toLowerCase() === selectedLanguage.toLowerCase()
    );
  }, [codeSnippets, selectedLanguage]);

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.on("code-result", (data) => {
      setOutput(data?.output || "No output");
      setSubmissionLoading(false);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const handleSubmission = async () => {
    setSubmissionLoading(true);
    setOutput("Waiting for result...");
    const code = editorRef.current?.getValue();
    const language = selectedLanguage;

    try {
      const response = await executeCodeApi({
        code: code || "",
        language,
        programId: `ggpratikfodo`,
      });

      const jobId = response?.data?.jobId;
      socketRef.current?.emit("register", jobId);
    } catch (error) {
      console.error("Submission error:", error);
      setOutput("Error during submission.");
      setSubmissionLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-4 p-4">
      {/* Language Selector */}
      <div className="flex justify-between items-center">
        <ComboxBox
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>

      {/* Code Editor */}
      <Editor
        height="500px"
        loading={<Skeleton className="w-full h-full" />}
        theme={theme === "light" ? "light" : "vs-dark"}
        defaultLanguage="python"
        defaultValue="# Write your code here"
        language={selectedLanguage}
        value={selectedSnippet?.code}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "Fira Code, monospace",
        }}
      />

      {/* Run/Submit Buttons */}
      <div className="flex justify-end gap-3">
        <Button
          onClick={handleSubmission}
          variant="outline"
          disabled={submissionLoading}
        >
          {submissionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running...
            </>
          ) : (
            "Run Code"
          )}
        </Button>
        <Button onClick={() => alert("Submit logic pending")}>Submit</Button>
      </div>

      {/* Output Terminal */}
      <div className="rounded-xl border bg-muted p-4 shadow-inner">
        <div className="text-sm font-medium mb-2 text-muted-foreground">
          Output Terminal
        </div>
        <pre className="bg-background text-sm p-3 rounded-lg overflow-auto whitespace-pre-wrap max-h-[200px] text-primary font-mono">
          {output || "// Output will appear here after execution"}
        </pre>
      </div>
    </div>
  );
}

export default CodeEditor;
