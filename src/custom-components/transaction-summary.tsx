import { TransactionSummaryProps } from '@/types/interfaces';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui-components/card';
import { ArrowRight } from 'lucide-react';

export function TransactionSummary({
  transactions,
  payers,
}: TransactionSummaryProps) {
  const getPayerName = (id: number) =>
    payers.find((p) => p.id === id)?.name ?? 'Unknown';

  // Create an array of rendered transaction data
  const renderedTransactions = transactions.map((transaction) => ({
    fromPayerName: getPayerName(transaction.fromUserId),
    amount: transaction.amount.toFixed(2),
    toPayerName: getPayerName(transaction.toUserId),
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Settlement Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderedTransactions.map((renderedTransaction, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="font-medium">
              {renderedTransaction.fromPayerName}
            </span>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              <span className="font-mono">${renderedTransaction.amount}</span>
            </div>
            <span className="font-medium">
              {renderedTransaction.toPayerName}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
