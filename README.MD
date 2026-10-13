#  Codeforces Practice Plan Generator

A highly optimized, personalized recommendation engine for competitive programmers. Built with TypeScript and Node.js, this tool analyzes a user's Codeforces profile to generate a mathematically perfect 30-problem daily practice plan based on their current rating, weak topics, and the competitive programming meta.

##  Features
* **Zero-Database Architecture:** Fetches and caches the entire Codeforces problem set in-memory for lightning-fast, zero-latency recommendations.
* **Smart Topic Prioritization:** Uses an Asymmetric Gaussian curve and rating-based Linear Interpolation to figure out exactly which topics you need to learn *right now* to break your rating plateau.
* **Compound Tag Bonuses:** Automatically finds "high ROI" problems that combine multiple of your weak topics into a single problem (e.g., practicing both `dp` and `binary search` at the same time).
* **Guaranteed Deduplication:** Cross-references the Codeforces API to ensure you are never recommended a problem you have already solved or attempted.

##  How the 30-Problem Plan Works

The engine dynamically divides your daily practice into three targeted buckets:

1. ** Weakness Bucket (18 Problems):** 
   * **Target:** Current Rating to +100.
   * **Goal:** Plugs the most critical holes in your knowledge. Targets your absolute lowest-scoring, highest-priority tags.
2. ** Stretch Bucket (9 Problems):**
   * **Target:** +100 to +200 above Current Rating.
   * **Goal:** Pushes your rating ceiling. Assigns slightly harder problems on secondary topics where you already have some basic proficiency.
3. ** Exploration Bucket (3 Problems):**
   * **Target:** -100 to Current Rating.
   * **Goal:** Safely introduces foundational topics you have *never* solved before, using slightly easier difficulties to build initial confidence.

## Prerequisites

* [Node.js](https://nodejs.org/) (v16 or higher)
* `npm` or `yarn`

##  Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/codeforces-recommender.git
   cd codeforces-recommender
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

##  How to Use (API)

Once the server is running, the engine will initialize by downloading and caching the Codeforces problem set. 

*Pass a Codeforces handle to the endpoint (e.g., `/api/generate-plan?handle=tourist`), and the engine will calculate their proficiency, prioritize their weak tags, and return a JSON array of 30 tailored problems.*
