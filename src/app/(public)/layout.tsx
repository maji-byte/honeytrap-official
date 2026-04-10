import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="noise-overlay" />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
