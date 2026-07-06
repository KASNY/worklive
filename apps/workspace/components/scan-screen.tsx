"use client";

import { AlertCircle, Boxes, MapPin, QrCode, ScanLine, UserRound } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import { Badge, Button, Card, CardContent, EmptyState, Input } from "@worklive/ui";

import { WorkspaceShell } from "@/components/workspace-shell";
import { type Asset, initialAssets } from "@/lib/assets-data";
import { getLocationPathLabel } from "@/lib/locations-data";

export function ScanScreen() {
  const [code, setCode] = useState("");
  const [asset, setAsset] = useState<Asset | null>(null);
  const [searched, setSearched] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedCode = code.trim().toUpperCase();
    setAsset(initialAssets.find((item) => item.qrCode === normalizedCode) ?? null);
    setSearched(true);
  }

  return (
    <WorkspaceShell>
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <header>
          <Badge className="mb-3 gap-1.5">
            <ScanLine className="size-3.5" /> QR foundations
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Skanuj zasób</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Wpisz kod znajdujący się pod etykietą QR, aby odnaleźć zasób w workspace.
          </p>
        </header>

        <Card className="border-border/80 shadow-sm">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <Input
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setSearched(false);
                }}
                placeholder="Np. AST-0001"
                aria-label="Kod zasobu"
                className="h-11 flex-1 font-mono uppercase"
              />
              <Button type="submit" className="h-11 gap-2" disabled={!code.trim()}>
                <ScanLine className="size-4" /> Znajdź zasób
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              Dane są mockowane. Do testu użyj kodu od AST-0001 do AST-0008.
            </p>
          </CardContent>
        </Card>

        {asset ? (
          <Card className="overflow-hidden border-border/80 shadow-lg shadow-slate-950/5">
            <CardContent className="grid gap-6 p-6 sm:p-8 md:grid-cols-[160px_1fr]">
              <div className="grid place-items-center rounded-2xl border bg-white p-5">
                <QRCodeSVG
                  value={`worklive://asset/${asset.qrCode}`}
                  size={120}
                  level="M"
                  marginSize={1}
                />
                <span className="mt-3 font-mono text-xs font-bold text-slate-900">
                  {asset.qrCode}
                </span>
              </div>
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-primary uppercase">
                      {asset.type}
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-foreground">{asset.name}</h2>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {asset.internalCode}
                    </p>
                  </div>
                  <Badge variant={asset.status === "Aktywny" ? "success" : "muted"}>
                    {asset.status}
                  </Badge>
                </div>
                <div className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                  <Info icon={<MapPin />} label="Lokalizacja">
                    {getLocationPathLabel(asset.locationId)}
                  </Info>
                  <Info icon={<UserRound />} label="Osoba odpowiedzialna">
                    {asset.responsiblePerson}
                  </Info>
                  <Info icon={<Boxes />} label="Numer seryjny">
                    {asset.serialNumber}
                  </Info>
                  <Info icon={<QrCode />} label="Kod QR">
                    {asset.qrCode}
                  </Info>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : searched ? (
          <EmptyState
            icon={<AlertCircle />}
            title="Nie znaleziono zasobu"
            description={`Kod ${code.trim().toUpperCase()} nie istnieje w tym workspace. Sprawdź kod i spróbuj ponownie.`}
          />
        ) : (
          <EmptyState
            icon={<QrCode />}
            title="Zasób pojawi się tutaj"
            description="Ręczne wyszukiwanie kodu jest podstawą przyszłego skanera aparatem w aplikacji mobilnej."
          />
        )}
      </div>
    </WorkspaceShell>
  );
}

function Info({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border bg-muted/25 p-3.5">
      <span className="mt-0.5 text-primary [&>svg]:size-4">{icon}</span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="mt-1 font-medium text-foreground">{children}</p>
      </div>
    </div>
  );
}
