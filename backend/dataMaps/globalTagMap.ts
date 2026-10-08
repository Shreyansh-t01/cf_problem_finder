export const ratingValues = [
  {
    rating: 1200, // Div 3 / Early Div 2 Level
    weights: new Map<string, number>([
      // Core (1.3 - 1.5): The absolute bottlenecks at this rating
      ['implementation', 1.5],
      ['math', 1.4],
      ['greedy', 1.4],
      ['brute force', 1.3],
      ['strings', 1.3],
      ['sortings', 1.3],
      
      // Standard (1.0 - 1.2): Important, but less critical
      ['number theory', 1.2],
      ['constructive algorithms', 1.1],
      ['geometry', 1.0],
      ['two pointers', 1.0],

      // Dampened (0.7 - 0.9): Too advanced to prioritize heavily yet
      ['binary search', 0.9],
      ['dp', 0.8],
      ['graphs', 0.8],
      ['data structures', 0.8],
      ['dfs and similar', 0.8],

      // Penalized (0.5): Niche or highly advanced topics; prevent 1.0 fallback
      ['bitmasks', 0.5], ['combinatorics', 0.5], ['trees', 0.5], ['dsu', 0.5], 
      ['shortest paths', 0.5], ['hashing', 0.5], ['divide and conquer', 0.5], 
      ['games', 0.5], ['interactive', 0.5], ['matrices', 0.5], ['probabilities', 0.5], 
      ['string suffix structures', 0.5], ['graph matchings', 0.5], ['ternary search', 0.5], 
      ['meet-in-the-middle', 0.5], ['2-sat', 0.5], ['chinese remainder theorem', 0.5], 
      ['expression parsing', 0.5], ['fft', 0.5], ['flows', 0.5], ['schedules', 0.5]
    ])
  },
  {
    rating: 1500, // ICPC Prelim / Mid Div 2 Level
    weights: new Map<string, number>([
      // Core (1.3 - 1.5): Algorithmic optimizations and state transitions
      ['dp', 1.5],
      ['binary search', 1.5],
      ['graphs', 1.4],
      ['data structures', 1.4],
      ['dfs and similar', 1.4],
      ['two pointers', 1.3],
      ['constructive algorithms', 1.3],

      // Standard (1.0 - 1.2): Still highly relevant, but less of a progression wall
      ['greedy', 1.2],
      ['math', 1.2],
      ['implementation', 1.1],
      ['sortings', 1.1],
      ['strings', 1.1],
      ['number theory', 1.1],
      ['trees', 1.1],
      ['bitmasks', 1.0],
      ['brute force', 1.0],

      // Dampened (0.7 - 0.9): Showing up, but not the primary focus
      ['combinatorics', 0.9],
      ['dsu', 0.9],
      ['shortest paths', 0.9],
      ['hashing', 0.9],
      ['divide and conquer', 0.8],
      ['games', 0.8],
      ['geometry', 0.8],
      ['interactive', 0.8],

      // Penalized (0.5): Grandmaster/Specialized topics
      ['matrices', 0.5], ['probabilities', 0.5], ['string suffix structures', 0.5], 
      ['graph matchings', 0.5], ['ternary search', 0.5], ['meet-in-the-middle', 0.5], 
      ['2-sat', 0.5], ['chinese remainder theorem', 0.5], ['expression parsing', 0.5], 
      ['fft', 0.5], ['flows', 0.5], ['schedules', 0.5]
    ])
  },
  {
    rating: 1800, // Div 1 / Advanced ICPC Level
    weights: new Map<string, number>([
      // Core (1.3 - 1.5): Heavy math, complex structures, and advanced DP
      ['dp', 1.5],
      ['trees', 1.5],
      ['data structures', 1.5],
      ['combinatorics', 1.4],
      ['graphs', 1.4],
      ['math', 1.4],
      ['number theory', 1.3],
      ['bitmasks', 1.3],
      ['dsu', 1.3],
      ['shortest paths', 1.3],

      // Standard (1.0 - 1.2): Core mechanics that are now assumed baseline knowledge
      ['binary search', 1.2],
      ['constructive algorithms', 1.2],
      ['divide and conquer', 1.2],
      ['hashing', 1.2],
      ['strings', 1.1],
      ['two pointers', 1.1],
      ['greedy', 1.0],
      ['games', 1.0],
      ['probabilities', 1.0],
      ['matrices', 1.0],
      ['string suffix structures', 1.0],
      ['interactive', 1.0],

      // Dampened (0.6 - 0.9): Too basic or too niche to be the main bottleneck
      ['dfs and similar', 0.9],
      ['implementation', 0.8],
      ['sortings', 0.8],
      ['geometry', 0.8],
      ['brute force', 0.7],
      ['ternary search', 0.7],
      ['graph matchings', 0.7],

      // Penalized (0.5): Extremely rare mathematical/specialized topics
      ['meet-in-the-middle', 0.5], ['2-sat', 0.5], ['chinese remainder theorem', 0.5], 
      ['expression parsing', 0.5], ['fft', 0.5], ['flows', 0.5], ['schedules', 0.5]
    ])
  }
];