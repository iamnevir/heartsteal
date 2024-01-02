import Sidebar from "@/components/sidebar";
import UserInfoModal from "@/components/user-info-modal";
const AILayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      {children}
      <UserInfoModal />
    </>
  );
};

export default AILayout;
