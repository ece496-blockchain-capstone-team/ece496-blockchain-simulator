module Metrics {
  export enum MetricType { // eslint-disable-line no-shadow
    Invalid = 0,
    P2PLatency = 1,
    ConsensusTime = 2,
  }

  export abstract class MetricsObj {
    private metricId: number;
    private metricType: MetricType;
    private keyName: string; // Name of the indices
    private valName: string; // Name of the values
    private metricKeys: number[]; // Indices for the plot
    private metricVals: any[]; // Values for the plot, according to the metricType, the type of values would be specified

    /**
     * Create a metric object which can be manipulated to be plotted
     * @param keyName Name of the keys
     * @param valName Name of the values
     * @param metricId id of metric object
     * @param metricType type of metric, == 0 if invalid
     * @param metricKeys keys for plot
     * @param metricVals values for plot
     */
    constructor(
      metricId: number,
      metricType: MetricType,
      keyName: string,
      valName: string,
      metricKeys: number[],
      metricVals: any[]
    ) {
      this.metricId = metricId;
      this.metricType = metricType;
      this.keyName = keyName;
      this.valName = valName;
      this.metricKeys = metricKeys;
      this.metricVals = metricVals;
    }
  }
}

export default Metrics;
