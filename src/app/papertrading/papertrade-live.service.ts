import { Injectable } from '@angular/core';
import { SmartOrder } from '@shared/index';
import { DaytradeRecommendation } from 'server/api/backtest/backtest.service';

interface PapertraderPositions {
  stock: string;
  orders: SmartOrder[];
}

@Injectable({
  providedIn: 'root'
})
export class PapertradeLiveService {
  algo = {};
  positions = {};
  constructor() { }

  processAnalysis(daytradeType, analysis, quote, timestamp) {
    for (const algoName in analysis) {
      if (analysis.hasOwnProperty(algoName)) {
        if (analysis[algoName] === DaytradeRecommendation.Bullish) {

        } else if (analysis[algoName] === DaytradeRecommendation.Bearish) {

        }
      }
    }
  }
}
