"use client";

import {
  Building2,
  ChevronRight,
  Factory,
  MapPin,
  MapPinned,
  PackagePlus,
  Pencil,
  Plus,
  Trash2,
  Warehouse,
} from "lucide-react";
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
} from "@worklive/ui";

import { WorkspaceShell } from "@/components/workspace-shell";
import { initialAssets } from "@/lib/assets-data";
import {
  type LocationNode,
  type LocationType,
  getDescendantIds,
  getLocationPath,
  getLocationPathLabel,
  initialLocations,
} from "@/lib/locations-data";

const locationTypes: LocationType[] = [
  "Firma",
  "Oddział",
  "Budynek",
  "Hala",
  "Biuro",
  "Magazyn",
  "Regał",
  "Szafka",
  "Stanowisko",
];

function iconFor(type: LocationType) {
  if (type === "Firma" || type === "Oddział") return Building2;
  if (type === "Budynek" || type === "Hala") return Factory;
  if (type === "Magazyn" || type === "Regał" || type === "Szafka") return Warehouse;
  return MapPin;
}

type LocationFormValues = Pick<LocationNode, "name" | "type" | "parentId" | "code" | "description">;

function LocationForm({
  locations,
  initial,
  defaultParentId,
  onSubmit,
  submitLabel,
}: {
  locations: LocationNode[];
  initial?: LocationNode;
  defaultParentId?: string | undefined;
  onSubmit: (values: LocationFormValues) => void;
  submitLabel: string;
}) {
  const [values, setValues] = useState<LocationFormValues>(
    initial
      ? {
          name: initial.name,
          type: initial.type,
          parentId: initial.parentId,
          code: initial.code,
          description: initial.description,
        }
      : {
          name: "",
          type: "Hala",
          parentId: defaultParentId ?? "loc-branch-waw",
          code: "",
          description: "",
        },
  );

  function submit(event: FormEvent) {
    event.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <label className="block space-y-2 text-sm font-medium">
        <span>Nazwa</span>
        <Input
          value={values.name}
          onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
          required
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          <span>Typ</span>
          <Select
            value={values.type}
            onChange={(event) =>
              setValues((current) => ({ ...current, type: event.target.value as LocationType }))
            }
          >
            {locationTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Kod</span>
          <Input
            value={values.code}
            onChange={(event) => setValues((current) => ({ ...current, code: event.target.value }))}
            required
          />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-medium">
        <span>Lokalizacja nadrzędna</span>
        <Select
          value={values.parentId ?? ""}
          onChange={(event) =>
            setValues((current) => ({ ...current, parentId: event.target.value || null }))
          }
          disabled={initial?.type === "Firma"}
        >
          <option value="">Brak — poziom główny</option>
          {locations
            .filter(
              (location) =>
                location.id !== initial?.id &&
                (!initial || !getDescendantIds(initial.id, locations).has(location.id)),
            )
            .map((location) => (
              <option key={location.id} value={location.id}>
                {getLocationPathLabel(location.id, locations)}
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
        <Button type="submit">{submitLabel}</Button>
      </DialogFooter>
    </form>
  );
}

export function LocationsScreen() {
  const [locations, setLocations] = useState(initialLocations);
  const [selected, setSelected] = useState<LocationNode | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const tree = useMemo(() => {
    const rows: Array<{ location: LocationNode; depth: number }> = [];
    const visit = (parentId: string | null, depth: number) => {
      for (const location of locations.filter((item) => item.parentId === parentId)) {
        rows.push({ location, depth });
        visit(location.id, depth + 1);
      }
    };
    visit(null, 0);
    return rows;
  }, [locations]);

  const selectedAssets = selected
    ? initialAssets.filter((asset) =>
        getDescendantIds(selected.id, locations).has(asset.locationId),
      )
    : [];

  return (
    <WorkspaceShell>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>NovaTech</span>
            <ChevronRight className="size-3.5" />
            <span>Lokalizacje</span>
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.04em]">Locations</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Od firmy i oddziału aż po konkretny regał, szafkę lub stanowisko.
          </p>
        </div>
        <Button size="lg" onClick={() => setAddOpen(true)}>
          <Plus /> Add Location
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div>
              <h2 className="font-semibold">Drzewo lokalizacji</h2>
              <p className="mt-1 text-xs text-muted-foreground">{locations.length} lokalizacji</p>
            </div>
            <Badge>{initialAssets.length} assets</Badge>
          </div>
          <div className="divide-y divide-border/70">
            {tree.map(({ location, depth }) => {
              const Icon = iconFor(location.type);
              const assetCount = initialAssets.filter((asset) =>
                getDescendantIds(location.id, locations).has(asset.locationId),
              ).length;
              return (
                <button
                  key={location.id}
                  onClick={() => setSelected(location)}
                  className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-muted/50"
                  style={{ paddingLeft: `${20 + depth * 28}px` }}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{location.name}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {location.type} · {location.code}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">{assetCount} assets</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </Card>

        <Card className="hidden min-h-80 xl:block">
          <EmptyState
            icon={<MapPinned />}
            title="Wybierz lokalizację"
            description="Otwórz element drzewa, aby zobaczyć pełną ścieżkę i przypisane zasoby."
          />
        </Card>
      </div>

      <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <SheetContent>
            <SheetHeader>
              <Badge className="mb-3">{selected.type}</Badge>
              <SheetTitle>{selected.name}</SheetTitle>
              <SheetDescription>{getLocationPathLabel(selected.id, locations)}</SheetDescription>
            </SheetHeader>
            <div className="space-y-7 p-6">
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => setEditOpen(true)}>
                  <Pencil /> Edit Location
                </Button>
                <Button size="sm" variant="outline" onClick={() => setAddOpen(true)}>
                  <PackagePlus /> Add child
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  disabled={!selected.parentId}
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
                  <div className="rounded-xl border p-4">
                    <p className="text-xs text-muted-foreground">Kod</p>
                    <p className="mt-1 font-semibold">{selected.code}</p>
                  </div>
                  <div className="rounded-xl border p-4">
                    <p className="text-xs text-muted-foreground">Poziom</p>
                    <p className="mt-1 font-semibold">
                      {getLocationPath(selected.id, locations).length}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {selected.description || "Brak opisu."}
                </p>
              </section>

              <section>
                <h3 className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Assets in this location
                </h3>
                {selectedAssets.length ? (
                  <div className="space-y-2">
                    {selectedAssets.map((asset) => (
                      <div key={asset.id} className="flex items-center gap-3 rounded-xl border p-3">
                        <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                          <PackagePlus className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{asset.name}</span>
                          <span className="text-xs text-muted-foreground">{asset.qrCode}</span>
                        </span>
                        <Badge variant={asset.status === "Aktywny" ? "success" : "muted"}>
                          {asset.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<MapPin />}
                    title="Brak przypisanych zasobów"
                    description="Ta lokalizacja i jej podlokalizacje nie zawierają assets."
                    className="rounded-xl border py-10"
                  />
                )}
              </section>
            </div>
          </SheetContent>
        )}
      </Sheet>

      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Location</DialogTitle>
            <DialogDescription>Dodaj kolejny poziom do drzewa NovaTech.</DialogDescription>
          </DialogHeader>
          <LocationForm
            locations={locations}
            defaultParentId={selected?.id}
            submitLabel="Dodaj lokalizację"
            onSubmit={(values) => {
              const location: LocationNode = {
                ...values,
                parentId: selected?.id ?? values.parentId,
                id: `loc-${Date.now()}`,
              };
              setLocations((items) => [...items, location]);
              setAddOpen(false);
              setSelected(location);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        {selected && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Location</DialogTitle>
              <DialogDescription>Zmień dane lokalizacji w lokalnym mocku.</DialogDescription>
            </DialogHeader>
            <LocationForm
              key={selected.id}
              locations={locations}
              initial={selected}
              submitLabel="Zapisz zmiany"
              onSubmit={(values) => {
                const updated = { ...selected, ...values };
                setLocations((items) =>
                  items.map((item) => (item.id === selected.id ? updated : item)),
                );
                setSelected(updated);
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
              <DialogTitle>Usunąć lokalizację?</DialogTitle>
              <DialogDescription>
                „{selected.name}” oraz wszystkie lokalizacje podrzędne znikną z lokalnego mocka.
                Przypisane assets nie są usuwane, dlatego przed usunięciem gałęzi trzeba przenieść
                je do innej lokalizacji.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Anuluj</Button>
              </DialogClose>
              <Button
                variant="destructive"
                disabled={selectedAssets.length > 0}
                onClick={() => {
                  const ids = getDescendantIds(selected.id, locations);
                  setLocations((items) => items.filter((item) => !ids.has(item.id)));
                  setDeleteOpen(false);
                  setSelected(null);
                }}
              >
                {selectedAssets.length > 0
                  ? "Najpierw przenieś przypisane zasoby"
                  : "Usuń lokalizację"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </WorkspaceShell>
  );
}
