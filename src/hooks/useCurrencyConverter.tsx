import { fetcher } from "@/lib/utils";
import { CurrencyConverter } from "@/types";
import useSWR from "swr";

export default function useCurrencyConverter({ base, quote }: CurrencyConverter) {
  const { data, isLoading, error } = useSWR(
    `https://api.frankfurter.dev/v2/rate/${base}/${quote}`, fetcher
  );
  return {
    data, isLoading, error
  };
}