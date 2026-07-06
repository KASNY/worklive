"use client";

import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Clock3,
  Database,
  Eye,
  EyeOff,
  FolderKanban,
  LayoutDashboard,
  ListChecks,
  LoaderCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Badge, Button, Card, CardContent, Input } from "@worklive/ui";

import { ThemeBrandLogo } from "@/components/theme-brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";

function ProductPreview() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 0.94, scale: 0.92, y: 0, rotate: -0.35 }}
      transition={{ duration: 0.46, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none relative mt-5 hidden h-[250px] w-[620px] origin-left select-none overflow-hidden rounded-[20px] border border-border bg-background shadow-[0_28px_70px_rgba(37,99,235,0.14)] lg:block dark:shadow-[0_28px_70px_rgba(0,0,0,0.28)]"
    >
      <div className="grid h-full grid-cols-[68px_1fr]">
        <div className="flex flex-col items-center border-r border-border bg-sidebar py-4">
          <span className="mb-5 grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
            <LayoutDashboard className="size-4" />
          </span>
          <div className="space-y-2">
            {[LayoutDashboard, Boxes, FolderKanban, ListChecks].map((Icon, index) => (
              <span
                key={index}
                className={`grid size-8 place-items-center rounded-lg ${index === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
          <span className="mt-auto grid size-7 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-[8px] font-bold text-white">
            AN
          </span>
        </div>

        <div className="min-w-0 bg-background">
          <div className="flex h-10 items-center gap-3 border-b border-border bg-card/80 px-4">
            <div className="flex h-7 w-44 items-center gap-2 rounded-lg border border-border bg-muted/50 px-2.5 text-[8px] text-muted-foreground">
              <Search className="size-3" /> Search workspace…
            </div>
            <div className="ml-auto size-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />
          </div>

          <div className="p-3">
            <div className="mb-2 flex items-end justify-between">
              <div>
                <p className="text-[8px] text-muted-foreground">NovaTech / Dashboard</p>
                <p className="mt-1 text-sm font-bold tracking-tight text-foreground">
                  Operations overview
                </p>
              </div>
              <Badge className="px-2 py-1 text-[7px]">Live workspace</Badge>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: "Assets", value: "128", color: "bg-blue-500" },
                { label: "Projects", value: "12", color: "bg-violet-500" },
                { label: "Open tasks", value: "34", color: "bg-amber-500" },
              ].map((stat) => (
                <Card key={stat.label} className="relative overflow-hidden rounded-xl shadow-sm">
                  <span className={`absolute inset-x-0 top-0 h-0.5 ${stat.color}`} />
                  <CardContent className="p-2.5">
                    <p className="text-[8px] text-muted-foreground">{stat.label}</p>
                    <p className="mt-1.5 text-lg font-bold tracking-tight">{stat.value}</p>
                    <p className="mt-1 text-[7px] text-muted-foreground">Updated today</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-2 overflow-hidden rounded-xl shadow-sm">
              <div className="flex items-center justify-between border-b border-border px-3 py-2">
                <p className="text-[9px] font-semibold">Recent activity</p>
                <span className="text-[7px] font-semibold text-primary">View all</span>
              </div>
              <div className="divide-y divide-border">
                {[
                  ["MK", "Frezarka CNC-04 updated", "8m"],
                  ["AN", "Modernizacja linii B created", "32m"],
                ].map(([initials, action, time], index) => (
                  <div key={action} className="flex items-center gap-2.5 px-3 py-1.5">
                    <span
                      className={`grid size-5 place-items-center rounded-full text-[6px] font-bold ${index === 1 ? "bg-violet-500/15 text-violet-500" : "bg-primary/10 text-primary"}`}
                    >
                      {initials}
                    </span>
                    <span className="flex-1 text-[8px] text-foreground">{action}</span>
                    <span className="text-[7px] text-muted-foreground">{time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("anna@novatech.pl");
  const [password, setPassword] = useState("worklive-demo");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    window.setTimeout(() => router.push("/dashboard"), 550);
  }

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1.08fr_0.92fr]">
      <section className="relative hidden overflow-hidden bg-[#F8FAFC] p-12 text-[#0F172A] lg:flex lg:flex-col lg:justify-between dark:bg-[#0b1323] dark:text-white">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,#FFFFFF_0%,#F8FAFC_58%,#EFF6FF_100%)] dark:bg-[radial-gradient(circle_at_18%_15%,rgba(37,99,235,0.3),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(59,130,246,0.14),transparent_28%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,1)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,1)_1px,transparent_1px)] opacity-[0.04] [background-size:32px_32px] dark:hidden" />
        <div className="absolute -top-12 left-12 size-52 rounded-full bg-[#2563EB]/10 blur-[100px] dark:hidden" />
        <div className="absolute top-1/2 -right-16 size-72 rounded-full bg-[#2563EB]/10 blur-[130px] dark:hidden" />
        <div className="absolute bottom-4 left-1/3 size-44 rounded-full bg-blue-400/8 blur-[90px] dark:hidden" />
        <div className="absolute -right-28 top-24 size-80 rounded-full border border-[#DBEAFE] dark:border-white/10" />
        <div className="absolute -right-10 top-40 size-48 rounded-full border border-[#DBEAFE] dark:border-blue-400/20" />

        <div className="relative">
          <ThemeBrandLogo />
        </div>

        <div className="relative max-w-[640px]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1.5 text-xs font-semibold text-primary">
              <ShieldCheck className="size-3.5" />
              Jeden workspace. Pełna kontrola.
            </span>
            <h1 className="text-5xl leading-[1.06] font-semibold tracking-[-0.045em]">
              Operacje firmy,
              <br />w jednym miejscu.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
              Zasoby, zadania i projekty połączone w przejrzysty system, który rośnie razem z Twoim
              zespołem.
            </p>
          </motion.div>

          <ProductPreview />

          <div className="mt-5 grid max-w-lg grid-cols-3 gap-3">
            {[
              { value: "128", label: "zasobów pod kontrolą", icon: Boxes },
              { value: "24/7", label: "dostęp do danych", icon: Clock3 },
              { value: "1", label: "źródło prawdy", icon: Database },
            ].map(({ value, label, icon: Icon }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: 0.3 + index * 0.07, ease: "easeOut" }}
                className="group rounded-2xl border border-border bg-card p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(37,99,235,0.1)] dark:shadow-none dark:hover:shadow-none"
              >
                <div className="mb-2 grid size-7 place-items-center rounded-lg bg-accent text-primary">
                  <Icon className="size-3.5" />
                </div>
                <div className="text-xl font-semibold">{value}</div>
                <div className="mt-1 text-[11px] leading-4 text-muted-foreground">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-muted-foreground">
          © 2026 WorkLive. Wersja demonstracyjna.
        </p>
      </section>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-card px-5 py-12 sm:px-10 dark:bg-background">
        <div className="pointer-events-none absolute top-1/2 left-1/2 size-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/8 blur-[120px] dark:hidden" />
        <div className="absolute top-5 right-5">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-[420px]">
          <div className="mb-10 lg:hidden">
            <ThemeBrandLogo />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <p className="mb-2 text-sm font-semibold text-primary">Witaj ponownie</p>
            <h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl">Zaloguj się</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Uzyskaj dostęp do workspace swojej firmy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="relative rounded-3xl border-border bg-card p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-7 dark:shadow-xl dark:shadow-black/20">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Adres e-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="border-input bg-card"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Hasło
                    </label>
                    <button
                      type="button"
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Nie pamiętasz hasła?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="border-input bg-card pr-11"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  Dane demonstracyjne są już uzupełnione.
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-[#1D4ED8] dark:hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Logowanie…
                    </>
                  ) : (
                    <>
                      Zaloguj się <ArrowRight />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          <p className="mt-7 text-center text-xs leading-5 text-muted-foreground">
            Logując się, akceptujesz warunki korzystania z wersji demonstracyjnej.
          </p>
        </div>
      </section>
    </main>
  );
}
