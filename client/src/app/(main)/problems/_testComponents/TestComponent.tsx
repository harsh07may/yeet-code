"use client";
import { Button } from "@/components/ui/button";
import { SERVER_URL } from "@/services/axios";
import { executeCodeApi } from "@/services/webApis/webApis";
import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { io, Socket } from "socket.io-client";

const TestComponent = () => {
  const socketRef = useRef<Socket | null>(null);

  const mutation = useMutation({
    mutationFn: executeCodeApi,
    onSuccess(data, variables, context) {
      const jobId = data?.data?.jobId;
      socketRef.current = io(SERVER_URL);
      if (socketRef.current) {
        socketRef.current.emit("register", jobId);
      }
    },
    onError(error, variables, context) {
      console.log("Eroor", error);
    },
  });

  const handleSubmmision = async () => {
    await mutation.mutate({
      code: `print("hello world")`,
      language: `python`,
      programId: `ggpratikfodo`,
    });
  };

  return (
    <div>
      TestComponent
      <Button onClick={handleSubmmision}>Submit</Button>
    </div>
  );
};

export default TestComponent;
