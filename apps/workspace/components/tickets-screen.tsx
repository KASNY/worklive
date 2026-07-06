"use client";

import {
  Calendar,
  ChevronRight,
  FileText,
  MessageSquare,
  Paperclip,
  Plus,
  Search,
  Ticket,
  UserRound,
} from "lucide-react";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";

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
  Textarea,
} from "@worklive/ui";

import { WorkspaceShell } from "@/components/workspace-shell";
import { initialAssets } from "@/lib/assets-data";
import { departmentName, departments, people, personName } from "@/lib/organization-data";
import {
  initialTickets,
  ticketCategories,
  ticketPriorities,
  ticketStatuses,
  type TicketCategory,
  type TicketPriority,
  type TicketRecord,
  type TicketStatus,
} from "@/lib/tickets-data";

function statusVariant(status: TicketStatus) {
  if (status === "Nowe") return "default";
  if (status === "W trakcie" || status === "Oczekuje") return "warning";
  if (status === "Rozwiązane") return "success";
  return "muted";
}
function priorityVariant(priority: TicketPriority) {
  if (priority === "Krytyczny" || priority === "Wysoki") return "warning";
  return "muted";
}

export function TicketsScreen() {
  const [tickets, setTickets] = useState(initialTickets);
  const [selected, setSelected] = useState<TicketRecord | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Wszystkie");
  const [department, setDepartment] = useState("Wszystkie");
  const filtered = useMemo(
    () =>
      tickets.filter(
        (ticket) =>
          (!query.trim() ||
            [ticket.title, ticket.code, ticket.description].some((value) =>
              value.toLowerCase().includes(query.toLowerCase()),
            )) &&
          (status === "Wszystkie" || ticket.status === status) &&
          (department === "Wszystkie" || ticket.departmentId === department),
      ),
    [department, query, status, tickets],
  );
  const updateSelected = (updated: TicketRecord) => {
    setTickets((items) => items.map((item) => (item.id === updated.id ? updated : item)));
    setSelected(updated);
  };
  return (
    <WorkspaceShell>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>NovaTech</span>
            <ChevronRight className="size-3.5" />
            <span>Zgłoszenia</span>
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.04em]">Tickets</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Zgłaszaj problemy do właściwego działu lub konkretnej osoby.
          </p>
        </div>
        <Button size="lg" onClick={() => setCreateOpen(true)}>
          <Plus />
          Zgłoś problem
        </Button>
      </div>
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "Otwarte",
            value: tickets.filter((ticket) => !["Rozwiązane", "Zamknięte"].includes(ticket.status))
              .length,
          },
          {
            label: "Krytyczne",
            value: tickets.filter(
              (ticket) => ticket.priority === "Krytyczny" && ticket.status !== "Zamknięte",
            ).length,
          },
          {
            label: "Oczekujące",
            value: tickets.filter((ticket) => ticket.status === "Oczekuje").length,
          },
        ].map((item) => (
          <Card key={item.label} className="p-5">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-3xl font-bold">{item.value}</p>
          </Card>
        ))}
      </div>
      <Card className="overflow-hidden">
        <div className="grid gap-3 border-b p-5 lg:grid-cols-[1fr_220px_220px]">
          <div className="relative">
            <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Szukaj zgłoszeń…"
              className="pl-10"
            />
          </div>
          <Select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label="Status"
          >
            <option>Wszystkie</option>
            {ticketStatuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
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
        </div>
        {filtered.length ? (
          <div className="overflow-x-auto">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Zgłoszenie</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priorytet</TableHead>
                  <TableHead>Dział</TableHead>
                  <TableHead>Przypisane do</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Utworzono</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((ticket) => {
                  const asset = initialAssets.find((item) => item.id === ticket.assetId);
                  return (
                    <TableRow
                      key={ticket.id}
                      className="cursor-pointer"
                      onClick={() => setSelected(ticket)}
                    >
                      <TableCell>
                        <p className="font-semibold">{ticket.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {ticket.code} · {ticket.category}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(ticket.status)}>{ticket.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={priorityVariant(ticket.priority)}>{ticket.priority}</Badge>
                      </TableCell>
                      <TableCell>{departmentName(ticket.departmentId)}</TableCell>
                      <TableCell>{personName(ticket.assigneeId)}</TableCell>
                      <TableCell>{asset?.name ?? "—"}</TableCell>
                      <TableCell>{ticket.createdAt}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState
            icon={<Ticket />}
            title="Brak zgłoszeń"
            description="Zmień filtry albo zgłoś nowy problem."
            action={
              <Button onClick={() => setCreateOpen(true)}>
                <Plus />
                Zgłoś problem
              </Button>
            }
          />
        )}
      </Card>
      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <SheetContent>
            <SheetHeader>
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge variant={statusVariant(selected.status)}>{selected.status}</Badge>
                <Badge variant={priorityVariant(selected.priority)}>{selected.priority}</Badge>
                <Badge variant="muted">{selected.category}</Badge>
              </div>
              <SheetTitle>{selected.title}</SheetTitle>
              <SheetDescription>
                {selected.code} · zgłosił(a) {selected.reporter}
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-7 p-6">
              <div>
                <label className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Zmień status
                </label>
                <Select
                  className="mt-2"
                  value={selected.status}
                  onChange={(event) => {
                    const next = event.target.value as TicketStatus;
                    updateSelected({
                      ...selected,
                      status: next,
                      activity: [
                        {
                          id: `activity-${Date.now()}`,
                          text: `Zmieniono status na ${next}`,
                          date: "Przed chwilą",
                        },
                        ...selected.activity,
                      ],
                    });
                  }}
                >
                  {ticketStatuses.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{selected.description}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Detail
                  icon={<UserRound />}
                  label="Przypisane do"
                  value={`${departmentName(selected.departmentId)} · ${personName(selected.assigneeId)}`}
                />
                <Detail icon={<Calendar />} label="Utworzono" value={selected.createdAt} />
                <Detail
                  icon={<FileText />}
                  label="Powiązany asset"
                  value={
                    initialAssets.find((asset) => asset.id === selected.assetId)?.name ?? "Brak"
                  }
                />
                <Detail
                  icon={<Paperclip />}
                  label="Załączniki"
                  value={selected.attachments.length ? selected.attachments.join(", ") : "Brak"}
                />
              </div>
              <section>
                <h3 className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Komentarze
                </h3>
                {selected.comments.length ? (
                  <div className="space-y-3">
                    {selected.comments.map((comment) => (
                      <div key={comment.id} className="rounded-xl border p-4">
                        <div className="flex justify-between gap-3">
                          <p className="text-sm font-semibold">{comment.author}</p>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{comment.body}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Brak komentarzy.</p>
                )}
                <CommentForm
                  onSubmit={(body) =>
                    updateSelected({
                      ...selected,
                      comments: [
                        ...selected.comments,
                        {
                          id: `comment-${Date.now()}`,
                          author: "Anna Nowak",
                          body,
                          date: "Przed chwilą",
                        },
                      ],
                      activity: [
                        {
                          id: `activity-${Date.now()}`,
                          text: "Anna Nowak dodała komentarz",
                          date: "Przed chwilą",
                        },
                        ...selected.activity,
                      ],
                    })
                  }
                />
              </section>
              <section>
                <h3 className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Activity timeline
                </h3>
                <div className="space-y-4">
                  {selected.activity.map((event) => (
                    <div key={event.id} className="flex gap-3">
                      <span className="mt-1.5 size-2.5 rounded-full bg-primary ring-4 ring-primary/10" />
                      <div>
                        <p className="text-sm font-medium">{event.text}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </SheetContent>
        )}
      </Sheet>
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Zgłoś problem</DialogTitle>
            <DialogDescription>
              Przekaż zgłoszenie do odpowiedniego działu lub osoby.
            </DialogDescription>
          </DialogHeader>
          <TicketForm
            onSubmit={(ticket) => {
              setTickets((items) => [ticket, ...items]);
              setCreateOpen(false);
              setSelected(ticket);
            }}
          />
        </DialogContent>
      </Dialog>
    </WorkspaceShell>
  );
}

function TicketForm({
  onSubmit,
  initialAssetId = "",
}: {
  onSubmit: (ticket: TicketRecord) => void;
  initialAssetId?: string;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TicketCategory>("IT");
  const [priority, setPriority] = useState<TicketPriority>("Średni");
  const [departmentId, setDepartmentId] = useState(departments[0]?.id ?? "");
  const [assigneeId, setAssigneeId] = useState("");
  const [assetId, setAssetId] = useState(initialAssetId);
  const [attachment, setAttachment] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit({
      id: `ticket-${Date.now()}`,
      code: `TIC-${String(Date.now()).slice(-4)}`,
      title,
      description,
      category,
      priority,
      status: "Nowe",
      departmentId,
      assigneeId: assigneeId || null,
      assetId: assetId || null,
      reporter: "Anna Nowak",
      createdAt: "Przed chwilą",
      attachments: attachment ? [attachment] : [],
      comments: [],
      activity: [
        {
          id: `activity-${Date.now()}`,
          text: "Anna Nowak utworzyła zgłoszenie",
          date: "Przed chwilą",
        },
      ],
    });
  }
  const availablePeople = people.filter((person) => person.departmentId === departmentId);
  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block space-y-2 text-sm font-medium">
        <span>Tytuł</span>
        <Input required value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <label className="block space-y-2 text-sm font-medium">
        <span>Opis</span>
        <Textarea
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Kategoria">
          <Select
            value={category}
            onChange={(event) => setCategory(event.target.value as TicketCategory)}
          >
            {ticketCategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </Field>
        <Field label="Priorytet">
          <Select
            value={priority}
            onChange={(event) => setPriority(event.target.value as TicketPriority)}
          >
            {ticketPriorities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Select>
        </Field>
        <Field label="Dział">
          <Select
            value={departmentId}
            onChange={(event) => {
              setDepartmentId(event.target.value);
              setAssigneeId("");
            }}
          >
            {departments.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Osoba (opcjonalnie)">
          <Select value={assigneeId} onChange={(event) => setAssigneeId(event.target.value)}>
            <option value="">Nieprzypisana</option>
            {availablePeople.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Asset (opcjonalnie)">
          <Select value={assetId} onChange={(event) => setAssetId(event.target.value)}>
            <option value="">Brak</option>
            {initialAssets.map((asset) => (
              <option key={asset.id} value={asset.id}>
                {asset.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Załącznik (mock)">
          <Input
            type="file"
            onChange={(event) => setAttachment(event.target.files?.[0]?.name ?? "")}
          />
        </Field>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Anuluj
          </Button>
        </DialogClose>
        <Button type="submit">
          <Plus />
          Utwórz zgłoszenie
        </Button>
      </DialogFooter>
    </form>
  );
}
function CommentForm({ onSubmit }: { onSubmit: (body: string) => void }) {
  const [body, setBody] = useState("");
  return (
    <form
      className="mt-3 flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        if (!body.trim()) return;
        onSubmit(body);
        setBody("");
      }}
    >
      <Input
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Dodaj komentarz…"
      />
      <Button type="submit" size="sm">
        <MessageSquare />
        Dodaj
      </Button>
    </form>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="space-y-2 text-sm font-medium">
      <span>{label}</span>
      {children}
    </label>
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

export { TicketForm };
