import { NumerologyReport } from '@/app/types/numerology';

export function calculateLifePath(birthDate: string): number {
  const digits = birthDate.replace(/\D/g, '').split('').map(Number);
  let sum = digits.reduce((acc, curr) => acc + curr, 0);

  while (sum > 9) {
    sum = String(sum)
      .split('')
      .reduce((acc, curr) => acc + Number(curr), 0);
  }

  return sum;
}

export function getLifePathTraits(lifePathNumber: number): string[] {
  const traits: Record<number, string[]> = {
    1: ['Leadership', 'Independence', 'Ambition', 'Innovation'],
    2: ['Cooperation', 'Diplomacy', 'Sensitivity', 'Partnership'],
    3: ['Creativity', 'Communication', 'Optimism', 'Expression'],
    4: ['Stability', 'Discipline', 'Hard Work', 'Practicality'],
    5: ['Freedom', 'Adventure', 'Adaptability', 'Curiosity'],
    6: ['Responsibility', 'Nurturing', 'Harmony', 'Service'],
    7: ['Wisdom', 'Introspection', 'Spirituality', 'Analysis'],
    8: ['Power', 'Ambition', 'Abundance', 'Authority'],
    9: ['Compassion', 'Humanitarianism', 'Wisdom', 'Completion'],
  };

  return traits[lifePathNumber] || [];
}

export function getRecommendation(lifePathNumber: number): string {
  const recommendations: Record<number, string> = {
    1: 'Focus on leadership and innovation. Trust your instincts.',
    2: 'Emphasize collaboration and diplomacy in your work.',
    3: 'Express your creativity and communicate your ideas freely.',
    4: 'Build a stable foundation through discipline and hard work.',
    5: 'Embrace change and new experiences to grow.',
    6: 'Serve others and nurture your community.',
    7: 'Seek knowledge and introspection for deeper understanding.',
    8: 'Build your empire with ambition and strategic thinking.',
    9: 'Use your wisdom to help others and make a difference.',
  };

  return recommendations[lifePathNumber] || 'Embrace your unique path.';
}
export function generateFullReport(birthDate: string): NumerologyReport {
  const number = calculateLifePath(birthDate);

  return {
    lifePathNumber: number,
    coreTraits: getLifePathTraits(number),
    recommendation: getRecommendation(number),
  };
}
