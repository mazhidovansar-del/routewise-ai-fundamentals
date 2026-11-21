const roadLayer=document.querySelector('.asset-roads');
const roadColumns=[20,40,60,80];
const roadRows=[100/3,200/3];

const roads=[
  ...roadColumns.map(x=>`<img class="map-road vertical" src="assets/street-segment.png" alt="" draggable="false" style="left:${x}%">`),
  ...roadRows.map(y=>`<img class="map-road horizontal" src="assets/street-segment.png" alt="" draggable="false" style="top:${y}%">`),
  ...roadColumns.flatMap(x=>roadRows.map(y=>`<img class="intersection-art" src="assets/intersection-core.png" alt="" draggable="false" style="left:${x}%;top:${y}%">`))
];

roadLayer.innerHTML=roads.join('');
