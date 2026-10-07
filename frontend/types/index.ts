export type FindingCategory = 'synthetic' | 'manipulation' | 'anomaly' | 'integrity';

export type FindingSeverity = 'low' | 'moderate' | 'elevated' | 'high';

export interface Finding {
  id: string; // e.g., "E-014"
  title: string;
  category: FindingCategory;
  severity: FindingSeverity;
  confidence: number; // 0.0 - 1.0
  confidenceInterval?: [number, number];
  observation: string;
  affectedColumns: string[];
  affectedRecordsCount?: number;
  sampleSize?: number;
  whyItMatters: string;
  interpretation: string[];
  limitations: string;
  visualizationType:
    | 'dependency-scatter'
    | 'distribution-shift'
    | 'benford-law'
    | 'cluster-anomaly'
    | 'correlation-residual'
    | 'precision-truncation';
  technicalParameters?: Record<string, string | number>;
}

export type HealthStatus = 'healthy' | 'moderate' | 'elevated' | 'critical';

export interface DatasetStatus {
  integrity: HealthStatus;
  anomalies: HealthStatus;
  syntheticIndicators: HealthStatus;
}

export interface DatasetMetadata {
  id: string;
  name: string;
  format: 'csv' | 'parquet' | 'json';
  rowCount: number;
  columnCount: number;
  fileSize: string;
  uploadDate: string;
  lastAnalyzed?: string;
  status: DatasetStatus;
  summary: {
    numericalCount: number;
    categoricalCount: number;
    datetimeCount: number;
  };
}

export interface ColumnProfile {
  name: string;
  type: 'numeric' | 'categorical' | 'datetime' | 'identifier';
  missingCount: number;
  missingPercent: number;
  uniqueCount: number;
  keySignals: string[];
  stats?: {
    mean?: number;
    median?: number;
    stdDev?: number;
    min?: number;
    max?: number;
    skewness?: number;
    kurtosis?: number;
  };
  sampleValues: (string | number)[];
  distributionBins?: { label: string; value: number; refValue?: number }[];
  correlations?: { column: string; coefficient: number; expectedCoefficient?: number }[];
}

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending' | 'failed';
  details?: string;
  durationMs?: number;
}

export interface AnalysisReport {
  id: string;
  datasetName: string;
  datasetId: string;
  generatedAt: string;
  reportHash: string;
  executiveSummary: string;
  datasetOverview: string;
  integrityOverview: string;
  anomaliesOverview: string;
  syntheticIndicatorsOverview: string;
  manipulationOverview: string;
  methodologyNotes: string;
  limitationsDisclaimer: string;
}
