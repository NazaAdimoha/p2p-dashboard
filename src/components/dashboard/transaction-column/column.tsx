import { ColumnDef } from '@tanstack/react-table'
import { Transaction } from '@/types'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/shared/button'
import StatusBadge from '@/shared/statusBadge'

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: 'Transaction ID',
    cell: ({ row }) => <p>{row.getValue('id')}</p>
  },
  {
    accessorKey: 'senderName',
    header: 'Sender',
    cell: ({ row }) => <p className=''>{row.getValue('senderName')}</p>
  },
  {
    accessorKey: 'receiverName',
    header: 'Receiver',
    cell: ({ row }) => <p >{row.getValue('receiverName')}</p>
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return (
        <div className="font-medium">{formatted}</div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      <StatusBadge status={row.getValue('status')} />

    (row: any, id: string, value: any[]) => {
      return value.includes(row.getValue(id))
    }
    }
  },
  {
    accessorKey: 'timestamp',
    header: 'Date',
    cell: ({ row }) => new Date(row.getValue('timestamp')).toLocaleDateString(),
  },
]

