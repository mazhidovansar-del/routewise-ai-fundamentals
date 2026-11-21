const roadLayer=document.querySelector('.asset-roads');
const roadColumns=[20,40,60,80];
const roadRows=[100/3,200/3];

const roads=[
  ...roadColumns.map(x=>`<div class="map-road vertical" style="left:${x}%"><span class="map-sidewalk top"></span><span class="road-surface"></span><span class="map-sidewalk bottom"></span></div>`),
  ...roadRows.map(y=>`<div class="map-road horizontal" style="top:${y}%"><span class="map-sidewalk top"></span><span class="road-surface"></span><span class="map-sidewalk bottom"></span></div>`),
  ...roadColumns.flatMap(x=>roadRows.map(y=>`<img class="intersection-art" src="assets/intersection-core.png" alt="" draggable="false" style="left:${x}%;top:${y}%">`))
];

roadLayer.innerHTML=roads.join('');
