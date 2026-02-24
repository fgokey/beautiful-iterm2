import { Suspense } from "react";
import { notFound } from "next/navigation";

import { InstallPageClient } from "@/components/InstallPageClient";
import { THEMES, findTheme } from "@/lib/themes";

type InstallPageProps = {
  params: Promise<{ theme: string }>;
};

export function generateStaticParams() {
  return THEMES.map((theme) => ({ theme: theme.id }));
}

export default async function InstallPage({ params }: InstallPageProps) {
  const { theme } = await params;
  const selectedTheme = findTheme(theme);

  if (!selectedTheme) {
    notFound();
  }

  return (
    <Suspense fallback={<main className="install-shell">Loading...</main>}>
      <InstallPageClient theme={selectedTheme} />
    </Suspense>
  );
}
