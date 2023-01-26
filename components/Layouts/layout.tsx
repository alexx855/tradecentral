
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-lg text-center mb-8">
      <main>{children}</main>
    </div>
  )
}