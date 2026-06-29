export default function GalleryLoading() {
  return (
    <div className="min-h-screen bg-bella-charcoal">
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center gap-8 px-6 pb-20">
        <div className="h-3 w-28 animate-pulse rounded-full bg-bella-gold/20" />
        <div className="space-y-3 text-center">
          <div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-white/10" />
          <div className="mx-auto h-10 w-48 animate-pulse rounded-lg bg-white/10" />
        </div>
        <div className="h-px w-24 animate-pulse bg-bella-gold/30" />
        <div className="mt-4 flex items-end justify-center gap-5">
          {[180, 220, 180].map((height, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl bg-white/10"
              style={{
                width: index === 1 ? "34%" : "28%",
                maxWidth: index === 1 ? 200 : 160,
                height,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-14 flex flex-wrap justify-center gap-3">
          {[110, 90, 100, 95].map((width, index) => (
            <div
              key={index}
              className="h-8 animate-pulse rounded-full bg-bella-gold/10"
              style={{ width }}
            />
          ))}
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {[380, 300, 300, 300, 380, 300, 300, 300, 380, 300, 300, 300, 300].map(
            (height, index) => (
              <div
                key={index}
                className="mb-5 break-inside-avoid animate-pulse rounded-2xl bg-bella-gold/5"
                style={{ height }}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
