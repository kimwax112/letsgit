import ContractSidebar from "../components/contract/ContractSidebar/ContractSidebar";

const ContractLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <ContractSidebar unreadCount={3} />
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default ContractLayout;
