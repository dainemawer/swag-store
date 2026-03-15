import type { Stock } from "@/types/stock";

export default function StockStatus({ stock }: { stock: Stock | null }) {
    if (!stock) {
        return null;
    }

    if (stock.lowStock) {
        return (
            <p className="text-xs text-zinc-500 font-medium">
                Low stock. Only {stock.stock} items left.
            </p>
        );
    }

    if (stock.inStock) {
        return (
            <p className="text-xs text-zinc-500 font-medium">
                {stock.stock} items left in stock.
            </p>
        );
    }

    return (
        <p className="text-xs text-zinc-500 font-medium">
            Out of stock.
        </p>
    );
}
