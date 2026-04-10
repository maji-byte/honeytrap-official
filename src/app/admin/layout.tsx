import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "HoneyTrap CMS",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#111115]">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-8 max-w-[1200px]">{children}</div>
      </div>
    </div>
  );
}
