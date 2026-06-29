export default function ContactLoading() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="flex min-h-[50vh] items-center justify-center bg-bella-mist/30">
        <div className="w-full max-w-lg space-y-4 px-6 text-center">
          <div className="mx-auto h-3 w-24 rounded-full bg-bella-gold/10" />
          <div className="mx-auto h-12 w-3/4 rounded bg-bella-gold/10" />
          <div className="mx-auto h-px w-16 bg-bella-gold/10" />
        </div>
      </div>

      {/* Form and sidebar skeleton */}
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form skeleton */}
          <div className="space-y-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-bella-gold/10" />
            ))}
            <div className="h-14 rounded-full bg-bella-gold/15" />
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-bella-gold/10" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
