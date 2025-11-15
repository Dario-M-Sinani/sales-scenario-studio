import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Play } from "lucide-react";
import { toast } from "sonner";

interface ScenarioValues {
  demandAdjustment: number;
  priceAdjustment: number;
  promotionCost: number;
  initialInventory: number;
}

const mockSalesData = [
  { month: "Ene", conservative: 4000, realistic: 5000, optimistic: 6500 },
  { month: "Feb", conservative: 4200, realistic: 5300, optimistic: 7000 },
  { month: "Mar", conservative: 4500, realistic: 5800, optimistic: 7800 },
  { month: "Abr", conservative: 4300, realistic: 5500, optimistic: 7400 },
  { month: "May", conservative: 4800, realistic: 6200, optimistic: 8200 },
  { month: "Jun", conservative: 5000, realistic: 6500, optimistic: 8800 },
];

const mockProfitData = [
  { month: "Ene", conservative: 12000, realistic: 15000, optimistic: 19500 },
  { month: "Feb", conservative: 12600, realistic: 15900, optimistic: 21000 },
  { month: "Mar", conservative: 13500, realistic: 17400, optimistic: 23400 },
  { month: "Abr", conservative: 12900, realistic: 16500, optimistic: 22200 },
  { month: "May", conservative: 14400, realistic: 18600, optimistic: 24600 },
  { month: "Jun", conservative: 15000, realistic: 19500, optimistic: 26400 },
];

const mockComparisonData = [
  { metric: "Seleccionado", value: 32500 },
  { metric: "Año Anterior", value: 28000 },
  { metric: "Plan Original", value: 30000 },
];

export default function SimulatorPage() {
  const [period, setPeriod] = useState("monthly");
  const [showResults, setShowResults] = useState(false);
  const [scenarios, setScenarios] = useState<{
    conservative: ScenarioValues;
    realistic: ScenarioValues;
    optimistic: ScenarioValues;
  }>({
    conservative: { demandAdjustment: -10, priceAdjustment: 0, promotionCost: 500, initialInventory: 1000 },
    realistic: { demandAdjustment: 0, priceAdjustment: 0, promotionCost: 1000, initialInventory: 1200 },
    optimistic: { demandAdjustment: 15, priceAdjustment: 5, promotionCost: 2000, initialInventory: 1500 },
  });

  const handleRunSimulation = () => {
    toast.success("Simulación ejecutada correctamente");
    setShowResults(true);
  };

  const ScenarioCard = ({ 
    type, 
    title, 
    color 
  }: { 
    type: "conservative" | "realistic" | "optimistic"; 
    title: string; 
    color: string;
  }) => (
    <Card className={`border-2 ${color}`}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">Ajuste de Demanda (%)</Label>
          <div className="flex items-center gap-3">
            <Slider
              value={[scenarios[type].demandAdjustment]}
              onValueChange={(val) =>
                setScenarios((prev) => ({
                  ...prev,
                  [type]: { ...prev[type], demandAdjustment: val[0] },
                }))
              }
              min={-20}
              max={20}
              step={1}
              className="flex-1"
            />
            <span className="w-12 text-sm font-medium">{scenarios[type].demandAdjustment}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Ajuste de Precio (%)</Label>
          <div className="flex items-center gap-3">
            <Slider
              value={[scenarios[type].priceAdjustment]}
              onValueChange={(val) =>
                setScenarios((prev) => ({
                  ...prev,
                  [type]: { ...prev[type], priceAdjustment: val[0] },
                }))
              }
              min={-20}
              max={20}
              step={1}
              className="flex-1"
            />
            <span className="w-12 text-sm font-medium">{scenarios[type].priceAdjustment}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Costo de Promoción ($)</Label>
          <Input
            type="number"
            value={scenarios[type].promotionCost}
            onChange={(e) =>
              setScenarios((prev) => ({
                ...prev,
                [type]: { ...prev[type], promotionCost: Number(e.target.value) },
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Inventario Inicial (Unidades)</Label>
          <Input
            type="number"
            value={scenarios[type].initialInventory}
            onChange={(e) =>
              setScenarios((prev) => ({
                ...prev,
                [type]: { ...prev[type], initialInventory: Number(e.target.value) },
              }))
            }
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard de Simulación</h1>
          <p className="mt-2 text-muted-foreground">
            Crea y compara diferentes escenarios de ventas
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="flex flex-wrap gap-4 pt-6">
            <div className="flex-1 min-w-[200px]">
              <Label>Seleccionar Ítem o Categoría</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los productos</SelectItem>
                  <SelectItem value="cat1">Categoría 1</SelectItem>
                  <SelectItem value="cat2">Categoría 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Label>Período de Simulación</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Label>Rango de Fechas</Label>
              <Select defaultValue="6m">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3m">Próximos 3 meses</SelectItem>
                  <SelectItem value="6m">Próximos 6 meses</SelectItem>
                  <SelectItem value="12m">Próximos 12 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Scenario Panels */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <ScenarioCard type="conservative" title="Escenario Conservador" color="border-conservative" />
          <ScenarioCard type="realistic" title="Escenario Realista (Base)" color="border-realistic" />
          <ScenarioCard type="optimistic" title="Escenario Optimista" color="border-optimistic" />
        </div>

        {/* Execute Button */}
        <div className="mb-8 flex justify-center">
          <Button size="lg" onClick={handleRunSimulation} className="px-12">
            <Play className="mr-2 h-5 w-5" />
            Ejecutar Simulación
          </Button>
        </div>

        {/* Results */}
        {showResults && (
          <Card>
            <CardHeader>
              <CardTitle>Resultados de la Simulación</CardTitle>
              <CardDescription>Análisis comparativo de los tres escenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="charts" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="charts">Comparativa Gráfica</TabsTrigger>
                  <TabsTrigger value="metrics">Métricas Clave</TabsTrigger>
                  <TabsTrigger value="comparison">Dashboard vs. Histórico</TabsTrigger>
                </TabsList>

                <TabsContent value="charts" className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Proyección de Ventas (Unidades)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockSalesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="conservative" stroke="hsl(var(--conservative))" strokeWidth={2} name="Conservador" />
                        <Line type="monotone" dataKey="realistic" stroke="hsl(var(--realistic))" strokeWidth={2} name="Realista" />
                        <Line type="monotone" dataKey="optimistic" stroke="hsl(var(--optimistic))" strokeWidth={2} name="Optimista" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Proyección de Rentabilidad ($)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockProfitData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="conservative" stroke="hsl(var(--conservative))" strokeWidth={2} name="Conservador" />
                        <Line type="monotone" dataKey="realistic" stroke="hsl(var(--realistic))" strokeWidth={2} name="Realista" />
                        <Line type="monotone" dataKey="optimistic" stroke="hsl(var(--optimistic))" strokeWidth={2} name="Optimista" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                <TabsContent value="metrics">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="p-3 text-left font-semibold">Métrica</th>
                          <th className="p-3 text-right font-semibold text-conservative">Conservador</th>
                          <th className="p-3 text-right font-semibold text-realistic">Realista</th>
                          <th className="p-3 text-right font-semibold text-optimistic">Optimista</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3">Ingresos Totales</td>
                          <td className="p-3 text-right">$82,500</td>
                          <td className="p-3 text-right">$105,000</td>
                          <td className="p-3 text-right">$142,500</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3">Rentabilidad Total</td>
                          <td className="p-3 text-right">$80,400</td>
                          <td className="p-3 text-right">$102,900</td>
                          <td className="p-3 text-right">$137,100</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-3">Rotación de Inventario</td>
                          <td className="p-3 text-right">4.2x</td>
                          <td className="p-3 text-right">5.4x</td>
                          <td className="p-3 text-right">7.3x</td>
                        </tr>
                        <tr>
                          <td className="p-3">Riesgo de Quiebre</td>
                          <td className="p-3 text-right">Bajo (2)</td>
                          <td className="p-3 text-right">Medio (5)</td>
                          <td className="p-3 text-right">Alto (8)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="comparison">
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Comparación: Escenario Realista vs. Histórico</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={mockComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="metric" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
