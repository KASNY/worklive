"use client";

import { Building2, ChevronRight, Crown, Plus, Trash2, UserPlus, Users } from "lucide-react";
import { useState } from "react";

import {
  Badge,
  Button,
  Card,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  EmptyState,
  Select,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@worklive/ui";

import { WorkspaceShell } from "@/components/workspace-shell";
import { departments, people, personName, type Department } from "@/lib/organization-data";

export function DepartmentsScreen() {
  const [members, setMembers] = useState(people);
  const [selected, setSelected] = useState<Department | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [personId, setPersonId] = useState(people[0]?.id ?? "");
  const selectedMembers = selected
    ? members.filter((person) => person.departmentId === selected.id)
    : [];
  return (
    <WorkspaceShell>
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <span>NovaTech</span>
          <ChevronRight className="size-3.5" />
          <span>Działy</span>
        </div>
        <h1 className="text-3xl font-bold tracking-[-0.04em]">Departments</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Struktura odpowiedzialności i członkowie działów firmy.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {departments.map((department) => {
          const departmentMembers = members.filter(
            (person) => person.departmentId === department.id,
          );
          return (
            <Card
              key={department.id}
              className="cursor-pointer p-5 hover:border-primary/30 hover:shadow-md"
              onClick={() => setSelected(department)}
            >
              <div className="flex items-start gap-4">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Building2 className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-semibold">{department.name}</h2>
                    <Badge variant="muted">{department.code}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {department.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users className="size-4" />
                      {departmentMembers.length} członków
                    </span>
                    <span>{personName(department.leadId)}</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <SheetContent>
            <SheetHeader>
              <Badge className="mb-3">{selected.code}</Badge>
              <SheetTitle>{selected.name}</SheetTitle>
              <SheetDescription>{selected.description}</SheetDescription>
            </SheetHeader>
            <div className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Kierownik działu</p>
                  <p className="mt-1 flex items-center gap-2 font-semibold">
                    <Crown className="size-4 text-amber-500" />
                    {personName(selected.leadId)}
                  </p>
                </div>
                <Button
                  size="sm"
                  disabled={!members.some((person) => person.departmentId !== selected.id)}
                  onClick={() => {
                    setPersonId(
                      members.find((person) => person.departmentId !== selected.id)?.id ?? "",
                    );
                    setAddOpen(true);
                  }}
                >
                  <UserPlus />
                  Dodaj osobę
                </Button>
              </div>
              <section>
                <h3 className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Członkowie
                </h3>
                {selectedMembers.length ? (
                  <div className="space-y-2">
                    {selectedMembers.map((person) => (
                      <div
                        key={person.id}
                        className="flex items-center gap-3 rounded-xl border p-3"
                      >
                        <span className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                          {person.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{person.name}</p>
                          <p className="text-xs text-muted-foreground">{person.position}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Usuń ${person.name} z działu`}
                          disabled={person.id === selected.leadId}
                          onClick={() =>
                            setMembers((items) =>
                              items.map((item) =>
                                item.id === person.id ? { ...item, departmentId: "" } : item,
                              ),
                            )
                          }
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<Users />}
                    title="Brak członków"
                    description="Dodaj pierwszą osobę do tego działu."
                  />
                )}
              </section>
            </div>
          </SheetContent>
        )}
      </Sheet>
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        {selected && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dodaj osobę do działu</DialogTitle>
              <DialogDescription>
                Osoba zostanie przeniesiona do działu {selected.name} w lokalnym mocku.
              </DialogDescription>
            </DialogHeader>
            <Select value={personId} onChange={(event) => setPersonId(event.target.value)}>
              {members
                .filter((person) => person.departmentId !== selected.id)
                .map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name} · {person.position}
                  </option>
                ))}
            </Select>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Anuluj</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  setMembers((items) =>
                    items.map((item) =>
                      item.id === personId ? { ...item, departmentId: selected.id } : item,
                    ),
                  );
                  setAddOpen(false);
                }}
              >
                <Plus />
                Dodaj
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </WorkspaceShell>
  );
}
