import { useMutation } from "@tanstack/react-query";
import React from "react";
import { chatsSliceAction } from "../store/Chats";
import { useDispatch } from "react-redux";

export default function usePatchChatArray() {
  const dispatch = useDispatch();

  const patchChat = async (chat) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/chats`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(chat),
    });

    // Check if response is successful
    if (!response.ok) {
      throw new Error('Failed to patch chat data');
    }

    const data = await response.json();

    // Redirect if the user is logged out
    if (!data.signin) {
      window.open("/signin", "_parent");
      return {};
    }

    return data;
  };

  // useMutation hook to patch chat
  const mutation = useMutation({
    mutationFn: patchChat,
    onSuccess: (data, variables) => {
      dispatch(chatsSliceAction.sendChat(variables));
      // Optionally provide user feedback
      console.log("Chat updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error sending chat:", error);
      // Optionally handle user feedback for error
    },
  });

  return mutation;
}
