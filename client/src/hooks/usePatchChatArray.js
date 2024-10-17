import { useMutation } from "@tanstack/react-query";

import React from "react";
import { chatsSliceAction } from "../store/Chats";
import { useDispatch } from "react-redux";

export default function usePatchChatArray() {

    const dispatch = useDispatch();

  const patchMessage = async (chat) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/chats`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(chat),
    });
    const data = await response.json();

    // for logged out user
    // if (data.signin) {
    //   window.open("/signin", "_parent");
    //   return {};
    // }
    return data;
  };

  //useMutation hook patch chat
  const mutation = useMutation({
    mutationFn: patchMessage,
    onSuccess: (data, variables) => {
      //the variables parameter refers to the arguments that were passed to the mutate function i.e the chat variable
    dispatch(chatsSliceAction.sendChat(variables));
    },
    onError: (error) => {
      console.error("Error sending chat:", error);
    },
  });

  return mutation;
}