"use client";

import {
  AlertTriangle,
  Calendar,
  ChevronRight,
  Download,
  FileBadge,
  FileImage,
  FileText,
  Link2,
  Paperclip,
  Plus,
  Search,
  ShieldCheck,
  Upload,
  UserRound,
} from "lucide-react";
import { type FormEvent, type ReactNode, useMemo, useState } from "react";

import {
  Badge,
  Button,
  Card,
  CardContent,
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
import { initialAssets } from "@/lib/assets-data";
import {
  type AssetDocument,
  type DocumentType,
  documentAuthors,
  documentTypes,
  initialDocuments,
} from "@/lib/documents-data";
import { getWarrantyDaysLeft, getWarrantyStatus } from "@/lib/warranty-data";

const typeIcon: Record<DocumentType, typeof FileText> = {
  Instrukcja: FileText,
  Faktura: FileBadge,
  Certyfikat: ShieldCheck,
  Zdjęcie: FileImage,
  Umowa: Paperclip,
  Inny: FileText,
};

type UploadValues = Pick<AssetDocument, "name" | "type" | "author" | "assetId" | "description"> & {
  fileName: string;
};

export function DocumentsScreen() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [selected, setSelected] = useState<AssetDocument | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Wszystkie");
  const [assetId, setAssetId] = useState("Wszystkie");
  const [date, setDate] = useState("Wszystkie");
  const [author, setAuthor] = useState("Wszyscy");

  const filtered = useMemo(() => {
    const now = new Date();
    return documents.filter((document) => {
      const phrase = query.trim().toLowerCase();
      const age = (now.getTime() - new Date(document.addedAt).getTime()) / 86_400_000;
      const matchesDate =
        date === "Wszystkie" ||
        (date === "30 dni" && age <= 30) ||
        (date === "90 dni" && age <= 90) ||
        (date === "Starsze" && age > 90);
      return (
        (!phrase ||
          [document.name, document.fileName, document.author].some((value) =>
            value.toLowerCase().includes(phrase),
          )) &&
        (type === "Wszystkie" || document.type === type) &&
        (assetId === "Wszystkie" || document.assetId === assetId) &&
        (author === "Wszyscy" || document.author === author) &&
        matchesDate
      );
    });
  }, [assetId, author, date, documents, query, type]);

  const expiring = initialAssets.filter((asset) => getWarrantyStatus(asset) === "Kończy się");
  const linkedAsset = selected
    ? initialAssets.find((asset) => asset.id === selected.assetId)
    : undefined;

  function upload(values: UploadValues) {
    const document: AssetDocument = {
      ...values,
      id: `doc-${Date.now()}`,
      size: "1,2 MB",
      addedAt: new Date().toISOString().slice(0, 10),
    };
    setDocuments((items) => [document, ...items]);
    setUploadOpen(false);
    setSelected(document);
  }

  return (
    <WorkspaceShell>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>NovaTech</span>
            <ChevronRight className="size-3.5" />
            <span>Dokumenty</span>
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.04em]">Documents</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Instrukcje, faktury, certyfikaty i pozostałe pliki powiązane z zasobami firmy.
          </p>
        </div>
        <Button size="lg" onClick={() => setUploadOpen(true)}>
          <Upload /> Upload Document
        </Button>
      </div>

      <Card className="mb-6 border-amber-500/25 bg-amber-500/[0.04]">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-semibold">Kończące się gwarancje</h2>
              <Badge variant="warning">{expiring.length}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {expiring.length
                ? expiring
                    .map((asset) => `${asset.name} · ${getWarrantyDaysLeft(asset) ?? 0} dni`)
                    .join(", ")
                : "Brak gwarancji kończących się w ciągu 90 dni."}
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/assets">Zobacz w Assets</a>
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <div className="border-b p-4 sm:p-5">
          <div className="grid gap-3 xl:grid-cols-[1fr_repeat(4,minmax(150px,auto))]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Szukaj dokumentów…"
                className="pl-10"
              />
            </div>
            <Select value={type} onChange={(event) => setType(event.target.value)} aria-label="Typ">
              <option>Wszystkie</option>
              {documentTypes.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
            <Select
              value={assetId}
              onChange={(event) => setAssetId(event.target.value)}
              aria-label="Zasób"
            >
              <option>Wszystkie</option>
              {initialAssets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.name}
                </option>
              ))}
            </Select>
            <Select
              value={date}
              onChange={(event) => setDate(event.target.value)}
              aria-label="Data"
            >
              <option>Wszystkie</option>
              <option>30 dni</option>
              <option>90 dni</option>
              <option>Starsze</option>
            </Select>
            <Select
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              aria-label="Autor"
            >
              <option>Wszyscy</option>
              {documentAuthors.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {filtered.length} z {documents.length} dokumentów
          </p>
        </div>

        {filtered.length ? (
          <div className="overflow-x-auto">
            <Table className="min-w-[900px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Dokument</TableHead>
                  <TableHead>Typ</TableHead>
                  <TableHead>Powiązany zasób</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Rozmiar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((document) => {
                  const Icon = typeIcon[document.type];
                  const asset = initialAssets.find((item) => item.id === document.assetId);
                  return (
                    <TableRow
                      key={document.id}
                      className="cursor-pointer"
                      onClick={() => setSelected(document)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="size-[18px]" />
                          </span>
                          <div>
                            <p className="font-semibold">{document.name}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {document.fileName}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge>{document.type}</Badge>
                      </TableCell>
                      <TableCell>{asset?.name ?? "Dokument ogólny"}</TableCell>
                      <TableCell>{document.addedAt}</TableCell>
                      <TableCell>{document.author}</TableCell>
                      <TableCell className="text-muted-foreground">{document.size}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState
            icon={<FileText />}
            title="Brak dokumentów"
            description="Zmień aktywne filtry albo dodaj pierwszy dokument."
            action={
              <Button onClick={() => setUploadOpen(true)}>
                <Plus /> Upload Document
              </Button>
            }
          />
        )}
      </Card>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <SheetContent>
            <SheetHeader>
              <div className="mb-3 flex gap-2">
                <Badge>{selected.type}</Badge>
                {linkedAsset && <Badge variant="muted">Asset</Badge>}
              </div>
              <SheetTitle>{selected.name}</SheetTitle>
              <SheetDescription>
                {selected.fileName} · {selected.size}
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-6 p-6">
              <div className="grid min-h-48 place-items-center rounded-2xl border border-dashed bg-muted/30">
                <div className="text-center">
                  <FileText className="mx-auto size-10 text-primary" />
                  <p className="mt-3 text-sm font-semibold">Podgląd dokumentu</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Placeholder bez rzeczywistego pliku
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Detail icon={<Calendar />} label="Data dodania" value={selected.addedAt} />
                <Detail icon={<UserRound />} label="Autor" value={selected.author} />
                <Detail
                  icon={<Link2 />}
                  label="Powiązany zasób"
                  value={linkedAsset?.name ?? "Brak powiązania"}
                />
                <Detail icon={<FileBadge />} label="Typ" value={selected.type} />
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Opis
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {selected.description || "Brak opisu."}
                </p>
              </div>
              <Button variant="outline" onClick={() => undefined}>
                <Download /> Pobierz plik (placeholder)
              </Button>
            </div>
          </SheetContent>
        )}
      </Sheet>

      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>
              Dodaj mockowany plik i opcjonalnie powiąż go z zasobem.
            </DialogDescription>
          </DialogHeader>
          <UploadForm onSubmit={upload} />
        </DialogContent>
      </Dialog>
    </WorkspaceShell>
  );
}

function UploadForm({ onSubmit }: { onSubmit: (values: UploadValues) => void }) {
  const [values, setValues] = useState<UploadValues>({
    name: "",
    type: "Instrukcja",
    fileName: "",
    author: "Anna Nowak",
    assetId: null,
    description: "",
  });
  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit(values);
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block space-y-2 text-sm font-medium">
        <span>Nazwa dokumentu</span>
        <Input
          required
          value={values.name}
          onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
        />
      </label>
      <label className="block space-y-2 text-sm font-medium">
        <span>Plik (mock)</span>
        <Input
          type="file"
          required
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={(event) =>
            setValues((current) => ({
              ...current,
              fileName: event.target.files?.[0]?.name ?? "",
            }))
          }
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          <span>Typ</span>
          <Select
            value={values.type}
            onChange={(event) =>
              setValues((current) => ({ ...current, type: event.target.value as DocumentType }))
            }
          >
            {documentTypes.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </Select>
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Autor</span>
          <Select
            value={values.author}
            onChange={(event) =>
              setValues((current) => ({ ...current, author: event.target.value }))
            }
          >
            {documentAuthors.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </Select>
        </label>
      </div>
      <label className="block space-y-2 text-sm font-medium">
        <span>Powiązany zasób</span>
        <Select
          value={values.assetId ?? ""}
          onChange={(event) =>
            setValues((current) => ({ ...current, assetId: event.target.value || null }))
          }
        >
          <option value="">Bez powiązania</option>
          {initialAssets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.name}
            </option>
          ))}
        </Select>
      </label>
      <label className="block space-y-2 text-sm font-medium">
        <span>Opis</span>
        <Input
          value={values.description}
          onChange={(event) =>
            setValues((current) => ({ ...current, description: event.target.value }))
          }
        />
      </label>
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
