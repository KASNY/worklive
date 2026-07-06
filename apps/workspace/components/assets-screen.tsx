"use client";

import {
  Boxes,
  Calendar,
  Car,
  ChevronRight,
  CircleUserRound,
  FileText,
  Laptop,
  MapPin,
  MoreHorizontal,
  PackagePlus,
  Pencil,
  Printer,
  ScanLine,
  Search,
  ShieldCheck,
  Smartphone,
  Ticket,
  Trash2,
  Upload,
  Wrench,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { type FormEvent, useMemo, useState } from "react";

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
} from "@worklive/ui";

import { WorkspaceShell } from "@/components/workspace-shell";
import { TicketForm } from "@/components/tickets-screen";
import {
  type Asset,
  type AssetStatus,
  type AssetType,
  assetStatuses,
  assetTypes,
  initialAssets,
  people,
} from "@/lib/assets-data";
import { getLocationPathLabel, initialLocations, locationOptions } from "@/lib/locations-data";
import { initialInventoryMovements, initialInventoryProducts } from "@/lib/inventory-data";
import {
  type AssetDocument,
  type DocumentType,
  documentAuthors,
  documentTypes,
  initialDocuments,
} from "@/lib/documents-data";
import { getWarrantyDaysLeft, getWarrantyStatus, type WarrantyStatus } from "@/lib/warranty-data";
import { initialTickets } from "@/lib/tickets-data";

const typeIcons = {
  Maszyna: Wrench,
  Laptop,
  Telefon: Smartphone,
  Narzędzie: Wrench,
  Drukarka: Printer,
  Skaner: ScanLine,
  Pojazd: Car,
} satisfies Record<AssetType, typeof Wrench>;

function statusVariant(status: AssetStatus) {
  if (status === "Aktywny") return "success";
  if (status === "W serwisie") return "warning";
  return "muted";
}

function warrantyVariant(status: WarrantyStatus) {
  if (status === "Aktywna") return "success";
  if (status === "Kończy się") return "warning";
  return "muted";
}

type AssetFormValues = Pick<
  Asset,
  | "name"
  | "type"
  | "status"
  | "internalCode"
  | "serialNumber"
  | "locationId"
  | "responsiblePerson"
  | "purchaseDate"
  | "warrantyUntil"
>;
const emptyForm: AssetFormValues = {
  name: "",
  type: "Maszyna",
  status: "Aktywny",
  internalCode: "",
  serialNumber: "",
  locationId: "loc-hall-a",
  responsiblePerson: "Nieprzypisany",
  purchaseDate: "",
  warrantyUntil: "",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="space-y-2 text-sm font-medium">
      <span>{label}</span>
      {children}
    </label>
  );
}

function AssetForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: Asset;
  submitLabel: string;
  onSubmit: (values: AssetFormValues) => void;
}) {
  const [values, setValues] = useState<AssetFormValues>(
    initial
      ? {
          name: initial.name,
          type: initial.type,
          status: initial.status,
          internalCode: initial.internalCode,
          serialNumber: initial.serialNumber,
          locationId: initial.locationId,
          responsiblePerson: initial.responsiblePerson,
          purchaseDate: initial.purchaseDate,
          warrantyUntil: initial.warrantyUntil,
        }
      : emptyForm,
  );
  const set = <K extends keyof AssetFormValues>(key: K, value: AssetFormValues[K]) =>
    setValues((current) => ({ ...current, [key]: value }));
  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nazwa zasobu">
          <Input
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            required
            placeholder="np. Frezarka CNC-04"
          />
        </Field>
        <Field label="Kod wewnętrzny">
          <Input
            value={values.internalCode}
            onChange={(e) => set("internalCode", e.target.value)}
            required
            placeholder="np. MCH-CNC-004"
          />
        </Field>
        <Field label="Typ">
          <Select value={values.type} onChange={(e) => set("type", e.target.value as AssetType)}>
            {assetTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
        </Field>
        <Field label="Status">
          <Select
            value={values.status}
            onChange={(e) => set("status", e.target.value as AssetStatus)}
          >
            {assetStatuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </Select>
        </Field>
        <Field label="Numer seryjny">
          <Input
            value={values.serialNumber}
            onChange={(e) => set("serialNumber", e.target.value)}
            required
          />
        </Field>
        <Field label="Lokalizacja">
          <Select value={values.locationId} onChange={(e) => set("locationId", e.target.value)}>
            {locationOptions.map((location) => (
              <option key={location.id} value={location.id}>
                {getLocationPathLabel(location.id)}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Osoba odpowiedzialna">
          <Select
            value={values.responsiblePerson}
            onChange={(e) => set("responsiblePerson", e.target.value)}
          >
            {people.map((person) => (
              <option key={person}>{person}</option>
            ))}
          </Select>
        </Field>
        <Field label="Data zakupu">
          <Input
            type="date"
            value={values.purchaseDate}
            onChange={(e) => set("purchaseDate", e.target.value)}
            required
          />
        </Field>
        <Field label="Gwarancja do">
          <Input
            type="date"
            value={values.warrantyUntil}
            onChange={(e) => set("warrantyUntil", e.target.value)}
          />
        </Field>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Anuluj
          </Button>
        </DialogClose>
        <Button type="submit">{submitLabel}</Button>
      </DialogFooter>
    </form>
  );
}

function InfoBlock({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-xl border bg-card p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

function AssetDocumentForm({
  assetId,
  onSubmit,
}: {
  assetId: string;
  onSubmit: (document: AssetDocument) => void;
}) {
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState("");
  const [type, setType] = useState<DocumentType>("Instrukcja");
  const [author, setAuthor] = useState(documentAuthors[0] ?? "Anna Nowak");

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          id: `doc-${Date.now()}`,
          name,
          fileName,
          type,
          author,
          assetId,
          size: "1,2 MB",
          addedAt: new Date().toISOString().slice(0, 10),
          description: "Dokument dodany z poziomu szczegółów zasobu.",
        });
      }}
    >
      <Field label="Nazwa dokumentu">
        <Input value={name} onChange={(event) => setName(event.target.value)} required />
      </Field>
      <Field label="Plik (mock)">
        <Input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
          required
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Typ">
          <Select value={type} onChange={(event) => setType(event.target.value as DocumentType)}>
            {documentTypes.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </Select>
        </Field>
        <Field label="Autor">
          <Select value={author} onChange={(event) => setAuthor(event.target.value)}>
            {documentAuthors.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </Select>
        </Field>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Anuluj
          </Button>
        </DialogClose>
        <Button type="submit">
          <Upload /> Dodaj dokument
        </Button>
      </DialogFooter>
    </form>
  );
}

export function AssetsScreen() {
  const [assets, setAssets] = useState(initialAssets);
  const [documents, setDocuments] = useState(initialDocuments);
  const [tickets, setTickets] = useState(initialTickets);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Wszystkie");
  const [status, setStatus] = useState("Wszystkie");
  const [location, setLocation] = useState("Wszystkie");
  const [person, setPerson] = useState("Wszyscy");
  const [selected, setSelected] = useState<Asset | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [personOpen, setPersonOpen] = useState(false);
  const [documentOpen, setDocumentOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [qrNotice, setQrNotice] = useState("");
  const [nextLocation, setNextLocation] = useState<string>(locationOptions[0]?.id ?? "");
  const [nextPerson, setNextPerson] = useState<string>(people[0] ?? "");

  const selectedDocuments = selected
    ? documents.filter((document) => document.assetId === selected.id)
    : [];
  const selectedTickets = selected
    ? tickets.filter((ticket) => ticket.assetId === selected.id)
    : [];
  const selectedInventoryMovements = selected
    ? initialInventoryMovements.filter(
        (movement) => movement.assetId === selected.id && movement.type === "Wydanie",
      )
    : [];

  const filtered = useMemo(
    () =>
      assets.filter((asset) => {
        const phrase = query.trim().toLowerCase();
        const matchesQuery =
          !phrase ||
          [asset.name, asset.internalCode, asset.serialNumber, asset.responsiblePerson].some(
            (value) => value.toLowerCase().includes(phrase),
          );
        return (
          matchesQuery &&
          (type === "Wszystkie" || asset.type === type) &&
          (status === "Wszystkie" || asset.status === status) &&
          (location === "Wszystkie" || asset.locationId === location) &&
          (person === "Wszyscy" || asset.responsiblePerson === person)
        );
      }),
    [assets, location, person, query, status, type],
  );

  const hasFilters = Boolean(
    query ||
    type !== "Wszystkie" ||
    status !== "Wszystkie" ||
    location !== "Wszystkie" ||
    person !== "Wszyscy",
  );
  const clearFilters = () => {
    setQuery("");
    setType("Wszystkie");
    setStatus("Wszystkie");
    setLocation("Wszystkie");
    setPerson("Wszyscy");
  };
  const updateSelected = (updated: Asset) => {
    setAssets((items) => items.map((item) => (item.id === updated.id ? updated : item)));
    setSelected(updated);
  };

  function addAsset(values: AssetFormValues) {
    const asset: Asset = {
      ...values,
      id: `asset-${Date.now()}`,
      qrCode: `AST-${String(
        Math.max(0, ...assets.map((item) => Number(item.qrCode.replace("AST-", "")) || 0)) + 1,
      ).padStart(4, "0")}`,
      lastActivity: "Przed chwilą",
      documentsCount: 0,
      ticketsCount: 0,
      activity: [
        { title: "Utworzono zasób", detail: "Anna Nowak dodała zasób", date: "Przed chwilą" },
      ],
    };
    setAssets((items) => [asset, ...items]);
    setAddOpen(false);
    setSelected(asset);
  }

  return (
    <WorkspaceShell>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>NovaTech</span>
            <ChevronRight className="size-3.5" />
            <span>Zasoby</span>
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.04em]">Assets</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Zarządzaj maszynami, urządzeniami, narzędziami i wyposażeniem firmy w jednym miejscu.
          </p>
        </div>
        <Button size="lg" onClick={() => setAddOpen(true)}>
          <PackagePlus /> Add Asset
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="border-b p-4 sm:p-5">
          <div className="flex flex-col gap-3 xl:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Szukaj po nazwie, kodzie, numerze seryjnym…"
                className="pl-10"
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                aria-label="Filtr typu"
              >
                <option>Wszystkie</option>
                {assetTypes.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </Select>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                aria-label="Filtr statusu"
              >
                <option>Wszystkie</option>
                {assetStatuses.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </Select>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Filtr lokalizacji"
              >
                <option>Wszystkie</option>
                {locationOptions.map((value) => (
                  <option key={value.id} value={value.id}>
                    {getLocationPathLabel(value.id)}
                  </option>
                ))}
              </Select>
              <Select
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                aria-label="Filtr osoby"
              >
                <option>Wszyscy</option>
                {people.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {filtered.length} z {assets.length} zasobów
            </span>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Wyczyść filtry
              </Button>
            )}
          </div>
        </div>

        {filtered.length ? (
          <div className="overflow-x-auto">
            <Table className="min-w-[980px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Zasób</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Lokalizacja</TableHead>
                  <TableHead>Odpowiedzialny</TableHead>
                  <TableHead>Gwarancja</TableHead>
                  <TableHead>Aktywność</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((asset) => {
                  const Icon = typeIcons[asset.type];
                  return (
                    <TableRow
                      key={asset.id}
                      onClick={() => setSelected(asset)}
                      className="cursor-pointer"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="size-[18px]" />
                          </span>
                          <div>
                            <p className="font-semibold">{asset.name}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {asset.internalCode} · {asset.type}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(asset.status)}>{asset.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2 text-sm">
                          <MapPin className="size-4 text-muted-foreground" />
                          {getLocationPathLabel(asset.locationId).split(" → ").at(-1)}
                        </span>
                      </TableCell>
                      <TableCell>{asset.responsiblePerson}</TableCell>
                      <TableCell>
                        <Badge variant={warrantyVariant(getWarrantyStatus(asset))}>
                          {getWarrantyStatus(asset)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{asset.lastActivity}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" aria-label={`Otwórz ${asset.name}`}>
                          <MoreHorizontal />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState
            icon={<Boxes />}
            title={assets.length ? "Brak pasujących zasobów" : "Dodaj pierwszy zasób"}
            description={
              assets.length
                ? "Zmień kryteria wyszukiwania lub wyczyść aktywne filtry."
                : "Zacznij budować uporządkowaną ewidencję zasobów firmy."
            }
            action={
              assets.length ? (
                <Button variant="outline" onClick={clearFilters}>
                  Wyczyść filtry
                </Button>
              ) : (
                <Button onClick={() => setAddOpen(true)}>
                  <PackagePlus /> Add Asset
                </Button>
              )
            }
          />
        )}
      </Card>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <SheetContent>
            <SheetHeader>
              <div className="mb-3 flex items-center gap-2">
                <Badge>{selected.type}</Badge>
                <Badge variant={statusVariant(selected.status)}>{selected.status}</Badge>
              </div>
              <SheetTitle>{selected.name}</SheetTitle>
              <SheetDescription>
                {selected.internalCode} · {selected.serialNumber}
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-7 px-6 py-6">
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => setEditOpen(true)}>
                  <Pencil /> Edit Asset
                </Button>
                <Button size="sm" variant="outline" onClick={() => setDocumentOpen(true)}>
                  <Upload /> Add Document
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNextLocation(selected.locationId);
                    setLocationOpen(true);
                  }}
                >
                  <MapPin /> Change Location
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setNextPerson(selected.responsiblePerson);
                    setPersonOpen(true);
                  }}
                >
                  <CircleUserRound /> Assign Person
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash2 /> Delete
                </Button>
              </div>
              <section>
                <h3 className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Overview
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <InfoBlock
                    icon={MapPin}
                    label="Pełna lokalizacja"
                    value={getLocationPathLabel(selected.locationId)}
                  />
                  <InfoBlock
                    icon={CircleUserRound}
                    label="Osoba odpowiedzialna"
                    value={selected.responsiblePerson}
                  />
                  <InfoBlock icon={Calendar} label="Data zakupu" value={selected.purchaseDate} />
                  <InfoBlock
                    icon={Calendar}
                    label="Gwarancja do"
                    value={selected.warrantyUntil || "Brak daty"}
                  />
                </div>
              </section>
              <section className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                      <ShieldCheck className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">Warranty</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {selected.warrantyUntil
                          ? `Ochrona do ${selected.warrantyUntil}`
                          : "Brak informacji o gwarancji"}
                      </p>
                    </div>
                  </div>
                  <Badge variant={warrantyVariant(getWarrantyStatus(selected))}>
                    {getWarrantyStatus(selected)}
                    {getWarrantyStatus(selected) === "Kończy się" &&
                      ` · ${getWarrantyDaysLeft(selected) ?? 0} dni`}
                  </Badge>
                </div>
                {selectedDocuments.find((document) => document.type === "Faktura") ? (
                  <div className="mt-4 flex items-center gap-3 rounded-xl border bg-card p-3">
                    <FileText className="size-4 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {selectedDocuments.find((document) => document.type === "Faktura")?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">Faktura powiązana z gwarancją</p>
                    </div>
                    <Badge variant="muted">Faktura</Badge>
                  </div>
                ) : (
                  <p className="mt-4 text-xs text-muted-foreground">
                    Brak faktury powiązanej z gwarancją.
                  </p>
                )}
              </section>
              <section className="grid gap-4 sm:grid-cols-[150px_1fr]">
                <div className="grid aspect-square place-items-center rounded-2xl border bg-white p-4 text-slate-900 shadow-sm">
                  <QRCodeSVG
                    value={`worklive://asset/${selected.qrCode}`}
                    size={116}
                    level="M"
                    marginSize={1}
                    aria-label={`Kod QR zasobu ${selected.qrCode}`}
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Szybki dostęp QR</h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Zeskanuj kod albo użyj identyfikatora zasobu.
                  </p>
                  <code className="block rounded-lg bg-muted px-3 py-2 text-sm font-bold tracking-wider">
                    {selected.qrCode}
                  </code>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        await navigator.clipboard.writeText(selected.qrCode);
                        setQrNotice("Kod skopiowany");
                      }}
                    >
                      Copy code
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQrNotice("Download QR będzie dostępny w kolejnym etapie")}
                    >
                      Download QR
                    </Button>
                  </div>
                  {qrNotice && <p className="text-xs text-primary">{qrNotice}</p>}
                </div>
              </section>
              <section>
                <h3 className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Dokumenty
                </h3>
                {selectedDocuments.length ? (
                  <div className="space-y-2">
                    {selectedDocuments.map((document) => (
                      <div
                        key={document.id}
                        className="flex items-center gap-3 rounded-xl border p-3"
                      >
                        <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                          <FileText className="size-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{document.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {document.addedAt} · {document.author}
                          </p>
                        </div>
                        <Badge variant="muted">{document.type}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<FileText />}
                    title="Brak dokumentów"
                    description="Dodaj instrukcję, fakturę lub inny plik do tego zasobu."
                    className="rounded-xl border py-9"
                    action={
                      <Button size="sm" onClick={() => setDocumentOpen(true)}>
                        <Upload /> Add Document
                      </Button>
                    }
                  />
                )}
              </section>
              <section>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    Zgłoszenia
                  </h3>
                  <Button size="sm" variant="outline" onClick={() => setTicketOpen(true)}>
                    <Ticket /> Zgłoś problem z tym zasobem
                  </Button>
                </div>
                {selectedTickets.length ? (
                  <div className="space-y-2">
                    {selectedTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex items-center gap-3 rounded-xl border p-3"
                      >
                        <Ticket className="size-4 text-amber-500" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{ticket.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {ticket.code} · {ticket.priority}
                          </p>
                        </div>
                        <Badge variant={ticket.status === "Rozwiązane" ? "success" : "warning"}>
                          {ticket.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<Ticket />}
                    title="Brak zgłoszeń"
                    description="Ten zasób nie ma jeszcze powiązanych problemów."
                    className="rounded-xl border py-9"
                  />
                )}
              </section>
              <section>
                <h3 className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Zużyte części · historia wymian
                </h3>
                {selectedInventoryMovements.length ? (
                  <div className="space-y-2">
                    {selectedInventoryMovements.map((movement) => {
                      const product = initialInventoryProducts.find(
                        (item) => item.id === movement.productId,
                      );
                      return (
                        <div
                          key={movement.id}
                          className="flex items-center gap-3 rounded-xl border p-3"
                        >
                          <Boxes className="size-4 text-primary" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold">
                              {product?.name ?? "Produkt magazynowy"}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {movement.description} · {movement.date}
                            </p>
                          </div>
                          <Badge variant="muted">
                            {Math.abs(movement.quantity)} {product?.unit ?? "szt."}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    icon={<Boxes />}
                    title="Brak zużytych części"
                    description="Wydania magazynowe powiązane z tym Asset pojawią się tutaj."
                    className="rounded-xl border py-9"
                  />
                )}
              </section>
              <section>
                <h3 className="mb-4 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Activity timeline
                </h3>
                <div className="space-y-0">
                  {selected.activity.map((event, index) => (
                    <div key={`${event.title}-${event.date}`} className="relative flex gap-3 pb-5">
                      <span className="relative z-10 mt-1.5 size-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/10" />
                      {index !== selected.activity.length - 1 && (
                        <span className="absolute top-4 left-[4px] h-full w-px bg-border" />
                      )}
                      <div>
                        <p className="text-sm font-semibold">{event.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{event.detail}</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </SheetContent>
        )}
      </Sheet>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Asset</DialogTitle>
            <DialogDescription>Dodaj nowy zasób do workspace NovaTech.</DialogDescription>
          </DialogHeader>
          <AssetForm submitLabel="Dodaj zasób" onSubmit={addAsset} />
        </DialogContent>
      </Dialog>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        {selected && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Asset</DialogTitle>
              <DialogDescription>
                Zaktualizuj dane zasobu. Zmiany są tylko lokalnym mockiem.
              </DialogDescription>
            </DialogHeader>
            <AssetForm
              key={selected.id}
              initial={selected}
              submitLabel="Zapisz zmiany"
              onSubmit={(values) => {
                updateSelected({ ...selected, ...values, lastActivity: "Przed chwilą" });
                setEditOpen(false);
              }}
            />
          </DialogContent>
        )}
      </Dialog>
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        {selected && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Usunąć zasób?</DialogTitle>
              <DialogDescription>
                „{selected.name}” zostanie usunięty z lokalnej listy. Ta operacja demonstracyjna nie
                może zostać cofnięta.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Anuluj</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={() => {
                  setAssets((items) => items.filter((item) => item.id !== selected.id));
                  setDeleteOpen(false);
                  setSelected(null);
                }}
              >
                Usuń zasób
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      <Dialog open={locationOpen} onOpenChange={setLocationOpen}>
        {selected && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Change Location</DialogTitle>
              <DialogDescription>Wybierz nową lokalizację dla {selected.name}.</DialogDescription>
            </DialogHeader>
            <Select value={nextLocation} onChange={(e) => setNextLocation(e.target.value)}>
              {locationOptions.map((value) => (
                <option key={value.id} value={value.id}>
                  {getLocationPathLabel(value.id, initialLocations)}
                </option>
              ))}
            </Select>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Anuluj</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  updateSelected({
                    ...selected,
                    locationId: nextLocation,
                    lastActivity: "Przed chwilą",
                  });
                  setLocationOpen(false);
                }}
              >
                Zmień lokalizację
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      <Dialog open={personOpen} onOpenChange={setPersonOpen}>
        {selected && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Person</DialogTitle>
              <DialogDescription>
                Przypisz osobę odpowiedzialną za {selected.name}.
              </DialogDescription>
            </DialogHeader>
            <Select value={nextPerson} onChange={(e) => setNextPerson(e.target.value)}>
              {people.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Anuluj</Button>
              </DialogClose>
              <Button
                onClick={() => {
                  updateSelected({
                    ...selected,
                    responsiblePerson: nextPerson,
                    lastActivity: "Przed chwilą",
                  });
                  setPersonOpen(false);
                }}
              >
                Przypisz osobę
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      <Dialog open={documentOpen} onOpenChange={setDocumentOpen}>
        {selected && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Document</DialogTitle>
              <DialogDescription>Dodaj mockowany dokument do {selected.name}.</DialogDescription>
            </DialogHeader>
            <AssetDocumentForm
              assetId={selected.id}
              onSubmit={(document) => {
                setDocuments((items) => [document, ...items]);
                setDocumentOpen(false);
              }}
            />
          </DialogContent>
        )}
      </Dialog>
      <Dialog open={ticketOpen} onOpenChange={setTicketOpen}>
        {selected && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Zgłoś problem z tym zasobem</DialogTitle>
              <DialogDescription>
                {selected.name} zostanie ustawiony jako powiązany Asset.
              </DialogDescription>
            </DialogHeader>
            <TicketForm
              initialAssetId={selected.id}
              onSubmit={(ticket) => {
                setTickets((items) => [ticket, ...items]);
                setTicketOpen(false);
              }}
            />
          </DialogContent>
        )}
      </Dialog>
    </WorkspaceShell>
  );
}
