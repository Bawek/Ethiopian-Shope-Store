import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";

const ReusableDialog = ({ open, onOpenChange, title, description, children }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children} {/* Accepts full content */}
      </DialogContent>
    </Dialog>
  );
};

export default ReusableDialog;
