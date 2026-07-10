import Sidebar from "../components/Sidebar";

export default function GenerateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-[240px] min-h-screen">{children}</main>
    </div>
  );
}
