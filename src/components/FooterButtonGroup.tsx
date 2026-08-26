'use client';

import { useConverter } from "@/stores/ConverterStore";
import AddConversionButton from "./AddConversionButton";
import AddFavButton from "./AddFavButton";
import { useShallow } from "zustand/shallow";

export default function FooterButtonGroup() {
  const { send, receive, sendAmount, receiveAmount } = useConverter(useShallow((state) => ({
    send: state.send,
    receive: state.receive,
    sendAmount: state.sendAmount,
    receiveAmount: state.receiveAmount
  })));

  return (
    <div className="space-x-2 flex">
      <AddFavButton
        base={send.code}
        quote={receive.code}
      />
      <AddConversionButton
        send={send}
        receive={receive}
        sendAmount={sendAmount}
        receiveAmount={receiveAmount}
      />
    </div>
  );
}