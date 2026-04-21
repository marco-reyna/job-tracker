"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/Input";
import { ApplicationList } from "./ApplicationList";
import type { Application } from "../types";

interface Props {
  applications: Application[];
}

export function ApplicationsView({ applications }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return applications;
    const q = query.toLowerCase();
    return applications.filter(
      (app) =>
        app.company.toLowerCase().includes(q) ||
        app.role.toLowerCase().includes(q)
    );
  }, [applications, query]);

  return (
    <div>
      <div className="mb-4">
        <Input
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by company or role..."
          aria-label="Search applications"
        />
      </div>
      <ApplicationList applications={filtered} />
    </div>
  );
}
