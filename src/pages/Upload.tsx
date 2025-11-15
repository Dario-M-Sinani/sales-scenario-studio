import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileSpreadsheet, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function UploadPage() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<{ products: File | null; sales: File | null }>({
    products: null,
    sales: null,
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, type: "products" | "sales") => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const csvFile = droppedFiles.find(file => file.name.endsWith(".csv"));
    
    if (csvFile) {
      setFiles(prev => ({ ...prev, [type]: csvFile }));
      toast.success(`Archivo ${csvFile.name} cargado correctamente`);
    } else {
      toast.error("Por favor, sube un archivo CSV válido");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: "products" | "sales") => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith(".csv")) {
      setFiles(prev => ({ ...prev, [type]: file }));
      toast.success(`Archivo ${file.name} cargado correctamente`);
    } else {
      toast.error("Por favor, sube un archivo CSV válido");
    }
  };

  const handleProcessData = () => {
    if (!files.products || !files.sales) {
      toast.error("Por favor, carga ambos archivos antes de continuar");
      return;
    }
    
    toast.success("Datos procesados correctamente");
    setTimeout(() => navigate("/simulator"), 1000);
  };

  const downloadTemplate = (type: "products" | "sales") => {
    const filename = type === "products" ? "plantilla_productos.csv" : "plantilla_ventas_historicas.csv";
    toast.info(`Descargando ${filename}...`);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Carga de Datos</h1>
          <p className="mt-2 text-muted-foreground">
            Carga los archivos CSV con tu historial de ventas y catálogo de productos
          </p>
        </div>

        {/* Templates Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Plantillas de Ejemplo
            </CardTitle>
            <CardDescription>
              Descarga las plantillas para conocer el formato correcto de los archivos
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button variant="outline" onClick={() => downloadTemplate("products")}>
              <Download className="mr-2 h-4 w-4" />
              Plantilla Productos
            </Button>
            <Button variant="outline" onClick={() => downloadTemplate("sales")}>
              <Download className="mr-2 h-4 w-4" />
              Plantilla Ventas Históricas
            </Button>
          </CardContent>
        </Card>

        {/* Upload Areas */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Products Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Catálogo de Productos
              </CardTitle>
              <CardDescription>
                Archivo CSV con la información de tus productos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "products")}
                className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileInput(e, "products")}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                {files.products ? (
                  <div className="text-center">
                    <p className="font-medium text-foreground">{files.products.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(files.products.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      Arrastra tu archivo CSV aquí
                    </p>
                    <p className="text-xs text-muted-foreground">o haz clic para seleccionar</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sales Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Historial de Ventas
              </CardTitle>
              <CardDescription>
                Archivo CSV con tu historial de ventas histórico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, "sales")}
                className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileInput(e, "sales")}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
                <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                {files.sales ? (
                  <div className="text-center">
                    <p className="font-medium text-foreground">{files.sales.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(files.sales.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">
                      Arrastra tu archivo CSV aquí
                    </p>
                    <p className="text-xs text-muted-foreground">o haz clic para seleccionar</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Process Button */}
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            onClick={handleProcessData}
            disabled={!files.products || !files.sales}
            className="px-8"
          >
            Procesar Datos y Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
