export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="animate-pulse">
        <div className="mb-12 h-4 w-32 rounded bg-bella-gold/10" />

        <div className="mb-20 grid gap-12 lg:grid-cols-2">
          <div className="aspect-square rounded-3xl bg-bella-gold/10" />

          <div className="flex flex-col justify-center space-y-5">
            <div className="h-3 w-24 rounded-full bg-bella-gold/10" />
            <div className="h-12 w-3/4 rounded bg-bella-gold/10" />
            <div className="h-6 w-1/2 rounded bg-bella-gold/10" />
            <div className="h-px w-16 bg-bella-gold/10" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-bella-gold/10" />
              <div className="h-4 w-5/6 rounded bg-bella-gold/10" />
              <div className="h-4 w-4/6 rounded bg-bella-gold/10" />
            </div>
            <div className="h-12 w-40 rounded-full bg-bella-gold/10" />
          </div>
        </div>

        <div className="mb-20 grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="h-24 rounded-xl bg-bella-gold/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
