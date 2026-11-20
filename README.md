# RescueGrid — AI Fundamentals project

RescueGrid helps community food coordinators match surplus donations to partner hubs and plan short handoff routes. One workflow combines fuzzy urgency scoring, CSP backtracking, and A* graph search.

## Run the local demo

```sh
cd rescuegrid
python3 -m http.server 8000
```

Open http://localhost:8000 and select **Run matching**. The application is static HTML, CSS, and JavaScript; no package installation or external AI service is needed. Sample offers, demand, capacities, and map locations are synthetic.

## Project files

- `rescuegrid/` — application source and local run instructions
- `RescueGrid_Technical_Report.docx` — algorithms, implementation, results, limits, and demo steps
- `RescueGrid_Presentation.pptx` — six-slide project presentation
- `RescueGrid_Demo.mp4` — narrated 2 minute 28 second walkthrough
- `AI_Usage_Declaration.md` — AI use statement; review before submission
- `Team_Contribution_Statement.md` — fill in actual team member names and work before submission

## Prototype result

On the included dataset, the solver assigns four offers totaling 150 of 286 meals (52%). Three urgent handoffs are drawn on the neighborhood map. These results come from a deterministic synthetic scenario; they are not measured community outcomes.
