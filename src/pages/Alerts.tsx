import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, PackageX, Package } from "lucide-react";

const stockoutAlerts = [
  { product: "Producto A", currentStock: 15, projectedShortfall: 85, daysUntilStockout: 12 },
  { product: "Producto C", currentStock: 28, projectedShortfall: 62, daysUntilStockout: 18 },
  { product: "Producto F", currentStock: 8, projectedShortfall: 102, daysUntilStockout: 8 },
];

const overstockAlerts = [
  { product: "Producto B", currentStock: 420, projectedDemand: 180, excessUnits: 240 },
  { product: "Producto E", currentStock: 315, projectedDemand: 140, excessUnits: 175 },
  { product: "Producto H", currentStock: 290, projectedDemand: 120, excessUnits: 170 },
];

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Alertas de Inventario</h1>
          <p className="mt-2 text-muted-foreground">
            Monitoreo de riesgos de quiebre de stock y sobreinventario
          </p>
        </div>

        <div className="space-y-6">
          {/* Stockout Alerts */}
          <Card className="border-l-4 border-l-alert-danger">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-alert-dangerLight">
                  <PackageX className="h-6 w-6 text-alert-danger" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Alertas de Quiebre de Stock
                    <Badge variant="destructive">{stockoutAlerts.length}</Badge>
                  </CardTitle>
                  <CardDescription>Productos con alto riesgo de agotarse</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockoutAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-alert-danger/20 bg-alert-dangerLight p-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-alert-danger" />
                        <h4 className="font-semibold text-foreground">{alert.product}</h4>
                      </div>
                      <div className="mt-2 grid gap-2 text-sm md:grid-cols-3">
                        <div>
                          <span className="text-muted-foreground">Stock Actual: </span>
                          <span className="font-medium text-alert-danger">{alert.currentStock} unidades</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Faltante Proyectado: </span>
                          <span className="font-medium">{alert.projectedShortfall} unidades</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Días hasta agotarse: </span>
                          <span className="font-medium text-alert-danger">{alert.daysUntilStockout} días</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Overstock Alerts */}
          <Card className="border-l-4 border-l-alert-info">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-alert-infoLight">
                  <Package className="h-6 w-6 text-alert-info" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Alertas de Sobreinventario
                    <Badge className="bg-alert-info text-white">{overstockAlerts.length}</Badge>
                  </CardTitle>
                  <CardDescription>Productos con exceso de stock proyectado</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overstockAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-alert-info/20 bg-alert-infoLight p-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-alert-info" />
                        <h4 className="font-semibold text-foreground">{alert.product}</h4>
                      </div>
                      <div className="mt-2 grid gap-2 text-sm md:grid-cols-3">
                        <div>
                          <span className="text-muted-foreground">Stock Actual: </span>
                          <span className="font-medium">{alert.currentStock} unidades</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Demanda Proyectada: </span>
                          <span className="font-medium">{alert.projectedDemand} unidades</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Exceso: </span>
                          <span className="font-medium text-alert-info">{alert.excessUnits} unidades</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Alertas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-alert-danger/20 bg-alert-dangerLight p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Productos en Riesgo</p>
                      <p className="text-2xl font-bold text-alert-danger">{stockoutAlerts.length}</p>
                    </div>
                    <PackageX className="h-8 w-8 text-alert-danger" />
                  </div>
                </div>

                <div className="rounded-lg border border-alert-info/20 bg-alert-infoLight p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Productos con Exceso</p>
                      <p className="text-2xl font-bold text-alert-info">{overstockAlerts.length}</p>
                    </div>
                    <Package className="h-8 w-8 text-alert-info" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
