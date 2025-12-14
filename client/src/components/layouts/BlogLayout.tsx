import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  const { currentLocation } = useLocation();
  
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer location={currentLocation} />
    </>
  );
}