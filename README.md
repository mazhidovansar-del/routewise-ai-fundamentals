# RouteWise

RouteWise is an interactive AI Fundamentals project for planning a courier's sequence of restaurant pickups and customer deliveries. It combines street travel, cooking readiness, and the courier's changing location into one route plan. The fixed city map and all sample orders are synthetic; this is a local educational demo, not a live dispatch or navigation service.

## Run the demo

From the repository root:

```sh
python3 -m http.server 8000 --directory rescuegrid
```

Open <http://localhost:8000>. No package install, API key, account, or network service is needed. Alternatively, open `rescuegrid/index.html` directly in a modern browser.

### Use the planner

1. Choose the courier's starting building using **Set start point**, then click the building on the map.
2. Click an order's restaurant or customer field, then choose its building on the map.
3. Set each order's remaining preparation time with its slider. The badge shows the selected duration.
4. Choose a shift limit and select **Plan my route**.
5. Follow the numbered pickup and delivery steps. The route is drawn on the road network, and the courier icon animates along the planned trip. Changing any planning input clears the old plan; plan again to calculate from the new inputs.

Ready times are measured from the start of planning; the estimator subtracts elapsed travel and delivery time while all kitchens prepare in parallel. The demo does not run a live wall-clock countdown.

## How the AI methods work together

The planner uses three course algorithms from different topics:

1. **A* search** finds a path between two buildings on a weighted street graph. Each road edge has an estimated travel-time cost; the Manhattan-distance heuristic guides the search.
2. **Constraint satisfaction with backtracking** builds a complete order sequence. Each order appears once, each restaurant remains paired with its customer, invalid same-building pairs are rejected, and partial sequences that exceed the shift limit are pruned.
3. **Simulated annealing** explores swaps in the complete sequence and minimizes elapsed time until the final delivery. It keeps the best feasible route found during its search.

A supplementary fuzzy score from 0–100 describes the local attractiveness of a single order using travel to the restaurant, cooking wait, and travel to the customer. This score helps rank candidates and explain each step. It is not one of the three course algorithms and does not determine the final route position by itself.

## Time model and limits

For each order in a proposed sequence, the planner estimates travel from the courier's current building to the restaurant, waits only for any remaining preparation time, and then estimates travel to the customer. The courier's next starting point is that customer's building. The objective is the elapsed time from plan start until the last delivery; driving and cooking wait are reported separately. This is a small deterministic demonstration with a fixed map, estimated travel speeds, and synthetic readiness inputs. It has no GPS, live traffic, restaurant system, customer system, or live order data.

## Repository guide

- `rescuegrid/` — working browser application, source, and visual assets
- `TECHNICAL_REPORT.md` — final technical report and evaluation notes
- `RouteWise_Presentation.pptx` — six-slide project presentation
- `AI_Usage_Declaration.md` — AI use disclosure
- `Team_Contribution_Statement.md` — contribution statement for the one-student team
- `RouteWise_Technical_Report.docx` — Word report version
- `RouteWise_Demo.mp4` — 2 minute 29 second walkthrough

## Final-project checklist

- Working local application and demo: available in `rescuegrid/`
- GitHub repository: <https://github.com/mazhidovansar-del/routewise-ai-fundamentals>
- Technical report: `TECHNICAL_REPORT.md` (and Word version)
- Presentation: `RouteWise_Presentation.pptx` (six slides)
- Demo video: `RouteWise_Demo.mp4` (2:29)
- AI usage declaration: `AI_Usage_Declaration.md`
- Team contribution statement: `Team_Contribution_Statement.md`

The contribution statement records a one-student team. Review it for accuracy before submission.
