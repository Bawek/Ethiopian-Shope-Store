import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function RecentSales() {
    const sales = [
        { name: "Wireless Headphones", email: "user1@example.com", amount: "$99.99" },
        { name: "Smart Watch", email: "user2@example.com", amount: "$199.99" },
        // ... more sales
    ];

    return (
        <div className="space-y-4">
            {sales.map((sale, i) => (
                <div key={i} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback>{sale.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{sale.name}</p>
                        <p className="text-sm text-muted-foreground">{sale.email}</p>
                    </div>
                    <div className="ml-auto font-medium">{sale.amount}</div>
                </div>
            ))}
        </div>
    );
}