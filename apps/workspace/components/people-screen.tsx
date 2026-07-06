"use client";

import {
  BriefcaseBusiness,
  ChevronRight,
  Mail,
  Search,
  Ticket,
  UserRound,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  Badge,
  Card,
  Input,
  Select,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@worklive/ui";

import { WorkspaceShell } from "@/components/workspace-shell";
import {
  departmentName,
  departments,
  people,
  personRoles,
  type Person,
} from "@/lib/organization-data";

export function PeopleScreen() {
  const [selected, setSelected] = useState<Person | null>(null);
  const [department, setDepartment] = useState("Wszystkie");
  const [role, setRole] = useState("Wszystkie");
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      people.filter(
        (person) =>
          (!query.trim() ||
            [person.name, person.email, person.position].some((value) =>
              value.toLowerCase().includes(query.toLowerCase()),
            )) &&
          (department === "Wszystkie" || person.departmentId === department) &&
          (role === "Wszystkie" || person.role === role),
      ),
    [department, query, role],
  );

  return (
    <WorkspaceShell>
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span>NovaTech</span>
          <ChevronRight className="size-3.5" />
          <span>Zespół</span>
        </div>
        <h1 className="text-3xl font-bold tracking-[-0.04em]">People</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pracownicy, role i podstawowe informacje organizacyjne workspace.
        </p>
      </div>
      <Card className="overflow-hidden">
        <div className="grid gap-3 border-b p-5 lg:grid-cols-[1fr_220px_220px]">
          <div className="relative">
            <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Szukaj pracownika…"
              className="pl-10"
            />
          </div>
          <Select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            aria-label="Dział"
          >
            <option>Wszystkie</option>
            {departments.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
          <Select value={role} onChange={(event) => setRole(event.target.value)} aria-label="Rola">
            <option>Wszystkie</option>
            {personRoles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[950px]">
            <TableHeader>
              <TableRow>
                <TableHead>Pracownik</TableHead>
                <TableHead>Rola</TableHead>
                <TableHead>Dział</TableHead>
                <TableHead>Stanowisko</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Zasoby</TableHead>
                <TableHead>Otwarte zgłoszenia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((person) => (
                <TableRow
                  key={person.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(person)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {person.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </span>
                      <div>
                        <p className="font-semibold">{person.name}</p>
                        <p className="text-xs text-muted-foreground">{person.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="muted">{person.role}</Badge>
                  </TableCell>
                  <TableCell>{departmentName(person.departmentId)}</TableCell>
                  <TableCell>{person.position}</TableCell>
                  <TableCell>
                    <Badge variant={person.status === "Aktywny" ? "success" : "muted"}>
                      {person.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{person.assetsCount}</TableCell>
                  <TableCell>{person.openTicketsCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <SheetContent>
            <SheetHeader>
              <div className="mb-4 grid size-14 place-items-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                {selected.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
              <SheetTitle>{selected.name}</SheetTitle>
              <SheetDescription>
                {selected.position} · {departmentName(selected.departmentId)}
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 p-6">
              <Detail icon={<Mail />} label="Email" value={selected.email} />
              <Detail icon={<UserRound />} label="Rola" value={selected.role} />
              <Detail
                icon={<BriefcaseBusiness />}
                label="Dział i stanowisko"
                value={`${departmentName(selected.departmentId)} · ${selected.position}`}
              />
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border p-4">
                  <Users className="mb-3 size-5 text-primary" />
                  <p className="text-2xl font-bold">{selected.assetsCount}</p>
                  <p className="text-xs text-muted-foreground">Przypisane zasoby</p>
                </div>
                <div className="rounded-xl border p-4">
                  <Ticket className="mb-3 size-5 text-amber-500" />
                  <p className="text-2xl font-bold">{selected.openTicketsCount}</p>
                  <p className="text-xs text-muted-foreground">Otwarte zgłoszenia</p>
                </div>
              </div>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </WorkspaceShell>
  );
}

function Detail({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3 rounded-xl border p-4">
      <span className="text-primary [&>svg]:size-4">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
