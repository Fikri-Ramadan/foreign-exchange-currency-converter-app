import { fetcher } from "@/lib/utils";
import { useConverter } from "@/stores/ConverterStore";
import useSWR from "swr";
import { useShallow } from "zustand/shallow";

export default function useExchangeRate() {
  const { send: { code: base }, receive: { code: quote }, sendAmount, isSwapping, setRate, setReceiveAmount, setSwapping } = useConverter(
    useShallow((state) => ({
      send: state.send,
      receive: state.receive,
      sendAmount: state.sendAmount,
      isSwapping: state.isSwapping,
      setRate: state.setRate,
      setReceiveAmount: state.setReceiveAmount,
      setSwapping: state.setSwapping,
    }))
  );

  const { data, isValidating, isLoading, error, mutate } = useSWR(
    `https://api.frankfurter.dev/v2/rate/${base}/${quote}`,
    fetcher,
    {
      onSuccess: (data) => {
        if (data?.rate) {
          setRate(data.rate);
          if (isSwapping) {
            setSwapping(false)
          } else {
            const latestReceiveAmount = ((sendAmount ?? 0) * data.rate);
            setReceiveAmount(Number(latestReceiveAmount.toFixed(4)));
          }
        }
      },
      onError: (err) => {
        setSwapping(false);
        console.error('Failed to fetch:', err);
      },
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );

  return {
    data,
    isValidating,
    isLoading,
    isError: error,
    mutate
  };
}

// export default function useExchangeRate() {
//   const { send: { code: base }, receive: { code: quote }, sendAmount, setRate, setReceiveAmount } = useConverter();

//   const { data, trigger, isMutating, error } = useSWRMutation(
//     'EXCHANGE_RATE_API',
//     sendRequest,
//     {
//       onSuccess: (data) => {
//         data?.rate && setRate(data.rate);
//         if (data?.rate) {
//           setRate(data.rate);
//           setReceiveAmount((sendAmount ?? 0) * data.rate);
//         }
//       }
//     }
//   );

//   const safeTrigger = (arg?: { base: string; quote: string; }) => {
//     return trigger(arg || { base, quote });
//   };

//   return {
//     data,
//     trigger: safeTrigger,
//     isMutating,
//     isError: error
//   };
// }