import NotificationWidget from "@/app/components/systemAdmin/Notification";
import AccountPage from "../components/manageAccount";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLogout } from "@/util/userLogout";
export const profileLinks = [
  {
    title: "Manage Profile",
    dialogContent: <AccountPage />,
  },
  {
    title: "Orders",
    dialogContent: (
      <div className="space-y-4">
        <p>Your recent orders:</p>
        <div className="border rounded-lg p-4">
          <div className="flex justify-between">
            <span>Order #1234</span>
            <span className="text-green-600">Delivered</span>
          </div>
          <Button className="mt-4" asChild>
            <Link href="/customers/order">View All Orders</Link>
          </Button>
        </div>
      </div>
    ),
  },
];