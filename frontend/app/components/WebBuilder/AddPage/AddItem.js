import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddItemForm } from "./AddItemForm";
import { EditProductForm } from "../../Prompt/EditProduct";
export function DialogDemo({ action, type, product }) {
  return (
    <Dialog className="overflow-y-auto">
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-10">
          {" "}
          {action}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] h-screen  overflow-y-auto overflow-x-auto">
        <DialogHeader>
          {/* <DialogTitle>Add Item</DialogTitle> */}
          {/* <DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription> */}
        </DialogHeader>
        <AddItemForm product={product} />

        {/* <Order /> */}
        {/* <DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export function DialogDemo2({ action, type, product }) {
  return (
    <Dialog className="overflow-y-auto">
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-10">
          {" "}
          {action}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] h-screen  overflow-y-auto overflow-x-auto">
        <DialogHeader>
          {/* <DialogTitle>Add Item</DialogTitle> */}
          {/* <DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription> */}
        </DialogHeader>
        <EditProductForm product={product} />
        {/* <Order /> */}
        {/* <DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export function DialogDemo3({ action, type, product }) {
  return (
    <Dialog className="overflow-y-auto">
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-10">
          {" "}
          {action}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] h-screen  overflow-y-auto overflow-x-auto">
        <DialogHeader>
          {/* <DialogTitle>Add Item</DialogTitle> */}
          {/* <DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription> */}
        </DialogHeader>

        <AddItemForm product={product} />

        {/* <Order /> */}
        {/* <DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
