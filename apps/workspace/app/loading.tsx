import { Card, Skeleton } from "@worklive/ui";

export default function WorkspaceLoading() {
  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-8" aria-label="Ładowanie workspace">
      <div className="mx-auto max-w-7xl space-y-7">
        <div className="space-y-3">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="space-y-4 p-5">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-36" />
            </Card>
          ))}
        </div>
        <Card className="space-y-4 p-5">
          <Skeleton className="h-6 w-44" />
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 border-t pt-4">
              <Skeleton className="size-10 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-2/5" />
                <Skeleton className="h-3 w-1/4" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
