import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { UploadCloud, BarChart3, ShoppingCart, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: "Carga de Datos", href: "/upload", icon: UploadCloud },
  { name: "Simulador", href: "/simulator", icon: BarChart3 },
  { name: "Reporte de Compras", href: "/purchasing", icon: ShoppingCart },
  { name: "Alertas", href: "/alerts", icon: AlertTriangle },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-border px-6">
            <h1 className="text-xl font-bold text-primary">Total PEC</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground text-center">
              Simulador de Escenarios v1.0
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
}
