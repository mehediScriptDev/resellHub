export function ProductCardSkeleton() {
  return (
    <div className="bg-card border rounded flex flex-col h-full animate-pulse">
      <div className="aspect-4/3 bg-muted border-b w-full" />
      <div className="p-3 space-y-3 flex flex-col grow">
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-5 bg-muted rounded w-1/3 mt-auto" />
        <div className="flex justify-between pt-2 border-t">
          <div className="h-3 bg-muted rounded w-1/3" />
          <div className="h-3 bg-muted rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
