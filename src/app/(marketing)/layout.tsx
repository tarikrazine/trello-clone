import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col bg-slate-100">
      <Navbar />
      <div className="flex-1 bg-slate-100 pb-20 pt-40">{children}</div>
      <Footer />
    </div>
  );
}
