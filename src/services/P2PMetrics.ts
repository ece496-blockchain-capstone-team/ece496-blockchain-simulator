import Metrics from './Metrics';

export default class P2PLatencyMetricsObj extends Metrics.MetricsObj {
  /**
   * Create a metric object which can be manipulated to be plotted
   * @param keyName Name of the keys
   * @param valName Name of the values
   * @param metricId id of metric object
   * @param metricKeys keys for plot
   * @param metricVals values for plot
   */
  constructor(
    metricId: number,
    keyName: string,
    valName: string,
    metricKeys: number[],
    metricVals: any[]
  ) {
    super(
      metricId,
      Metrics.MetricType.P2PLatency,
      keyName,
      valName,
      metricKeys,
      metricVals
    );
  }

  exportToCSV(): string {
    return '';
  }
}
