"use client";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {/* Sidebar */}
      <aside>side menu</aside>
      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
