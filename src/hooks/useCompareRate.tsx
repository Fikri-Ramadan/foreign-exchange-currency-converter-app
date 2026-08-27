import { COMPARE_DATA } from "@/lib/CompareData";
import { fetcher } from "@/lib/utils";
import { useCompare } from "@/stores/CompareStore";
import { useConverter } from "@/stores/ConverterStore";
import { CompareRates, RateListResponse } from "@/types";
import useSWR from "swr";

export default function useCompareRate() {
  const send = useConverter(state => state.send);
  const setRates = useCompare(state => state.setRates);

  const currenciesToFetch = COMPARE_DATA.map((data) => data.code);

  const { data, isLoading, isValidating, error } = useSWR(
    `https://api.frankfurter.dev/v2/rates?base=${send.code}&quotes=${currenciesToFetch}`,
    fetcher,
    {
      onSuccess: (data) => {
        if (data?.length > 0) {
          const rates: CompareRates = {};
          data?.forEach((item: RateListResponse) => {
            rates[item.quote] = item.rate;
          });
          setRates(rates);
        }
      },
      onError: (err) => {
        console.error('Failed to fetch:', err);
      },
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    isLoading,
    isValidating,
    isError: error
  };
}