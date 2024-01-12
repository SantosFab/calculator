'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2 className="text-center text-5xl" >Something went wrong!</h2>
        <button className="underline decoration-pink-500" onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}