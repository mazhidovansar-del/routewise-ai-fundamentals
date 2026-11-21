const roadLayer=document.querySelector('.asset-roads');
const mapColumns=5,mapRows=3;
const roadXs=Array.from({length:mapColumns-1},(_,i)=>(i+1)*100/mapColumns);
const roadYs=Array.from({length:mapRows-1},(_,i)=>(i+1)*100/mapRows);
roadLayer.innerHTML=roadXs.map(x=>`<span class="map-road vertical" style="left:${x}%"></span>`).join('')+
  roadYs.map(y=>`<span class="map-road horizontal" style="top:${y}%"></span>`).join('')+
  roadXs.flatMap(x=>roadYs.map(y=>`<img class="intersection-art" src="assets/intersection-core.png" alt="" style="left:${x}%;top:${y}%">`)).join('');
