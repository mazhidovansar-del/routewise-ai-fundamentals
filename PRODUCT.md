# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A food delivery courier planning several available restaurant orders from a current city location.

## Product Purpose

Help a courier choose an efficient sequence of restaurant pickups and customer deliveries by considering street travel, remaining cooking time, and the courier's location after each delivery. Success means the demo produces an understandable feasible sequence and estimated delivery times.

## Positioning

A map-based courier planner that compares complete multi-order sequences while all restaurant preparation timers continue to count down in parallel.

## Operating Context

The courier chooses a current building on a fixed city map. Each order has one restaurant, one customer building, and an estimate of time remaining until ready. After delivering an order, the courier's next starting point becomes that customer's building. The planner shows travel to the restaurant, any remaining cooking wait, travel to the customer, and cumulative time from the plan start.

## Capabilities and Constraints

- Users can select courier, restaurant, and customer locations from the map or location controls.
- Users can add or remove orders, set time remaining until each order is ready, and choose a shift limit.
- A* searches the fixed street graph for estimated routes.
- CSP backtracking finds a feasible order sequence under the selected shift limit.
- Simulated annealing improves a feasible sequence against the objective of minimizing elapsed time until the final delivery.
- A supplementary fuzzy priority score summarizes local travel and cooking-wait desirability; it is not counted as one of the three syllabus algorithms.
- The map and travel estimates are synthetic. There is no GPS, live traffic, restaurant integration, or live dispatch.
- Current project name in the demo is RouteWise; name approval remains open.
- Current implementation stack: static HTML, CSS, and JavaScript.

## Evidence on Hand

The user-provided final project brief and AI Fundamentals syllabus are at `/Users/ansarmazhidov/Downloads/Final Project.docx` and `/Users/ansarmazhidov/Downloads/7033a59b-ddb1-4844-8522-9ca353322d68-2.pdf`. The project requires three algorithms from different course topics, an integrated working prototype, explanation, evaluation, documentation, and a defense. No real map, traffic, restaurant, courier, or customer data has been supplied; demo data must remain clearly synthetic.

## Product Principles

- Keep the current courier location visible and update it after each delivery in the planned sequence.
- Treat ready times as countdowns from plan start; all orders prepare in parallel.
- Explain each time component so a courier can understand why an order appears in a position.
- Optimize the complete delivery sequence, not a set of independent nearest-restaurant choices.
- Keep the distinction between course algorithms and supplementary heuristics clear.

## Accessibility & Inclusion

The map has equivalent labeled location controls. All actions must work by keyboard, provide visible focus, and remain usable on narrow screens.
