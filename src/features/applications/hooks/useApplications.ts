"use client";

import { useOptimistic, useTransition } from "react";
import { deleteApplication } from "../actions";
import type { Application } from "../types";

export function useApplications(initialApplications: Application[]) {
  const [isPending, startTransition] = useTransition();
  const [optimisticApplications, removeOptimistic] = useOptimistic(
    initialApplications,
    (state: Application[], removedId: string) =>
      state.filter((a) => a.id !== removedId)
  );

  function handleDelete(id: string) {
    startTransition(async () => {
      removeOptimistic(id);
      await deleteApplication(id);
    });
  }

  return { applications: optimisticApplications, handleDelete, isPending };
}
