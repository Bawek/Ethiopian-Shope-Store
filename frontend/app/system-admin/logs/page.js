"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export default function ComplianceLogsPage() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Mock data — replace with real API call
    setLogs([
      { id: 1, action: "User login", user: "admin@ee-platform.com", timestamp: "2026-06-30 10:23", status: "success" },
      { id: 2, action: "Shop created", user: "merchant@test.com", timestamp: "2026-06-29 14:15", status: "success" },
      { id: 3, action: "Payment failed", user: "customer@test.com", timestamp: "2026-06-28 09:45", status: "error" },
      { id: 4, action: "Template updated", user: "admin@ee-platform.com", timestamp: "2026-06-27 16:30", status: "info" },
      { id: 5, action: "Merchant suspended", user: "admin@ee-platform.com", timestamp: "2026-06-26 11:00", status: "warning" },
    ]);
  }, []);

  const filtered = logs.filter(l =>
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.user.toLowerCase().includes(search.toLowerCase())
  );

  const statusVariant = (status) => {
    switch (status) {
      case "success": return "default";
      case "error": return "destructive";
      case "warning": return "warning";
      default: return "secondary";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Compliance & Logs</h1>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Track platform events and user actions</CardDescription>
          <div className="relative mt-2">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">Action</th>
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Timestamp</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((log) => (
                  <tr key={log.id} className="border-b last:border-0">
                    <td className="py-3">{log.action}</td>
                    <td className="py-3 text-muted-foreground">{log.user}</td>
                    <td className="py-3 text-muted-foreground">{log.timestamp}</td>
                    <td className="py-3">
                      <Badge variant={statusVariant(log.status)}>{log.status}</Badge>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-muted-foreground">
                      No logs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
