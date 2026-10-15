/**
 * Development fixtures matching the payloads returned by the backend.
 * These are intentionally not wired into api.ts or any component.
 */

export interface SampleUserDetails {
  username: string;
  maxRating: number;
  rating: number;
  totalProblemSolved: number;
  rank: string;
  wrongAnswers: number;
  acceptanceRate: number;
  aiResponse: {
    analysisOfUser: string[];
    mistakesUserMade: string[];
    adviceUser: string[];
  };
  arrayRating: [number, number][];
  arrayTagged: [string, number][];
}

export interface SampleProblem {
  problemScore: number;
  problemName: string;
  problemRating: number;
  tags: string[];
  contestId: number;
  index: string;
}

/** The backend's /user/enter JSON response. */
export interface SampleUserApiResponse {
  message: string;
  userDetails: SampleUserDetails;
  verdict: boolean;
}

/** The backend's /problemset/:userId JSON response. Each set is grouped by tag. */
export interface SampleProblemSetApiResponse {
  message: string;
  problemSet1: SampleProblem[][];
  problemSet2: SampleProblem[][];
  problemSet3: SampleProblem[][];
}

/** Equivalent to response.data.userDetails from getUserData(). */
export const sampleUserDetails: SampleUserDetails = {
  username: "shreyanshthakur2007",
  maxRating: 2047,
  rating: 1968,
  totalProblemSolved: 642,
  rank: "candidate master",
  wrongAnswers: 1280,
  acceptanceRate: 33.4,
  aiResponse: {
    analysisOfUser: [
      "Your 1968 rating is close to your 2047 peak, so you have already performed near the next rating tier.",
      "Most of your accepted solutions are between 1200 and 1900, with fewer solves at 2000 and above.",
      "Greedy and implementation are among your most practiced tags; graph and string problems appear less often.",
    ],
    mistakesUserMade: [
      "There are many unsuccessful submissions compared with accepted ones; review repeated attempts for avoidable implementation errors.",
      "The rating distribution thins out above 1900, which may leave less practice with problems at your current contest level.",
    ],
    adviceUser: [
      "Solve a few 1900-2100 problems each week and write down the key observation before coding.",
      "After each contest, revisit problems you could not solve and identify whether the blocker was an algorithm, proof, or implementation detail.",
      "Add graph and string problems to your rotation while keeping regular practice in your stronger greedy topics.",
    ],
  },
  // [problem rating, accepted submissions at that rating]
  arrayRating: [
    [800, 18],
    [900, 25],
    [1000, 34],
    [1100, 42],
    [1200, 55],
    [1300, 68],
    [1400, 77],
    [1500, 82],
    [1600, 79],
    [1700, 71],
    [1800, 53],
    [1900, 28],
    [2000, 10],
  ],
  // [Codeforces tag, accepted submissions involving that tag]
  arrayTagged: [
    ["implementation", 186],
    ["greedy", 171],
    ["math", 143],
    ["data structures", 88],
    ["dp", 74],
    ["binary search", 63],
    ["constructive algorithms", 58],
    ["graphs", 39],
    ["strings", 34],
  ],
};

/** Full /user/enter response, for code that needs the backend envelope. */
export const sampleUserApiResponse: SampleUserApiResponse = {
  message: "user entered",
  userDetails: sampleUserDetails,
  verdict: true,
};

/** Equivalent to response.data from getProblemSet(); problem names and IDs are illustrative. */
export const sampleProblemSetApiResponse: SampleProblemSetApiResponse = {
  message: "problem set generated",
  // The backend returns one problem array per selected tag; ProblemSet flattens these groups.
  problemSet1: [
    [
      {
        problemScore: 1842.6,
        problemName: "Balanced Components",
        problemRating: 1960,
        tags: ["graphs", "dfs and similar", "greedy"],
        contestId: 1987,
        index: "F",
      },
      {
        problemScore: 1718.3,
        problemName: "Connected Segments",
        problemRating: 1900,
        tags: ["graphs", "data structures"],
        contestId: 1987,
        index: "E",
      },
    ],
    [
      {
        problemScore: 1624.8,
        problemName: "Prefix Choices",
        problemRating: 1900,
        tags: ["dp", "strings"],
        contestId: 1992,
        index: "F",
      },
      {
        problemScore: 1490.2,
        problemName: "Subsequence Queries",
        problemRating: 1800,
        tags: ["dp", "strings", "binary search"],
        contestId: 1992,
        index: "D",
      },
    ],
    [
      {
        problemScore: 1576.4,
        problemName: "Range Transformation",
        problemRating: 1900,
        tags: ["data structures", "binary search"],
        contestId: 1978,
        index: "E",
      },
    ],
  ],
  problemSet2: [
    [
      {
        problemScore: 1328.9,
        problemName: "Increasing Paths",
        problemRating: 2000,
        tags: ["graphs", "dp"],
        contestId: 1969,
        index: "F",
      },
      {
        problemScore: 1184.1,
        problemName: "Tree Distances",
        problemRating: 2000,
        tags: ["trees", "dfs and similar"],
        contestId: 1969,
        index: "E",
      },
    ],
    [
      {
        problemScore: 1270.5,
        problemName: "Minimum Operations",
        problemRating: 2100,
        tags: ["math", "number theory"],
        contestId: 1974,
        index: "F",
      },
    ],
    [
      {
        problemScore: 1102.7,
        problemName: "Intervals and Queries",
        problemRating: 2000,
        tags: ["data structures", "binary search"],
        contestId: 1974,
        index: "E",
      },
    ],
  ],
  problemSet3: [
    [
      {
        problemScore: 965.4,
        problemName: "First Visit",
        problemRating: 1800,
        tags: ["strings", "implementation"],
        contestId: 1956,
        index: "D",
      },
      {
        problemScore: 902.1,
        problemName: "Small Graph Tour",
        problemRating: 1700,
        tags: ["graphs", "brute force"],
        contestId: 1956,
        index: "C",
      },
      {
        problemScore: 880.7,
        problemName: "Distinct Values",
        problemRating: 1800,
        tags: ["strings", "sortings"],
        contestId: 1956,
        index: "E",
      },
    ],
  ],
};
