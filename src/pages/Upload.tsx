import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function UploadPage() {
  const navigate = useNavigate();
  const [catalogFile, setCatalogFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/csv") {
      setCatalogFile(file);
      toast.success(`Archivo ${file.name} cargado correctamente`);
    } else {
      toast.error("Por favor, sube un archivo CSV válido");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCatalogFile(file);
      toast.success(`Archivo ${file.name} cargado correctamente`);
    }
  };

  const handleProcess = () => {
    if (!catalogFile) {
      toast.error("Por favor, carga el archivo antes de continuar");
      return;
    }
    toast.success("Datos procesados correctamente");
    setTimeout(() => navigate("/simulator"), 1000);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Carga de Catálogo</h1>
          <p className="mt-2 text-muted-foreground">
            Sube tu archivo CSV de catálogo de productos
          </p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Subir Catálogo de Productos (CSV)
            </CardTitle>
            <CardDescription>
              Arrastra tu archivo o haz clic para seleccionar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
                catalogFile ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
              }`}
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
            >
              <UploadCloud className="mb-4 h-16 w-16 text-muted-foreground" />
              <p className="mb-2 text-lg font-medium">
                {catalogFile ? catalogFile.name : "Arrastra tu archivo aquí"}
              </p>
              <p className="text-sm text-muted-foreground">o haz clic para seleccionar</p>
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileSelect}
                id="catalog-upload"
              />
              <label
                htmlFor="catalog-upload"
                className="mt-6 cursor-pointer rounded-md bg-primary px-6 py-3 text-sm text-primary-foreground hover:bg-primary/90"
              >
                Seleccionar Archivo
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Process Button */}
        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            onClick={handleProcess}
            disabled={!catalogFile}
            className="px-12"
          >
            Procesar Datos
          </Button>
        </div>
      </div>
    </div>
  );
}
