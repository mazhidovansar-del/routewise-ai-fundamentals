# RouteWise local demo

See the repository [README](../README.md) for the final project overview, AI methods, limitations, and submission files.

Run from the repository root:

```sh
python3 -m http.server 8000 --directory rescuegrid
```

Open <http://localhost:8000>. Set the courier start and each order location by clicking the corresponding card field and then a building on the map. Adjust order readiness with the slider, choose a shift limit, and select **Plan my route**. The planned route is drawn on the street network and the courier marker follows it. Changes clear the stale plan; plan again to recompute.

The fixed map, sample orders, and travel times are synthetic. The demo has no GPS, live traffic, restaurant integration, or live dispatch.
