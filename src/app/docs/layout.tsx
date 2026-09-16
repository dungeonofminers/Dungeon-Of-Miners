import { DocsSidebar, DocsMobileNav } from "@/components/docs/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-24 sm:pt-28">
      <div className="section-shell pb-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <DocsSidebar />
          <div className="min-w-0 flex-1">
            <DocsMobileNav />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
