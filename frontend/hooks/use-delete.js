import { useState } from 'react';
import { toast } from 'react-toastify';

export function useDelete() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const deleteItem = async (options) => {
    const { endpoint, itemId, onSuccess, onError } = options;
    setIsDeleting(true);

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
      return  onError?.()
      }

      onSuccess?.();
    } catch (error) {
      console.error('Delete error:', error);
      onError?.(error);
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
    }
  };

  const confirmDelete = (options) => {
    setItemToDelete(options);
    setDeleteModalOpen(true);
  };

  const DeleteDialog = ({ onSuccess, onError }) => (
    <CustomConfirmDialog
      trigger={<></>}
      open={deleteModalOpen}
      onOpenChange={setDeleteModalOpen}
      title={`Delete ${itemToDelete?.itemName || 'item'}?`}
      description={`Are you sure you want to delete ${itemToDelete?.itemName || 'this item'}?`}
      confirmText={isDeleting ? 'Deleting...' : 'Delete'}
      onConfirm={() => {
        if (itemToDelete) {
          deleteItem({
            ...itemToDelete,
            onSuccess,
            onError,
          });
        }
      }}
    />
  );

  return {
    isDeleting,
    confirmDelete,
    DeleteDialog,
    deleteItem,
  };
}