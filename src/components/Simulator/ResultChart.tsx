// src/pages/Simulador/components/ResultChart.tsx

import React from 'react';
import type { SimulationResult } from '@/types';
import styles from './ResultChart.module.css';

interface ResultChartProps {
  result: SimulationResult;
  productName: string;
}

const ResultChart: React.FC<ResultChartProps> = ({ result, productName }) => {
  const allData = [...result.historical, ...result.predictions];
  const maxSales = Math.max(...allData.map(d => d.sales));
  const chartHeight = 200;
  const chartWidth = 800;
  const padding = 40;

  const xStep = (chartWidth - padding * 2) / (allData.length - 1);
  const yScale = (chartHeight - padding * 2) / maxSales;

  const historicalPoints = result.historical.map((d, i) => ({
    x: padding + i * xStep,
    y: chartHeight - padding - d.sales * yScale
  }));

  const predictionPoints = result.predictions.map((d, i) => ({
    x: padding + (result.historical.length + i) * xStep,
    y: chartHeight - padding - d.sales * yScale
  }));

  const totalPredictedSales = result.predictions.reduce((sum, p) => sum + p.sales, 0);
  const stockShortfall = result.stock - totalPredictedSales;

  return (
    <div className={styles.resultCard}>
      <div className={styles.resultHeader}>
        <h4 className={styles.resultTitle}>{productName}</h4>
        <div
          className={`${styles.stockBadge} ${
            stockShortfall >= 0 ? styles.stockSufficient : styles.stockInsufficient
          }`}
        >
          Stock: {result.stock} | Predicción total: {totalPredictedSales}
          {stockShortfall < 0 && ` | Faltante: ${Math.abs(stockShortfall)}`}
        </div>
      </div>

      <svg width={chartWidth} height={chartHeight} className={styles.svg}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1={padding}
            y1={chartHeight - padding - maxSales * yScale * ratio}
            x2={chartWidth - padding}
            y2={chartHeight - padding - maxSales * yScale * ratio}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Historical line */}
        <polyline
          points={historicalPoints.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="var(--teal)"
          strokeWidth="2"
        />

        {/* Prediction line */}
        {predictionPoints.length > 0 && (
          <polyline
            points={[
              `${historicalPoints[historicalPoints.length - 1].x},${historicalPoints[historicalPoints.length - 1].y}`,
              ...predictionPoints.map(p => `${p.x},${p.y}`)
            ].join(' ')}
            fill="none"
            stroke="var(--saffron)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        )}

        {/* Historical points */}
        {historicalPoints.map((p, i) => (
          <circle
            key={`h-${i}`}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="var(--teal)"
          />
        ))}

        {/* Prediction points */}
        {predictionPoints.map((p, i) => (
          <circle
            key={`p-${i}`}
            cx={p.x}
            cy={p.y}
            r="4"
            fill="var(--saffron)"
          />
        ))}

        {/* X-axis labels */}
        {allData.map((d, i) => {
          // Mostrar solo algunos labels para no saturar
          if (i % 2 === 0 || i === allData.length - 1) {
            return (
              <text
                key={i}
                x={padding + i * xStep}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="10"
                fill="#6b7280"
              >
                {d.month}
              </text>
            );
          }
          return null;
        })}

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <text
            key={ratio}
            x={padding - 10}
            y={chartHeight - padding - maxSales * yScale * ratio + 4}
            textAnchor="end"
            fontSize="10"
            fill="#6b7280"
          >
            {Math.round(maxSales * ratio)}
          </text>
        ))}
      </svg>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.legendHistorical}`}></div>
          <span>Histórico</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.legendPrediction}`}></div>
          <span>Predicción</span>
        </div>
      </div>
    </div>
  );
};

export default ResultChart;