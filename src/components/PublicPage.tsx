import type { ReactNode } from "react";
import PageMetadata from "@/components/PageMetadata";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type PublicPageProps = {
  title: string;
  description: string;
  heading: string;
  intro?: string;
  noindex?: boolean;
  children: ReactNode;
};

const PublicPage = ({ title, description, heading, intro, children, noindex = false }: PublicPageProps) => {
  const { pathname } = useLocation();
  const url = `https://elderconnect.org${pathname}`;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PageMetadata title={`${title} | ElderConnect`} description={description} url={url} noindex={noindex} />
      <Header />
      <main className="site-container flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-[960px]">
          <h1 className="max-w-[850px] text-[36px] leading-tight sm:text-5xl lg:text-[56px]">{heading}</h1>
          {intro && <p className="mt-6 max-w-[760px] text-lg text-muted-foreground">{intro}</p>}
          <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicPage;