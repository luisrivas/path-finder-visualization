'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PathFinderVisualization: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [paths, setPaths] = useState<number[][]>([]);

  const calculatePaths = useCallback(() => {
    const m = grid.length;
    const n = grid[0].length;
    const dp: number[][] = Array(m)
      .fill(0)
      .map(() => Array(n).fill(0));

    if (grid[0][0] === -1 || grid[m - 1][n - 1] === -1) {
      setPaths(dp);
      return;
    }

    dp[0][0] = 1;

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] === -1) continue;
        if (i > 0 && grid[i - 1][j] !== -1) dp[i][j] += dp[i - 1][j];
        if (j > 0 && grid[i][j - 1] !== -1) dp[i][j] += dp[i][j - 1];
        if (i > 0 && j > 0 && grid[i - 1][j - 1] !== -1)
          dp[i][j] += dp[i - 1][j - 1];
      }
    }

    setPaths(dp);
  }, [grid]);

  useEffect(() => {
    calculatePaths();
  }, [calculatePaths]);

  const toggleCell = (i: number, j: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      newGrid[i][j] = newGrid[i][j] === -1 ? 0 : -1;
      return newGrid;
    });
  };

  const addRow = () => {
    setGrid((prevGrid) => [...prevGrid, Array(prevGrid[0].length).fill(0)]);
  };

  const addColumn = () => {
    setGrid((prevGrid) => prevGrid.map((row) => [...row, 0]));
  };

  return (
    <Card className="w-full max-w-fit mx-auto">
      <CardHeader>
        <CardTitle>Path Finder Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 mb-4">
          {grid.map((row, i) => (
            <div key={i} className="flex gap-2">
              {row.map((cell, j) => (
                <Button
                  key={j}
                  variant={cell === -1 ? 'destructive' : 'outline'}
                  className="w-12 h-12 p-0 flex items-center justify-center text-sm"
                  onClick={() => toggleCell(i, j)}
                >
                  {cell === -1 ? 'X' : paths[i]?.[j] ?? 0}
                </Button>
              ))}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-4">
          <Button onClick={addRow} variant="secondary">
            Add Row
          </Button>
          <Button onClick={addColumn} variant="secondary">
            Add Column
          </Button>
        </div>
        <div className="text-sm font-medium">
          Total Paths: {paths[grid.length - 1]?.[grid[0].length - 1] ?? 0}
        </div>
      </CardContent>
    </Card>
  );
};

export default PathFinderVisualization;
