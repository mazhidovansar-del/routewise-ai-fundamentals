# RouteWise

An interactive courier route-planning demo. Choose the courier's starting building, assign a restaurant and customer to each order, and enter how long remains until the order is ready. The planner accounts for travel, waiting, and the courier's location after each delivery.

## Run

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Select a location target and click a building on the map, or use the dropdowns. Add or remove orders, choose a shift limit, and select **Plan my route**.

## Algorithms

1. **A* search** estimates paths and travel times on a small weighted city street graph.
2. **CSP backtracking** builds a feasible sequence using each order exactly once, checking valid restaurant/customer locations and the courier shift limit.
3. **Simulated annealing (local search)** explores swaps in a feasible sequence and minimizes the elapsed time until the last delivery. The cooking readiness timers count down from the beginning of the route plan, including driving and delivery time.

A supplementary fuzzy score explains each step’s local priority using travel and cooking wait; it is additional to the three syllabus methods above. The map, restaurants, customers, and travel estimates are synthetic. The demo is not connected to GPS, restaurant systems, or live traffic.

![RouteWise courier route planner](dashboard.png)
