import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Order from "../Tables/orderDetial";

export function OrderDialog({ action, order }) {
  return (
    <Dialog className="overflow-y-auto">
      <DialogTrigger asChild>
        <button className="flex bg-gray-200 p-2 rounded-lg "> {action}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] h-screen  overflow-y-auto overflow-x-auto">
        <DialogHeader>
          {/* <DialogTitle>Add Item</DialogTitle> */}
          {/* <DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription> */}
        </DialogHeader>
        {/* <AddItemForm /> */}
        <Order order={order} />
        {/* <DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
