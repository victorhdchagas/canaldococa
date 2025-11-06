'use client'

import { useEffect, useState } from 'react'
import Box from '@/components/boxes/box'
import { cn } from '@/lib/utils'

class XPCalculator {
  private initialFactor: number;
  private exponentP: number;
  private multiplier: number;

  constructor(initialFactor: number, exponentP: number, multiplier: number) {
    this.initialFactor = initialFactor;
    this.exponentP = exponentP;
    this.multiplier = multiplier;
  }

  public getTotalXPForLevel(level: number): number {
    if (level <= 1) {
      return 0;
    }

    const xpRequired =
      this.initialFactor + Math.pow(level, this.exponentP) * this.multiplier;

    return Math.floor(xpRequired);
  }
}

interface XPParams {
  initialFactor: number;
  exponentP: number;
  multiplier: number;
}

interface XPTableProps {
  currentLevel: number;
}

export default function XPTable({ currentLevel }: XPTableProps) {
  const [levels, setLevels] = useState<{level: number, xp: number}[]>([]);

  useEffect(() => {
    fetch('/api/user/xp-calculator-params')
      .then(res => res.json())
      .then((params: XPParams) => {
        const calc = new XPCalculator(params.initialFactor, params.exponentP, params.multiplier);
        const data = [];
        for (let i = 1; i <= 20; i++) {
          data.push({ level: i, xp: calc.getTotalXPForLevel(i) });
        }
        setLevels(data);
      });
  }, []);

  return (
    <Box title="Tabela de Experiência" className="w-full">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Level</th>
            <th className="text-left p-2">Required XP</th>
          </tr>
        </thead>
        <tbody>
          {levels.map((item) => (
            <tr key={item.level} className={cn('border-b', item.level <= currentLevel && 'bg-muted')}>
              <td className="p-2">{item.level}</td>
              <td className="p-2">{item.xp.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}