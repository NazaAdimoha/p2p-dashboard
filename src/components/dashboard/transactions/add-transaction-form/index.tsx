import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/shared/button';
import FieldInput from '@/shared/field-input';
import { useTransactionStore } from '@/store/TransactionStore';

const transactionSchema = z.object({
  senderName: z.string().min(3, 'Sender name is required'),
  receiverName: z.string().min(3, 'Receiver name is required'),
  amount: z.number().min(1, 'Amount must be at least 1'),
  status: z.enum(['Pending', 'Completed', 'Failed'])
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export default function AddTransaction({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { createTransaction } = useTransactionStore();
  const { register, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema)
  });

  const onSubmit = (data: TransactionFormData) => {
    createTransaction(data);
    setOpen(false);
  };

  return (
    <div className="px-10 w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold">Add Transaction</h3>
          
          <FieldInput
            label="Sender Name"
            placeholder="Sender Name"
            {...register('senderName')}
            errors={errors}
          />

          <FieldInput
            label="Receiver Name"
            placeholder="Receiver Name"
            {...register('receiverName')}
            errors={errors}
          />

          <FieldInput
            label="Amount"
            type="number"
            placeholder="Amount"
            {...register('amount', { valueAsNumber: true })}
            errors={errors}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Status</label>
            <select
              {...register('status')}
              className="w-full p-2 border rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="ghost" type="submit">Create Transaction</Button>
          </div>
        </div>
      </form>
    </div>
  );
}