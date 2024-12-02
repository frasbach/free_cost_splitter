export interface TableRowI {
  id: number;
  costname: string;
  costamount: number;
  payedByUserId: number;
  costfactor: Map<number, number>;
}

export interface Payer {
  id: number;
  name: string;
}

export interface Transaction {
  fromUserId: number;
  toUserId: number;
  amount: number;
}

/**
 * Function to calculate minimal transactions to settle debts
 * @param payerBalances - List of payer balances
 * @returns List of transactions to settle debts
 */
export function calculateMinimalTransactions(
  payerBalances: { id: number; balance: number }[],
): Transaction[] {
  const transactions: Transaction[] = [];

  // Create mutable copy of balances
  const balances = new Map(
    payerBalances.map(({ id, balance }) => [id, balance]),
  );

  // Find debtors (negative balance) and creditors (positive balance)
  const debtors = Array.from(balances.entries())
    .filter(([_, balance]) => balance < 0)
    .sort((a, b) => a[1] - b[1]); // Largest debt first

  const creditors = Array.from(balances.entries())
    .filter(([_, balance]) => balance > 0)
    .sort((a, b) => b[1] - a[1]); // Largest credit first

  let debtorIndex = 0;
  let creditorIndex = 0;

  while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
    const [debtorId, debtorBalance] = debtors[debtorIndex];
    const [creditorId, creditorBalance] = creditors[creditorIndex];

    const amount = Math.min(Math.abs(debtorBalance), creditorBalance);

    if (amount > 0) {
      transactions.push({
        fromUserId: debtorId,
        toUserId: creditorId,
        amount: Number(amount.toFixed(2)),
      });
    }

    // Update balances and move indices
    if (Math.abs(debtorBalance) === creditorBalance) {
      debtorIndex++;
      creditorIndex++;
    } else if (Math.abs(debtorBalance) < creditorBalance) {
      creditors[creditorIndex][1] -= Math.abs(debtorBalance);
      debtorIndex++;
    } else {
      debtors[debtorIndex][1] += creditorBalance;
      creditorIndex++;
    }
  }

  return transactions;
}