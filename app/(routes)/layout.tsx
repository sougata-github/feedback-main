import Header from "@/components/Header";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
    </>
  );
};

export default layout;
