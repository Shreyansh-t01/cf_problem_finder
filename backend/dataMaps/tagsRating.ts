export interface TagPeakRating {
  tag: string;
  rating: number;
}

/**
 * Codeforces Tag Peak Introduction Ratings (R_tag)
 * Used as the anchor point for the Asymmetric Gaussian Relevance Formula.
 */
export const TAG_PEAK_RATINGS: TagPeakRating[] = [
  // --- 800-1000: The Fundamentals (Newbie) ---
  { tag: 'implementation', rating: 800 },
  { tag: 'math', rating: 800 },
  { tag: 'brute force', rating: 900 },
  { tag: 'sortings', rating: 900 },
  { tag: 'strings', rating: 1000 },

  // --- 1100-1300: Standard Logic (Pupil | Div 2 A/B) ---
  { tag: 'greedy', rating: 1100 },
  { tag: 'binary search', rating: 1200 },
  { tag: 'constructive algorithms', rating: 1200 },
  { tag: 'geometry', rating: 1200 },          // Basic coordinate math (Convex hull is harder, but intro is 1200)
  { tag: 'number theory', rating: 1200 },
  { tag: 'two pointers', rating: 1200 },
  { tag: 'bitmasks', rating: 1300 },

  // --- 1400-1600: Core Algorithms (Specialist | Div 2 C) ---
  { tag: 'data structures', rating: 1400 },   // Standard STL: sets, maps, priority queues
  { tag: 'dfs and similar', rating: 1400 },   // Flood fill, basic traversals
  { tag: 'dp', rating: 1500 },                // 1D/2D states, knapsack
  { tag: 'graphs', rating: 1500 },            // BFS, connected components
  { tag: 'hashing', rating: 1500 },           // String polynomial hashing
  { tag: 'trees', rating: 1500 },             // Tree diameter, basic LCA
  { tag: 'combinatorics', rating: 1600 },     // nCr mod P, permutations
  { tag: 'divide and conquer', rating: 1600 },
  { tag: 'interactive', rating: 1600 },
  { tag: 'shortest paths', rating: 1600 },    // Dijkstra

  // --- 1700-1900: Advanced Concepts (Expert | Div 2 D / Div 1 A) ---
  { tag: 'dsu', rating: 1700 },               // Disjoint Set Union
  { tag: 'games', rating: 1700 },             // Game theory, Nim, Sprague-Grundy
  { tag: 'matrices', rating: 1700 },          // Matrix exponentiation for DP
  { tag: 'probabilities', rating: 1700 },     // Expected value, Probability DP
  { tag: 'segment tree', rating: 1800 },      // Point update, range query
  { tag: 'ternary search', rating: 1800 },
  { tag: 'meet-in-the-middle', rating: 1900 },

  // --- 2000-2400+: Grandmaster Mechanics (Candidate Master+ | Div 1 B/C/D) ---
  { tag: 'string suffix structures', rating: 2000 }, // Suffix Arrays, Automaton, Trie
  { tag: '2-sat', rating: 2100 },
  { tag: 'flows', rating: 2100 },             // Max flow, Min cut
  { tag: 'chinese remainder theorem', rating: 2200 },
  { tag: 'expression parsing', rating: 2200 }, // Conceptually simple but implementation-heavy/error-prone
  { tag: 'fft', rating: 2200 },               // Fast Fourier Transform
  { tag: 'graph matchings', rating: 2200 },   // Bipartite matching, Hopcroft-Karp
  { tag: 'schedules', rating: 2200 }
];