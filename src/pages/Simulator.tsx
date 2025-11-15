// src/pages/SimulatorPage/SimulatorPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductSearch from '@/components/Simulator/ProductSearch';
import ProductTable from '@/components/Simulator/ProductTable';
import SimulationForm from '@/components/Simulator/SimulationForm';
import ResultChart from '@/components/Simulator/ResultChart';
import type { Product, SimulationParams, SimulationResult, PredictionData } from '@/types';
import { mockProducts, mockHistoricalData } from './MockData';
import styles from '@/styles/Simulador.module.css';

export default function SimulatorPage() {
  const navigate = useNavigate();
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showSimulationForm, setShowSimulationForm] = useState(false);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);

  // NUEVO: Sincroniza selectedProducts con filteredProducts
  useEffect(() => {
    setSelectedProducts(prev =>
      prev.filter(code => filteredProducts.some(p => p.code === code))
    );
  }, [filteredProducts]);

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p =>
        p.code.toLowerCase().includes(query.toLowerCase()) ||
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleToggleProduct = (code: string) => {
    setSelectedProducts(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : [...prev, code]
    );
  };

  const handleToggleAll = () => {
    const visibleCodes = filteredProducts.map(p => p.code);
    const allVisibleSelected = visibleCodes.every(code => selectedProducts.includes(code));

    if (allVisibleSelected) {
      // Deseleccionar todos los visibles
      setSelectedProducts(prev => prev.filter(code => !visibleCodes.includes(code)));
    } else {
      // Seleccionar todos los visibles (sin duplicados)
      setSelectedProducts(prev => [
        ...prev.filter(code => !visibleCodes.includes(code)),
        ...visibleCodes
      ]);
    }
  };

  const handleStartSimulation = () => {
    if (selectedProducts.length === 0) {
      alert('Por favor, selecciona al menos un producto');
      return;
    }
    setShowSimulationForm(true);
  };

  const handleSimulationSubmit = async (params: SimulationParams) => {
    const apiPayload = {
      productCodes: selectedProducts,
      months: params.months,
      hasRain: params.hasRain,
      hasPromotion: params.hasPromotion,
      hasFair: params.hasFair
    };

    console.log('=== LLAMADA A LA API ===');
    console.log('Endpoint: POST /api/simulate');
    console.log('Payload:', JSON.stringify(apiPayload, null, 2));
    console.log('========================');

    // Simulación con datos mock
    const results: SimulationResult[] = selectedProducts.map(code => {
      const product = products.find(p => p.code === code)!;
      const historical = mockHistoricalData[code] || [];
      const predictions: PredictionData[] = [];
      const months = ['nov-25', 'dic-25', 'ene-26', 'feb-26', 'mar-26', 'abr-26'];

      for (let i = 0; i < params.months; i++) {
        const baseSales = historical[historical.length - 1]?.sales || 100;
        let predictedSales = baseSales * (0.8 + Math.random() * 0.4);

        if (params.hasPromotion) predictedSales *= 1.3;
        if (params.hasFair) predictedSales *= 1.2;
        if (params.hasRain) predictedSales *= 0.85;

        predictions.push({
          month: months[i],
          sales: Math.round(predictedSales)
        });
      }

      const totalPredicted = predictions.reduce((sum, p) => sum + p.sales, 0);

      return {
        productCode: code,
        historical,
        predictions,
        stock: product.stock,
        stockSufficient: product.stock >= totalPredicted,
        shortfall: product.stock < totalPredicted ? totalPredicted - product.stock : undefined
      };
    });

    console.log('=== RESPUESTA MOCK ===', results);
    setSimulationResults(results);
    setShowSimulationForm(false);
  };

  const handleCancelSimulation = () => {
    setShowSimulationForm(false);
  };

  const handleNewSimulation = () => {
    setSimulationResults([]);
    setSelectedProducts([]);
    setShowSimulationForm(false);
  };

  // Contador de productos seleccionados visibles
  const visibleSelectedCount = selectedProducts.filter(code =>
    filteredProducts.some(p => p.code === code)
  ).length;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Simulador de Ventas</h1>
      <p className={styles.subtitle}>
        Selecciona productos y configura los parámetros para predecir ventas futuras
      </p>

      {simulationResults.length === 0 ? (
        <>
          {!showSimulationForm ? (
            <>
              <ProductSearch onSearch={handleSearch} />

              <div className={styles.selectedInfo}>
                <span className={styles.selectedText}>
                  {visibleSelectedCount > 0
                    ? `${visibleSelectedCount} de ${selectedProducts.length} seleccionado(s)`
                    : `${selectedProducts.length} producto(s) seleccionado(s)`}
                </span>
                {selectedProducts.length > 0 && (
                  <button onClick={handleStartSimulation} className={styles.simulateButton}>
                    Iniciar Simulación
                  </button>
                )}
              </div>

              <ProductTable
                products={filteredProducts}
                selectedProducts={selectedProducts}
                onToggleProduct={handleToggleProduct}
                onToggleAll={handleToggleAll}
              />
            </>
          ) : (
            <SimulationForm
              onSubmit={handleSimulationSubmit}
              onCancel={handleCancelSimulation}
            />
          )}
        </>
      ) : (
        <>
          <div className={styles.resultsHeader}>
            <h2 className={styles.resultsTitle}>Resultados de la Simulación</h2>
            <button onClick={handleNewSimulation} className={styles.newSimulationButton}>
              Nueva Simulación
            </button>
          </div>

          <div className={styles.resultsContainer}>
            {simulationResults.map(result => {
              const product = products.find(p => p.code === result.productCode)!;
              return (
                <ResultChart
                  key={result.productCode}
                  result={result}
                  productName={`${product.code} - ${product.name}`}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}