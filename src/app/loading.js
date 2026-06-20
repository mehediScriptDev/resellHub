export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
      <p className="text-muted-foreground font-medium animate-pulse">Loading ReSell Hub...</p>
    </div>
  );
}
