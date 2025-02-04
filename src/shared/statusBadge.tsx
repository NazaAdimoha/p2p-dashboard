import { motion } from "framer-motion";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={`px-2 py-1 rounded-full text-sm font-medium ${
        statusColors[status as keyof typeof statusColors]
      }`}
    >
      {status}
    </motion.span>
  );
}