import Sidebar from "@/components/sidebar";
const AILayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default AILayout;
