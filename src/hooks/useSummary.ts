import { useMemo } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const summary = useMemo(() => { // TODO: Só ira rendereizar se o transactions mudar
    return transactions.reduce(
      (acc, trasaction) => {
        if (trasaction.type === "income") {
          acc.income += trasaction.price;
          acc.total += trasaction.price;
        } else {
          acc.outcome += trasaction.price;
          acc.total -= trasaction.price;
        }

        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      }
    );
  }, [transactions]);
  return summary;
}
