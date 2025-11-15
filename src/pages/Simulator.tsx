import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Play } from "lucide-react";
import { toast } from "sonner";

const COLORS = {
  optimistic: "hsl(var(--optimistic))",
  realistic: "hsl(var(--realistic))",
  conservative: "hsl(var(--conservative))",
};

export default function SimulatorPage() {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPromotions, setHasPromotions] = useState(false);
  const [hasFairs, setHasFairs] = useState(false);
  const [hasSpecialWeather, setHasSpecialWeather] = useState(false);
  
  const [scenarioData, setScenarioData] = useState({
    optimistic: [
      { name: "Producto A", value: 35 },
      { name: "Producto B", value: 25 },
      { name: "Producto C", value: 20 },
      { name: "Producto D", value: 15 },
      { name: "Otros", value: 5 },
    ],
    realistic: [
      { name: "Producto A", value: 30 },
      { name: "Producto B", value: 25 },
      { name: "Producto C", value: 22 },
      { name: "Producto D", value: 18 },
      { name: "Otros", value: 5 },
    ],
    conservative: [
      { name: "Producto A", value: 25 },
      { name: "Producto B", value: 25 },
      { name: "Producto C", value: 25 },
      { name: "Producto D", value: 20 },
      { name: "Otros", value: 5 },
    ],
  });

  const handleRunSimulation = async () => {
    setIsLoading(true);
    setShowResults(false);
    
    // Simulate API call
    toast.info("Ejecutando simulación...");
    
    // TODO: Replace with actual API call
    // const response = await fetch('/api/simulate', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     promotions: hasPromotions ? 1 : 0,
    //     fairs: hasFairs ? 1 : 0,
    //     special_weather: hasSpecialWeather ? 1 : 0,
    //   })
    // });
    // const data = await response.json();
    // setScenarioData(data);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
      toast.success("Simulación completada");
    }, 2000);
  };

  const handleGenerateReports = () => {
    navigate("/reports");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard de Simulación</h1>
          <p className="mt-2 text-muted-foreground">
            Configura las variables y ejecuta la simulación
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
              <Select defaultValue="1m">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Próximo 1 Mes</SelectItem>
                  <SelectItem value="2m">Próximos 2 Meses</SelectItem>
                  <SelectItem value="3m">Próximos 3 Meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Variables Externas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Variables Externas</CardTitle>
            <CardDescription>Selecciona los factores que afectarán la simulación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="promotions" 
                checked={hasPromotions}
                onCheckedChange={(checked) => setHasPromotions(checked as boolean)}
              />
              <label
                htmlFor="promotions"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                ¿Habrá Promociones?
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="fairs" 
                checked={hasFairs}
                onCheckedChange={(checked) => setHasFairs(checked as boolean)}
              />
              <label
                htmlFor="fairs"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                ¿Habrá Ferias?
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="weather" 
                checked={hasSpecialWeather}
                onCheckedChange={(checked) => setHasSpecialWeather(checked as boolean)}
              />
              <label
                htmlFor="weather"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                ¿Condiciones climáticas especiales?
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Execute Button */}
        <div className="mb-8 flex justify-center">
          <Button 
            size="lg" 
            onClick={handleRunSimulation} 
            className="px-12"
            disabled={isLoading}
          >
            <Play className="mr-2 h-5 w-5" />
            {isLoading ? "Ejecutando..." : "Ejecutar Simulación"}
          </Button>
        </div>

        {/* Results */}
        {(showResults || isLoading) && (
          <Card>
            <CardHeader>
              <CardTitle>Resultados de la Simulación</CardTitle>
              <CardDescription>Distribución de demanda proyectada por escenario</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-3">
                {/* Optimistic Scenario */}
                <div className="text-center">
                  <h3 className="mb-4 text-lg font-semibold text-optimistic">Escenario Optimista</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={isLoading ? [] : scenarioData.optimistic}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {scenarioData.optimistic.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS.optimistic} opacity={1 - index * 0.15} />
                        ))}
                      </Pie>
                      <Tooltip />
                      {!isLoading && <Legend />}
                    </PieChart>
                  </ResponsiveContainer>
                  {isLoading && <p className="text-sm text-muted-foreground">Cargando...</p>}
                </div>

                {/* Realistic Scenario */}
                <div className="text-center">
                  <h3 className="mb-4 text-lg font-semibold text-realistic">Escenario Realista</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={isLoading ? [] : scenarioData.realistic}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {scenarioData.realistic.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS.realistic} opacity={1 - index * 0.15} />
                        ))}
                      </Pie>
                      <Tooltip />
                      {!isLoading && <Legend />}
                    </PieChart>
                  </ResponsiveContainer>
                  {isLoading && <p className="text-sm text-muted-foreground">Cargando...</p>}
                </div>

                {/* Conservative Scenario */}
                <div className="text-center">
                  <h3 className="mb-4 text-lg font-semibold text-conservative">Escenario Conservador/Pesimista</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={isLoading ? [] : scenarioData.conservative}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {scenarioData.conservative.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS.conservative} opacity={1 - index * 0.15} />
                        ))}
                      </Pie>
                      <Tooltip />
                      {!isLoading && <Legend />}
                    </PieChart>
                  </ResponsiveContainer>
                  {isLoading && <p className="text-sm text-muted-foreground">Cargando...</p>}
                </div>
              </div>

              {/* Generate Reports Button */}
              {showResults && !isLoading && (
                <div className="mt-8 flex justify-center">
                  <Button size="lg" onClick={handleGenerateReports} className="px-12">
                    Generar Reportes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
