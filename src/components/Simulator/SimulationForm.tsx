// src/pages/Simulador/components/SimulationForm.tsx

import React, { useState } from 'react';
import type { SimulationParams } from '@/types';
import styles from './SimulationForm.module.css';

interface SimulationFormProps {
  onSubmit: (params: SimulationParams) => void;
  onCancel: () => void;
}

const SimulationForm: React.FC<SimulationFormProps> = ({ onSubmit, onCancel }) => {
  const [params, setParams] = useState<SimulationParams>({
    months: 1,
    hasRain: false,
    hasPromotion: false,
    hasFair: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Parámetros de Simulación</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Meses a predecir:</label>
          <select
            value={params.months}
            onChange={(e) => setParams({ ...params, months: Number(e.target.value) as 1 | 2 | 3 | 6 })}
            className={styles.select}
          >
            <option value={1}>1 mes</option>
            <option value={2}>2 meses</option>
            <option value={3}>3 meses</option>
            <option value={6}>6 meses</option>
          </select>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={params.hasRain}
              onChange={(e) => setParams({ ...params, hasRain: e.target.checked })}
              className={styles.checkbox}
            />
            <span>¿Hay lluvia?</span>
          </label>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={params.hasPromotion}
              onChange={(e) => setParams({ ...params, hasPromotion: e.target.checked })}
              className={styles.checkbox}
            />
            <span>¿Hay promoción?</span>
          </label>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={params.hasFair}
              onChange={(e) => setParams({ ...params, hasFair: e.target.checked })}
              className={styles.checkbox}
            />
            <span>¿Hay feria?</span>
          </label>
        </div>

        <div className={styles.formActions}>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancelar
          </button>
          <button type="submit" className={styles.submitButton}>
            Simular
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimulationForm;