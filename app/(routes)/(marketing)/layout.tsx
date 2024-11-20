import Header from "@/components/marketing/Header";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
    </>
  );
};

export default MarketingLayout;
