"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { deleteApplication } from "../actions";

interface Props {
  id: string;
}

export function DeleteApplicationButton({ id }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleConfirm() {
    setError("");
    startTransition(async () => {
      const result = await deleteApplication(id);
      if (result.success) {
        setOpen(false);
        router.push("/");
        router.refresh();
      } else {
        setError(result.error);
      }
    });
  }

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Delete Application">
        <p className="text-base text-ink/60 mb-4">
          Are you sure you want to delete this application? This cannot be undone.
        </p>
        {error && <p className="text-base font-medium text-ink mb-3">{error}</p>}
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={() => setOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
