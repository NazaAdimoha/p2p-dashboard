import { ColumnDef } from '@tanstack/react-table'
import { Transaction } from '@/types'
import { ArrowUpDown, Eye, MoreVerticalIcon } from 'lucide-react'
import { Button } from '@/shared/button'
import { StatusBadge } from '@/shared/statusBadge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/shared/dropdown-menu'
import Link from 'next/link'

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
      <StatusBadge status={row?.original?.status} />

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
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const p2p = row.original;

      const values = {
        id: p2p?.id,
        description: p2p?.senderName,
        name: p2p?.receiverName,
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <span className="sr-only">Open menu</span>
              <MoreVerticalIcon className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                className="flex gap-3 items-center"
                href={{
                  pathname: `/dashboard/transactions/${p2p?.id}`,
                  query: { id: p2p.id },
                }}
              >
                <Eye className="size-5" />

                <p>View</p>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]

