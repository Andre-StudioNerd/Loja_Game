import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="flex flex-col items-start h-40"></div>
      {children}
      <Footer />
    </div>
  );
};
