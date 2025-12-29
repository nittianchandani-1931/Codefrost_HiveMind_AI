import { useEffect, useState } from "react";
import { socket } from "../services/socket";

export function useSocket(roomId) {
  const [document, setDocument] = useState("");

  useEffect(() => {
    if (!roomId) return;

    socket.connect();

    socket.emit("join_room", roomId);

    socket.on("sync_document", (content) => {
      setDocument(content);
    });

    return () => {
      // ❌ DO NOT DISCONNECT THE SOCKET
      socket.off("sync_document");
    };
  }, [roomId]);

  const updateDocument = (content) => {
    socket.emit("document_update", { roomId, content });
  };

  return { document, updateDocument };
}
