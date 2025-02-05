import { ColumnDef } from '@tanstack/react-table'
import { Transaction } from '@/types'
import { ArrowUpDown } from 'lucide-react'


export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
  },
  {
    accessorKey: 'senderName',
    header: 'Sender',
  },
  {
    accessorKey: 'receiverName',
    header: 'Receiver',
  },
//   {
//     accessorKey: 'amount',
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
//         >
//           Amount
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue('amount'))
//       const formatted = new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//       }).format(amount)

//       return <div className="font-medium">{formatted}</div>
//     },
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     cell: ({ row }) => <StatusBadge status={row.getValue('status')} />,
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id))
//     },
//   },
//   {
//     accessorKey: 'timestamp',
//     header: 'Date',
//     cell: ({ row }) => new Date(row.getValue('timestamp')).toLocaleDateString(),
//   },
]