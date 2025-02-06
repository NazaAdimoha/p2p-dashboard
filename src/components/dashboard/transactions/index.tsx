"use client";
import { useTransactionStore } from "@/store/TransactionStore";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "../transaction-column/column";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@/shared/button";
import { PlusCircleIcon } from "lucide-react";
import AppModal from "@/shared/app-modal";
import AddTransaction from "./add-transaction-form";

export default function TransactionPage() {
  const { transactions, fetchTransactions } = useTransactionStore();
  console.log("transactions:::", transactions);
  const { user, loaded } = useClerk();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (loaded && !user) {
      router.push("/dashboard");
    }
  }, [loaded, user, router]);

  useEffect(() => {
    const loadTransactions = async () => {
      if (user) {
        try {
          await fetchTransactions();
        } catch (error) {
          console.error("Failed to fetch transactions:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (user) {
      loadTransactions();
    }
  }, [user, fetchTransactions]);

  if (!loaded || isLoading || !isMounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transaction History</h1>

        <Button
          variant="ghost"
          className="ml-auto"
          iconPlacement="left"
          onClick={() => setOpenModal(true)}
          Icon={<PlusCircleIcon height={20} width={20} className="size-5" />}
        >
          Add Transaction
        </Button>
      </div>
      <DataTable columns={columns} data={transactions} />

      <AppModal open={openModal} setOpen={setOpenModal}>
        <AddTransaction setOpen={setOpenModal} />
      </AppModal>
    </div>
  );
}
