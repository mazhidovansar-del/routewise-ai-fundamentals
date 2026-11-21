# RouteWise — AI Fundamentals project

RouteWise helps a courier choose an efficient sequence of restaurant pickups and customer deliveries. It plans around road travel, cooking readiness, and the courier's changing location.

## Run the local demo

```sh
cd rescuegrid
python3 -m http.server 8000
```

Open http://localhost:8000. Choose a starting building, set restaurant/customer buildings and time until each order is ready, then select **Plan my route**. Click a building on the map to assign the currently selected location. Cooking timers count down from the start of the route plan. The fixed map and times are synthetic; no network or package installation is needed.

## Algorithms

- **A*** finds paths across the city street graph and estimates travel time.
- **Constraint satisfaction with backtracking** searches for a sequence that includes every order once and satisfies the selected courier shift limit.
- **Simulated annealing (local search)** improves the feasible sequence to reduce the time until the final delivery.
- **Fuzzy priority score** combines estimated drive, cooking wait, and customer-leg time as an extra explainable heuristic; it is not counted as one of the three syllabus algorithms.

## Submission files

- `RescueGrid_Technical_Report.docx` — project, algorithms, implementation, evaluation, and limitations
- `RescueGrid_Presentation.pptx` — six-slide project presentation
- `RescueGrid_Demo.mp4` — narrated demo
- `AI_Usage_Declaration.md` — AI use statement; review before submission
- `Team_Contribution_Statement.md` — replace placeholders with actual team contributions

The demo is educational, not a live dispatch service. It uses a fixed map and estimated times, not live traffic or GPS.
