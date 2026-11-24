# RouteWise Technical Report

**Course:** AI Fundamentals  
**Project:** Courier pickup and delivery sequence planner  
**Application:** Static HTML, CSS, and JavaScript  
**Data:** Synthetic fixed map, sample orders, and estimated travel times

## Executive summary

RouteWise helps a courier plan several restaurant pickups and customer deliveries in one trip. It considers the street route to each restaurant, how much longer its order needs to cook, the customer delivery leg, and the courier's location after each delivery. Three AI methods work together: A* search estimates travel paths, constraint satisfaction with backtracking constructs a shift-feasible order sequence, and simulated annealing improves the sequence's final delivery time. The browser demo lets a user place addresses on a map, adjust readiness times, plan again after changing inputs, and inspect the resulting route and step times.

RouteWise is a classroom prototype. The map and travel estimates are synthetic and it is not connected to GPS, traffic, restaurant software, or live delivery operations.

## Problem and motivation

Choosing the nearest restaurant alone can waste courier time. An order may not be ready when the courier arrives, while another order can continue cooking during a pickup and delivery. A courier also does not return to the original location after a drop-off; the delivered customer's building becomes the starting point for the next order. RouteWise models these interactions in a single ordered sequence instead of ranking restaurants independently.

## User workflow

The user chooses one courier starting building and gives every order a restaurant, a customer, and a remaining cooking time. The map shows the buildings and street network. The user sets a shift limit and plans the route. The application lists each pickup and drop-off, travel time, cooking wait, cumulative delivery time, and an individual priority score. The route follows the fixed map's road graph, and a courier marker animates along the planned path. If the user changes a location, readiness time, shift limit, or order set, the previous route is cleared and must be planned again.

Preparation times are relative to the beginning of the plan and decrease conceptually while the courier is on the route. For each proposed order, arrival time is accumulated from prior drive and wait time. Waiting is `max(0, ready time − arrival time)`. Cooking across all restaurants is treated as parallel.

## Integrated algorithms

### A* search

The application represents road junctions and buildings as graph nodes. Adjacent street junctions are joined by weighted edges, and each building connects to nearby streets. Edge costs are estimated minutes. A* ranks a candidate node using `f(n) = g(n) + h(n)`, where `g(n)` is the known travel cost and `h(n)` is Manhattan distance to the destination converted to estimated minutes. It returns the estimated travel time and path for each courier-to-restaurant and restaurant-to-customer leg.

### Constraint satisfaction and backtracking

The sequence problem is represented as assigning each order to one position in a delivery sequence. The hard constraints require every order exactly once, valid restaurant and customer buildings, different restaurant and customer buildings for each order, and total elapsed time within the selected shift limit. Backtracking tries candidate orders and prunes a partial sequence if its estimated completion time already exceeds the limit. A fuzzy local priority score ranks the candidates considered at each depth. The first complete feasible sequence seeds the improvement stage; if none fits the shift, the application still produces a best effort sequence and clearly reports that the shift limit is exceeded.

### Simulated annealing

Starting from the feasible seed, the local-search stage repeatedly swaps two order positions. A candidate with a shorter total elapsed time is accepted. A longer candidate may be accepted with a temperature-dependent probability early in the search, allowing escape from local minima. The temperature decreases during a fixed number of iterations. The best feasible sequence seen is retained. The random-number generator is seeded, making the demo's search reproducible for the same inputs and code version.

### Supplementary fuzzy priority

The displayed 0–100 score summarizes a single order's local drive-to-restaurant time, expected cooking wait, and restaurant-to-customer time with fuzzy membership rules for high, medium, and low desirability. It supports ranking and explanation, but is not the route objective. Therefore, the first order may show a lower individual score than a later order: route position is determined by the full sequence's elapsed time and shift feasibility.

## Objective and evaluation

The route objective is elapsed time from plan start until the last delivery, including both driving and any cooking wait that remains on arrival. The UI reports driving and waiting separately and compares the generated plan with a nearest-first baseline on the same synthetic inputs. The included default data provides a repeatable demonstration, but its result is not evidence of performance on a real city or live orders. Different starting buildings, readiness times, or shift limits can change the travel, waiting, and feasibility results.

The application was checked through the principal workflow: set locations on the map, adjust readiness time, produce a plan, change the courier start, and plan again. Replanning clears stale results and displays the selected starting address and recalculated leg metrics. The map route uses the same graph paths used for time estimates. Syntax and patch-format checks passed during implementation; no claim is made about field performance or real-world route accuracy.

## Limitations and next steps

- Map locations and street geometry are fixed and synthetic.
- Travel times are estimates; road direction, traffic, closures, parking, and walking from curb to entrance are not modeled.
- Readiness times are user estimates rather than restaurant status feeds.
- The search is designed for a small classroom instance, not hundreds of simultaneous orders.
- Simulated annealing is a heuristic; it does not prove a globally optimal route.
- The fuzzy score uses simple normalized thresholds and should be interpreted as a relative explanation, not a calibrated probability.

A future version could ingest a verified road network and travel-time data, update readiness estimates during a trip, model delivery deadlines and vehicle capacity, and compare the heuristic result against exact solutions on small benchmark instances.

## Reproduction

Run the application from the repository root:

```sh
python3 -m http.server 8000 --directory rescuegrid
```

Open <http://localhost:8000>. The application has no backend or runtime package installation. Core implementation is in `rescuegrid/app.js`; the map and interaction styling is in `rescuegrid/style.css` and `rescuegrid/map-assets.css`.
