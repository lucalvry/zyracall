import { useState, useMemo } from 'react';
import { useWebRTCTest, WebRTCTestResult } from './useWebRTCTest';

export interface ConnectivityVerdict {
  level: 'excellent' | 'good' | 'warning' | 'poor';
  title: string;
  description: string;
  color: string;
}

export interface MetricExplanation {
  label: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'poor';
  explanation: string;
}

export interface Recommendation {
  icon: string;
  text: string;
  priority: 'high' | 'medium' | 'low';
}

const calculateReliabilityScore = (latency: number, jitter: number, packetLoss: number): number => {
  const latencyPenalty = Math.min(40, latency * 0.2);
  const jitterPenalty = Math.min(30, jitter * 0.6);
  const packetLossPenalty = Math.min(30, packetLoss * 6);
  return Math.max(0, Math.min(100, Math.round(100 - latencyPenalty - jitterPenalty - packetLossPenalty)));
};

const getVerdict = (score: number, countryName: string): ConnectivityVerdict => {
  if (score >= 85) return {
    level: 'excellent',
    title: `Your network is ready to call ${countryName}`,
    description: 'Expect crystal-clear audio with no interruptions.',
    color: 'text-green-500',
  };
  if (score >= 65) return {
    level: 'good',
    title: `Your network is ready to call ${countryName}`,
    description: 'Good quality calls with occasional minor variations.',
    color: 'text-green-500',
  };
  if (score >= 40) return {
    level: 'warning',
    title: `Calls to ${countryName} may experience occasional issues`,
    description: 'You might notice slight delays or choppy audio at times.',
    color: 'text-yellow-500',
  };
  return {
    level: 'poor',
    title: `Your network isn't reliable enough for stable calls to ${countryName}`,
    description: 'Calls may drop or have significant audio quality issues.',
    color: 'text-red-500',
  };
};

const getMetricExplanations = (result: WebRTCTestResult): MetricExplanation[] => [
  {
    label: 'Latency',
    value: result.latency,
    unit: 'ms',
    status: result.latency < 50 ? 'good' : result.latency < 150 ? 'warning' : 'poor',
    explanation: result.latency < 50
      ? 'Excellent — conversations will feel natural.'
      : result.latency < 150
        ? 'Acceptable — slight delay may be noticeable.'
        : 'High latency can cause noticeable delays in conversation.',
  },
  {
    label: 'Jitter',
    value: result.jitter,
    unit: 'ms',
    status: result.jitter < 15 ? 'good' : result.jitter < 40 ? 'warning' : 'poor',
    explanation: result.jitter < 15
      ? 'Stable connection — audio will be smooth.'
      : result.jitter < 40
        ? 'Some variation — audio may occasionally sound choppy.'
        : 'High jitter can cause choppy or robotic-sounding audio.',
  },
  {
    label: 'Packet Loss',
    value: result.packetLoss,
    unit: '%',
    status: result.packetLoss < 1 ? 'good' : result.packetLoss < 3 ? 'warning' : 'poor',
    explanation: result.packetLoss < 1
      ? 'Minimal loss — all audio data is arriving intact.'
      : result.packetLoss < 3
        ? 'Some packets lost — occasional audio gaps possible.'
        : 'Packet loss above 3% may cause dropped words or call drops.',
  },
];

const getRecommendations = (result: WebRTCTestResult): Recommendation[] => {
  const recs: Recommendation[] = [];
  if (result.latency >= 100) {
    recs.push({ icon: '🔌', text: 'Switch to a wired Ethernet connection for lower latency.', priority: 'high' });
  }
  if (result.jitter >= 30) {
    recs.push({ icon: '📴', text: 'Close background apps and video streams to reduce network congestion.', priority: 'high' });
  }
  if (result.packetLoss >= 2) {
    recs.push({ icon: '📶', text: 'Try moving closer to your Wi-Fi router or switch networks.', priority: 'high' });
  }
  if (result.latency >= 50 && result.latency < 100) {
    recs.push({ icon: '🌐', text: 'A 5GHz Wi-Fi band may offer better performance than 2.4GHz.', priority: 'medium' });
  }
  if (recs.length === 0) {
    recs.push({ icon: '✅', text: 'Your network looks great — no changes needed!', priority: 'low' });
  }
  return recs;
};

const detectUserTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'Unknown';
  }
};

export const useConnectivityPing = () => {
  const { runTest, abortTest, isRunning, progress, result } = useWebRTCTest();
  const [selectedCountry, setSelectedCountry] = useState<{ code: string; name: string } | null>(null);
  const userTimezone = useMemo(() => detectUserTimezone(), []);

  const reliabilityScore = useMemo(() => {
    if (!result) return null;
    return calculateReliabilityScore(result.latency, result.jitter, result.packetLoss);
  }, [result]);

  const verdict = useMemo(() => {
    if (!result || reliabilityScore === null || !selectedCountry) return null;
    return getVerdict(reliabilityScore, selectedCountry.name);
  }, [result, reliabilityScore, selectedCountry]);

  const metricExplanations = useMemo(() => {
    if (!result) return null;
    return getMetricExplanations(result);
  }, [result]);

  const recommendations = useMemo(() => {
    if (!result) return null;
    return getRecommendations(result);
  }, [result]);

  return {
    runTest,
    abortTest,
    isRunning,
    progress,
    result,
    selectedCountry,
    setSelectedCountry,
    reliabilityScore,
    verdict,
    metricExplanations,
    recommendations,
    userTimezone,
  };
};
