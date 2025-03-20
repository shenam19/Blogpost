import { useState } from 'react';
import { TrashIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeletePostButtonProps {
  postId: string | number;
}

export const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="p-2 rounded text-red-600 hover:bg-red-100 transition-colors"
        onClick={() => setOpen(true)}
      >
        <TrashIcon className="w-4 h-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Link
              href={`/posts/${postId}`}
              method="delete"
              as="button"
              className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded"
              onClick={() => setOpen(false)}
            >
              Delete
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
