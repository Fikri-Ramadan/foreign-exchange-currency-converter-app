import { fetcher } from "@/lib/utils";
import { useConverter } from "@/stores/ConverterStore";
import { FilterValue, RateHistory, RateListResponse } from "@/types";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useShallow } from "zustand/shallow";

export default function useHistoryData() {
  const searchParams = useSearchParams();
  const filterType: FilterValue = searchParams.get('range') as FilterValue || '1M';

  const { base, quote, setRateHistory } = useConverter(useShallow((state) => ({
    base: state.send.code,
    quote: state.receive.code,
    setRateHistory: state.setRateHistory,
  })));

  let dateFrom = new Date();
  let formattedGroup = '';

  switch (filterType) {
    case '1D':
      dateFrom.setDate(dateFrom.getDate() - 1);
      break;
    case '1W':
      dateFrom.setDate(dateFrom.getDate() - 7);
      break;
    case '1M':
      dateFrom.setMonth(dateFrom.getMonth() - 1);
      break;
    case '3M':
      dateFrom.setMonth(dateFrom.getMonth() - 3);
      break;
    case '1Y':
      dateFrom.setFullYear(dateFrom.getFullYear() - 1);
      formattedGroup = '&group=week';
      break;
    case '5Y':
      dateFrom.setFullYear(dateFrom.getFullYear() - 5);
      formattedGroup = '&group=month';
      break;
    default:
      dateFrom.setMonth(dateFrom.getMonth() - 1);
  }

  const { data, isLoading, isValidating, error } = useSWR(
    base && quote ? `https://api.frankfurter.dev/v2/rates?from=${dateFrom.toISOString().split('T')[0]}&base=${base}&quotes=${quote}${formattedGroup}` : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (data?.length > 0) {
          const rates: RateHistory[] = data?.map((item: RateListResponse) => ({
            date: item.date,
            rate: item.rate
          }))
          setRateHistory(rates)
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