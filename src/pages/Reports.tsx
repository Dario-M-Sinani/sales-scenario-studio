import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { toast } from "sonner";

const mockPurchaseData = [
  { item: "Producto A", currentStock: 150, projectedDemand: 320, suggestedPurchase: 170 },
  { item: "Producto B", currentStock: 80, projectedDemand: 200, suggestedPurchase: 120 },
  { item: "Producto C", currentStock: 200, projectedDemand: 280, suggestedPurchase: 80 },
  { item: "Producto D", currentStock: 50, projectedDemand: 180, suggestedPurchase: 130 },
  { item: "Producto E", currentStock: 120, projectedDemand: 150, suggestedPurchase: 30 },
  { item: "Producto F", currentStock: 90, projectedDemand: 210, suggestedPurchase: 120 },
];

export default function ReportsPage() {
  const handleDownload = () => {
    // TODO: Implement actual CSV download
    toast.success("Reporte descargado correctamente");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reporte de Simulación y Compras</h1>
            <p className="mt-2 text-muted-foreground">
              Sugerencias de compra basadas en la simulación
            </p>
          </div>
          <Button onClick={handleDownload} size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Descargar Reporte Completo (CSV)
          </Button>
        </div>

        {/* Purchase Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle>Sugerencia de Compras</CardTitle>
            <CardDescription>
              Recomendaciones de inventario basadas en el escenario realista
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-3 text-left font-semibold">Ítem (Producto)</th>
                    <th className="p-3 text-right font-semibold">Stock Actual</th>
                    <th className="p-3 text-right font-semibold">Demanda Proyectada</th>
                    <th className="p-3 text-right font-semibold">Sugerencia de Compra (Unidades)</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPurchaseData.map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30">
                      <td className="p-3 font-medium">{row.item}</td>
                      <td className="p-3 text-right">{row.currentStock}</td>
                      <td className="p-3 text-right">{row.projectedDemand}</td>
                      <td className="p-3 text-right">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                          {row.suggestedPurchase}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Total a Comprar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {mockPurchaseData.reduce((sum, item) => sum + item.suggestedPurchase, 0)} unidades
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Stock Actual Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {mockPurchaseData.reduce((sum, item) => sum + item.currentStock, 0)} unidades
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Demanda Total Proyectada</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {mockPurchaseData.reduce((sum, item) => sum + item.projectedDemand, 0)} unidades
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
