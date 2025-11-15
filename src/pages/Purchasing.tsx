import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { toast } from "sonner";

const mockPurchaseData = {
  conservative: [
    { item: "Producto A", currentStock: 150, projectedDemand: 320, suggestedPurchase: 170 },
    { item: "Producto B", currentStock: 85, projectedDemand: 240, suggestedPurchase: 155 },
    { item: "Producto C", currentStock: 200, projectedDemand: 380, suggestedPurchase: 180 },
    { item: "Producto D", currentStock: 120, projectedDemand: 290, suggestedPurchase: 170 },
  ],
  realistic: [
    { item: "Producto A", currentStock: 150, projectedDemand: 420, suggestedPurchase: 270 },
    { item: "Producto B", currentStock: 85, projectedDemand: 310, suggestedPurchase: 225 },
    { item: "Producto C", currentStock: 200, projectedDemand: 490, suggestedPurchase: 290 },
    { item: "Producto D", currentStock: 120, projectedDemand: 375, suggestedPurchase: 255 },
  ],
  optimistic: [
    { item: "Producto A", currentStock: 150, projectedDemand: 550, suggestedPurchase: 400 },
    { item: "Producto B", currentStock: 85, projectedDemand: 410, suggestedPurchase: 325 },
    { item: "Producto C", currentStock: 200, projectedDemand: 640, suggestedPurchase: 440 },
    { item: "Producto D", currentStock: 120, projectedDemand: 485, suggestedPurchase: 365 },
  ],
};

export default function PurchasingPage() {
  const [selectedScenario, setSelectedScenario] = useState<"conservative" | "realistic" | "optimistic">("realistic");

  const handleDownloadReport = () => {
    toast.success("Descargando reporte de compras...");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Reporte de Compras</h1>
          <p className="mt-2 text-muted-foreground">
            Sugerencias de compra basadas en la simulación de escenarios
          </p>
        </div>

        {/* Scenario Selector */}
        <Card className="mb-6">
          <CardContent className="flex items-center justify-between pt-6">
            <div className="flex-1 max-w-sm">
              <label className="mb-2 block text-sm font-medium">Seleccionar Escenario para Reporte</label>
              <Select value={selectedScenario} onValueChange={(val: any) => setSelectedScenario(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Escenario Conservador</SelectItem>
                  <SelectItem value="realistic">Escenario Realista</SelectItem>
                  <SelectItem value="optimistic">Escenario Optimista</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleDownloadReport}>
              <Download className="mr-2 h-4 w-4" />
              Descargar Reporte (CSV)
            </Button>
          </CardContent>
        </Card>

        {/* Purchase Table */}
        <Card>
          <CardHeader>
            <CardTitle>Sugerencias de Compra</CardTitle>
            <CardDescription>
              Basado en el escenario {selectedScenario === "conservative" ? "conservador" : selectedScenario === "realistic" ? "realista" : "optimista"}
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
                    <th className="p-3 text-right font-semibold">Sugerencia de Compra</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPurchaseData[selectedScenario].map((row, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-3 font-medium">{row.item}</td>
                      <td className="p-3 text-right">{row.currentStock}</td>
                      <td className="p-3 text-right">{row.projectedDemand}</td>
                      <td className="p-3 text-right">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                          {row.suggestedPurchase} unidades
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total a Comprar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {mockPurchaseData[selectedScenario].reduce((sum, item) => sum + item.suggestedPurchase, 0)} unidades
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Productos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{mockPurchaseData[selectedScenario].length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Inversión Estimada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">$45,280</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
