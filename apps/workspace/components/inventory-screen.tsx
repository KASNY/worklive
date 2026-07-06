"use client";

import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpFromLine,
  Boxes,
  ClipboardCheck,
  Copy,
  Download,
  History,
  MapPin,
  PackageCheck,
  QrCode,
  Search,
  Settings2,
  Warehouse,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
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
  Textarea,
} from "@worklive/ui";

import { WorkspaceShell } from "@/components/workspace-shell";
import { initialAssets } from "@/lib/assets-data";
import { departments, people } from "@/lib/organization-data";
import { projects } from "@/lib/mock-data";
import { initialTickets } from "@/lib/tickets-data";
import {
  initialInventoryMovements,
  initialInventoryProducts,
  inventoryCategories,
  inventoryLocations,
  inventoryStatus,
  type InventoryMovement,
  type InventoryOperation,
  type InventoryProduct,
  type InventoryStatus,
} from "@/lib/inventory-data";

const operations: Array<{ type: InventoryOperation; icon: typeof PackageCheck }> = [
  { type: "Przyjęcie", icon: ArrowDownToLine },
  { type: "Wydanie", icon: ArrowUpFromLine },
  { type: "Przesunięcie", icon: ArrowLeftRight },
  { type: "Rezerwacja", icon: PackageCheck },
  { type: "Korekta", icon: Settings2 },
  { type: "Inwentaryzacja", icon: ClipboardCheck },
];

type OperationValues = {
  productId: string;
  quantity: number;
  location: string;
  fromLocation: string;
  toLocation: string;
  supplier: string;
  documentNumber: string;
  recipient: string;
  department: string;
  project: string;
  ticketId: string;
  assetId: string;
  qr: string;
  person: string;
  notes: string;
};

function statusVariant(status: InventoryStatus) {
  if (status === "Dostępny") return "success";
  if (status === "Niski stan" || status === "W drodze") return "warning";
  return "muted";
}

export function InventoryScreen() {
  const [products, setProducts] = useState(initialInventoryProducts);
  const [movements, setMovements] = useState(initialInventoryMovements);
  const [selected, setSelected] = useState<InventoryProduct | null>(null);
  const [operation, setOperation] = useState<InventoryOperation | null>(null);
  const [qrProduct, setQrProduct] = useState<InventoryProduct | null>(null);
  const [qrNotice, setQrNotice] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Wszystkie");
  const [status, setStatus] = useState("Wszystkie");
  const [category, setCategory] = useState("Wszystkie");
  const [department, setDepartment] = useState("Wszystkie");

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const phrase = query.trim().toLowerCase();
        return (
          (!phrase ||
            [product.name, product.code, product.sku, product.qrCode].some((value) =>
              value.toLowerCase().includes(phrase),
            )) &&
          (location === "Wszystkie" || product.location === location) &&
          (status === "Wszystkie" || inventoryStatus(product) === status) &&
          (category === "Wszystkie" || product.category === category) &&
          (department === "Wszystkie" || product.department === department)
        );
      }),
    [category, department, location, products, query, status],
  );

  const lowStock = products.filter(
    (product) => inventoryStatus(product) === "Niski stan" || inventoryStatus(product) === "Brak",
  );
  const productMovements = selected
    ? movements.filter((movement) => movement.productId === selected.id)
    : [];

  function performOperation(type: InventoryOperation, values: OperationValues) {
    const product = products.find((item) => item.id === values.productId);
    if (!product) return;
    let nextQuantity = product.quantity;
    let nextLocation = product.location;
    let movementQuantity = values.quantity;
    let description: string;
    let reservedQuantity = product.reservedQuantity;
    let inTransitQuantity = product.inTransitQuantity;

    if (type === "Przyjęcie") {
      nextQuantity += values.quantity;
      nextLocation = values.location;
      inTransitQuantity = Math.max(0, inTransitQuantity - values.quantity);
      description = values.notes || `Przyjęcie od ${values.supplier}`;
    } else if (type === "Wydanie") {
      nextQuantity -= values.quantity;
      movementQuantity = -values.quantity;
      description = values.notes || `Wydanie dla ${values.recipient}`;
    } else if (type === "Przesunięcie") {
      nextLocation = values.toLocation;
      description = values.notes || `Przesunięcie: ${values.fromLocation} → ${values.toLocation}`;
    } else if (type === "Rezerwacja") {
      reservedQuantity = Math.min(product.quantity, reservedQuantity + values.quantity);
      description =
        values.notes || `Rezerwacja dla ${values.project || values.person || "zgłoszenia"}`;
    } else if (type === "Korekta") {
      movementQuantity = values.quantity - product.quantity;
      nextQuantity = values.quantity;
      description = values.notes;
    } else {
      movementQuantity = values.quantity - product.quantity;
      nextQuantity = values.quantity;
      description = values.notes || `Inwentaryzacja · różnica ${movementQuantity}`;
    }

    const now = "Przed chwilą";
    const updated = {
      ...product,
      quantity: nextQuantity,
      location: nextLocation,
      reservedQuantity,
      inTransitQuantity,
      lastMovement: now,
    };
    const movement: InventoryMovement = {
      id: `mov-${Date.now()}`,
      productId: product.id,
      type,
      quantity: movementQuantity,
      person: "Anna Nowak",
      date: now,
      location: type === "Przesunięcie" ? values.toLocation : values.location || product.location,
      description,
      ...(values.fromLocation ? { fromLocation: values.fromLocation } : {}),
      ...(values.toLocation ? { toLocation: values.toLocation } : {}),
      ...(values.supplier ? { supplier: values.supplier } : {}),
      ...(values.documentNumber ? { documentNumber: values.documentNumber } : {}),
      ...(values.recipient ? { recipient: values.recipient } : {}),
      ...(values.department ? { department: values.department } : {}),
      ...(values.project ? { project: values.project } : {}),
      ...(values.ticketId ? { ticketId: values.ticketId } : {}),
      ...(values.assetId ? { assetId: values.assetId } : {}),
    };
    setProducts((items) => items.map((item) => (item.id === product.id ? updated : item)));
    setMovements((items) => [movement, ...items]);
    setSelected((current) => (current?.id === updated.id ? updated : current));
    setOperation(null);
  }

  return (
    <WorkspaceShell>
      <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>NovaTech</span>
            <span>›</span>
            <span>Magazyn</span>
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.04em]">Inventory</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Stany magazynowe, ruchy, rezerwacje i powiązania operacyjne w jednym widoku.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {operations.map(({ type, icon: Icon }) => (
            <Button
              key={type}
              variant={type === "Przyjęcie" || type === "Wydanie" ? "default" : "outline"}
              size="sm"
              onClick={() => setOperation(type)}
            >
              <Icon />
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Pozycje magazynowe" value={String(products.length)} icon={<Warehouse />} />
        <Metric
          label="Niski stan / brak"
          value={String(lowStock.length)}
          icon={<AlertTriangle />}
          tone="warning"
        />
        <Metric
          label="Nowe przyjęcia"
          value={String(movements.filter((movement) => movement.type === "Przyjęcie").length)}
          icon={<ArrowDownToLine />}
        />
        <Metric
          label="Dzisiejsze wydania"
          value={String(
            movements.filter(
              (movement) => movement.type === "Wydanie" && movement.date.startsWith("Dzisiaj"),
            ).length,
          )}
          icon={<ArrowUpFromLine />}
        />
      </div>

      {lowStock.length > 0 && (
        <Card className="mb-6 border-amber-500/25 bg-amber-500/[0.04]">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 place-items-center rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="size-5" />
            </span>
            <div>
              <p className="font-semibold">Stany wymagające uwagi</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {lowStock
                  .map((product) => `${product.name} (${product.quantity} ${product.unit})`)
                  .join(", ")}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="border-b p-4 sm:p-5">
          <div className="grid gap-3 xl:grid-cols-[1fr_repeat(4,minmax(150px,auto))]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Szukaj po nazwie, kodzie, SKU lub QR…"
                className="pl-10"
              />
            </div>
            <Filter
              value={location}
              onChange={setLocation}
              label="Lokalizacja"
              options={inventoryLocations}
            />
            <Filter
              value={status}
              onChange={setStatus}
              label="Status"
              options={["Dostępny", "Niski stan", "Brak", "Zarezerwowany", "W drodze"]}
            />
            <Filter
              value={category}
              onChange={setCategory}
              label="Kategoria"
              options={inventoryCategories}
            />
            <Filter
              value={department}
              onChange={setDepartment}
              label="Dział"
              options={departments.map((item) => item.name)}
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {filtered.length} z {products.length} pozycji
          </p>
        </div>
        {filtered.length ? (
          <div className="overflow-x-auto">
            <Table className="min-w-[1350px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Nazwa</TableHead>
                  <TableHead>Kod</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>QR</TableHead>
                  <TableHead>Lokalizacja</TableHead>
                  <TableHead>Ilość</TableHead>
                  <TableHead>Jednostka</TableHead>
                  <TableHead>Minimalny stan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ostatni ruch</TableHead>
                  <TableHead>Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((product) => (
                  <TableRow
                    key={product.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(product)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                          <Boxes className="size-[18px]" />
                        </span>
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{product.code}</TableCell>
                    <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                    <TableCell>
                      <button
                        className="font-mono text-xs text-primary hover:underline"
                        onClick={(event) => {
                          event.stopPropagation();
                          setQrNotice("");
                          setQrProduct(product);
                        }}
                      >
                        {product.qrCode}
                      </button>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="size-3.5 text-muted-foreground" />
                        {product.location}
                      </span>
                    </TableCell>
                    <TableCell className="text-base font-bold">{product.quantity}</TableCell>
                    <TableCell>{product.unit}</TableCell>
                    <TableCell>{product.minimumStock}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(inventoryStatus(product))}>
                        {inventoryStatus(product)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{product.lastMovement}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelected(product);
                          }}
                        >
                          Szczegóły
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Pokaż QR ${product.name}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setQrProduct(product);
                          }}
                        >
                          <QrCode />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState
            icon={<Warehouse />}
            title="Brak pozycji magazynowych"
            description="Zmień filtry lub wyszukiwaną frazę."
          />
        )}
      </Card>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <SheetContent>
            <SheetHeader>
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge>{selected.category}</Badge>
                <Badge variant={statusVariant(inventoryStatus(selected))}>
                  {inventoryStatus(selected)}
                </Badge>
              </div>
              <SheetTitle>{selected.name}</SheetTitle>
              <SheetDescription>
                {selected.code} · {selected.sku}
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-7 p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <Detail label="Lokalizacja" value={selected.location} />
                <Detail
                  label="Stan minimalny"
                  value={`${selected.minimumStock} ${selected.unit}`}
                />
                <Detail
                  label="Dostępne"
                  value={`${Math.max(0, selected.quantity - selected.reservedQuantity)} ${selected.unit}`}
                />
                <Detail
                  label="Zarezerwowane"
                  value={`${selected.reservedQuantity} ${selected.unit}`}
                />
              </div>
              <section>
                <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Opis
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {selected.description}
                </p>
              </section>
              <section className="flex items-center gap-4 rounded-2xl border p-4">
                <div className="grid size-24 place-items-center rounded-xl bg-white">
                  <QRCodeSVG
                    value={`worklive://inventory/${selected.qrCode}`}
                    size={78}
                    level="M"
                  />
                </div>
                <div>
                  <p className="font-mono text-sm font-bold">{selected.qrCode}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        await navigator.clipboard.writeText(selected.qrCode);
                        setQrNotice("Kod skopiowany");
                      }}
                    >
                      <Copy />
                      Kopiuj kod
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setQrNotice("Download QR będzie dostępny po integracji storage")
                      }
                    >
                      <Download />
                      Download QR
                    </Button>
                  </div>
                  {qrNotice && <p className="mt-2 text-xs text-primary">{qrNotice}</p>}
                </div>
              </section>
              <Related movements={productMovements} />
              <MovementTimeline movements={productMovements} />
            </div>
          </SheetContent>
        )}
      </Sheet>

      <Dialog open={Boolean(operation)} onOpenChange={(open) => !open && setOperation(null)}>
        {operation && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{operation}</DialogTitle>
              <DialogDescription>
                Operacja zmieni lokalny stan magazynowy i dopisze wpis historii.
              </DialogDescription>
            </DialogHeader>
            <OperationForm
              key={operation}
              type={operation}
              products={products}
              onSubmit={(values) => performOperation(operation, values)}
            />
          </DialogContent>
        )}
      </Dialog>

      <Dialog open={Boolean(qrProduct)} onOpenChange={(open) => !open && setQrProduct(null)}>
        {qrProduct && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>QR produktu</DialogTitle>
              <DialogDescription>{qrProduct.name}</DialogDescription>
            </DialogHeader>
            <div className="grid place-items-center rounded-2xl border bg-white p-6">
              <QRCodeSVG value={`worklive://inventory/${qrProduct.qrCode}`} size={200} level="M" />
              <code className="mt-4 text-sm font-bold text-slate-900">{qrProduct.qrCode}</code>
            </div>
            <div className="mt-5 flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={async () => {
                  await navigator.clipboard.writeText(qrProduct.qrCode);
                  setQrNotice("Kod skopiowany");
                }}
              >
                <Copy />
                Kopiuj kod
              </Button>
              <Button
                variant="outline"
                onClick={() => setQrNotice("Download QR będzie dostępny po integracji storage")}
              >
                <Download />
                Download QR
              </Button>
            </div>
            {qrNotice && <p className="mt-3 text-center text-xs text-primary">{qrNotice}</p>}
          </DialogContent>
        )}
      </Dialog>
    </WorkspaceShell>
  );
}

function OperationForm({
  type,
  products,
  onSubmit,
}: {
  type: InventoryOperation;
  products: InventoryProduct[];
  onSubmit: (values: OperationValues) => void;
}) {
  const first = products[0]!;
  const [values, setValues] = useState<OperationValues>({
    productId: first.id,
    quantity: 1,
    location: first.location,
    fromLocation: first.location,
    toLocation: inventoryLocations.find((item) => item !== first.location) ?? first.location,
    supplier: "",
    documentNumber: "",
    recipient: "",
    department: "",
    project: "",
    ticketId: "",
    assetId: "",
    qr: "",
    person: "",
    notes: "",
  });
  const product = products.find((item) => item.id === values.productId) ?? first;
  const set = <K extends keyof OperationValues>(key: K, value: OperationValues[K]) =>
    setValues((current) => ({ ...current, [key]: value }));
  const stockInvalid =
    ["Wydanie", "Przesunięcie", "Rezerwacja"].includes(type) &&
    values.quantity > Math.max(0, product.quantity - product.reservedQuantity);
  const reservationInvalid =
    type === "Rezerwacja" && !values.project && !values.ticketId && !values.person;
  function changeProduct(productId: string) {
    const next = products.find((item) => item.id === productId) ?? first;
    setValues((current) => ({
      ...current,
      productId,
      location: next.location,
      fromLocation: next.location,
      toLocation: inventoryLocations.find((item) => item !== next.location) ?? next.location,
    }));
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    if (stockInvalid || reservationInvalid) return;
    onSubmit(values);
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Produkt">
        <Select value={values.productId} onChange={(event) => changeProduct(event.target.value)}>
          {products.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} · {item.quantity} {item.unit}
            </option>
          ))}
        </Select>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={
            type === "Korekta" || type === "Inwentaryzacja" ? "Nowa / policzona ilość" : "Ilość"
          }
        >
          <Input
            type="number"
            min={type === "Korekta" || type === "Inwentaryzacja" ? 0 : 1}
            value={values.quantity}
            onChange={(event) => set("quantity", Number(event.target.value))}
            required
          />
          {stockInvalid && (
            <span className="text-xs text-destructive">
              Dostępne: {Math.max(0, product.quantity - product.reservedQuantity)} {product.unit}
            </span>
          )}
        </Field>
        {type === "Przyjęcie" && (
          <>
            <Field label="Lokalizacja">
              <Select
                value={values.location}
                onChange={(event) => set("location", event.target.value)}
              >
                {inventoryLocations.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </Field>
            <Field label="Dostawca">
              <Input
                required
                value={values.supplier}
                onChange={(event) => set("supplier", event.target.value)}
              />
            </Field>
            <Field label="Numer dokumentu">
              <Input
                required
                value={values.documentNumber}
                onChange={(event) => set("documentNumber", event.target.value)}
              />
            </Field>
          </>
        )}
        {type === "Wydanie" && (
          <>
            <Field label="Odbiorca">
              <Input
                required
                value={values.recipient}
                onChange={(event) => set("recipient", event.target.value)}
              />
            </Field>
            <Field label="Dział">
              <Select
                required
                value={values.department}
                onChange={(event) => set("department", event.target.value)}
              >
                <option value="">Wybierz</option>
                {departments.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Projekt">
              <Select
                value={values.project}
                onChange={(event) => set("project", event.target.value)}
              >
                <option value="">Brak</option>
                {projects.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Ticket">
              <Select
                value={values.ticketId}
                onChange={(event) => set("ticketId", event.target.value)}
              >
                <option value="">Brak</option>
                {initialTickets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.code} · {item.title}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Asset">
              <Select
                value={values.assetId}
                onChange={(event) => set("assetId", event.target.value)}
              >
                <option value="">Brak</option>
                {initialAssets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="QR">
              <Input
                value={values.qr}
                onChange={(event) => set("qr", event.target.value)}
                placeholder="Kod odbiorcy lub zasobu"
              />
            </Field>
          </>
        )}
        {type === "Przesunięcie" && (
          <>
            <Field label="Z lokalizacji">
              <Input value={values.fromLocation} readOnly />
            </Field>
            <div className="hidden items-end justify-center pb-3 text-muted-foreground sm:flex">
              ↓
            </div>
            <Field label="Do lokalizacji">
              <Select
                value={values.toLocation}
                onChange={(event) => set("toLocation", event.target.value)}
              >
                {inventoryLocations
                  .filter((item) => item !== values.fromLocation)
                  .map((item) => (
                    <option key={item}>{item}</option>
                  ))}
              </Select>
            </Field>
          </>
        )}
        {type === "Rezerwacja" && (
          <>
            <Field label="Dla projektu">
              <Select
                value={values.project}
                onChange={(event) => set("project", event.target.value)}
              >
                <option value="">Brak</option>
                {projects.map((item) => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Dla ticketu">
              <Select
                value={values.ticketId}
                onChange={(event) => set("ticketId", event.target.value)}
              >
                <option value="">Brak</option>
                {initialTickets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.code}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Dla osoby">
              <Select value={values.person} onChange={(event) => set("person", event.target.value)}>
                <option value="">Brak</option>
                {people.map((item) => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </Select>
            </Field>
          </>
        )}
      </div>
      {reservationInvalid && (
        <p className="text-xs text-destructive">Wskaż projekt, Ticket lub osobę dla rezerwacji.</p>
      )}
      <Field label={type === "Korekta" ? "Przyczyna korekty" : "Uwagi"}>
        <Textarea
          value={values.notes}
          onChange={(event) => set("notes", event.target.value)}
          required={type === "Korekta"}
        />
      </Field>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Anuluj
          </Button>
        </DialogClose>
        <Button type="submit" disabled={stockInvalid || reservationInvalid}>
          Zapisz operację
        </Button>
      </DialogFooter>
    </form>
  );
}

function Filter({
  value,
  onChange,
  label,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: string[];
}) {
  return (
    <Select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
      <option>Wszystkie</option>
      {options.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </Select>
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
function Metric({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  tone?: "warning";
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        <span
          className={`grid size-11 place-items-center rounded-xl ${tone ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" : "bg-primary/10 text-primary"}`}
        >
          {icon}
        </span>
      </div>
    </Card>
  );
}
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
function MovementTimeline({ movements }: { movements: InventoryMovement[] }) {
  return (
    <section>
      <h3 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-wider text-muted-foreground uppercase">
        <History className="size-4" />
        Historia ruchów
      </h3>
      {movements.length ? (
        <div className="space-y-4">
          {movements.map((movement) => (
            <div key={movement.id} className="flex gap-3">
              <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/10" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold">{movement.type}</p>
                  <Badge variant="muted">
                    {movement.quantity > 0 ? "+" : ""}
                    {movement.quantity}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{movement.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {movement.person} · {movement.date} · {movement.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<History />}
          title="Brak ruchów"
          description="Historia pojawi się po pierwszej operacji."
          className="rounded-xl border py-10"
        />
      )}
    </section>
  );
}
function Related({ movements }: { movements: InventoryMovement[] }) {
  const receipts = movements.filter((item) => item.type === "Przyjęcie");
  const issues = movements.filter((item) => item.type === "Wydanie");
  const assets = [...new Set(movements.map((item) => item.assetId).filter(Boolean))]
    .map((id) => initialAssets.find((item) => item.id === id)?.name)
    .filter(Boolean);
  const relatedProjects = [...new Set(movements.map((item) => item.project).filter(Boolean))];
  const tickets = [...new Set(movements.map((item) => item.ticketId).filter(Boolean))]
    .map((id) => initialTickets.find((item) => item.id === id)?.code)
    .filter(Boolean);
  return (
    <section>
      <h3 className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
        Powiązania
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <Detail label="Przyjęcia" value={String(receipts.length)} />
        <Detail label="Wydania" value={String(issues.length)} />
        <Detail label="Assets" value={assets.join(", ") || "Brak"} />
        <Detail label="Projekty" value={relatedProjects.join(", ") || "Brak"} />
        <Detail label="Tickets" value={tickets.join(", ") || "Brak"} />
      </div>
    </section>
  );
}
