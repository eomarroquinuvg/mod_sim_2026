
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
$$("[data-tab]").forEach(b=>b.onclick=()=>{$$(".tab").forEach(x=>x.hidden=x.id!==b.dataset.tab);$$("[data-tab]").forEach(x=>x.className="btn secondary");b.className="btn"});
let supply,demand,sol,total,finished;
function treset(){supply=[70,50];demand=[40,30,50];sol=[[0,0,0],[0,0,0]];total=0;finished=false;$("#tlog").textContent="Busca la celda disponible con menor costo.";tshow()}
const costs=[[4,8,8],[2,5,7]];
function tstep(){if(finished)return;let opts=[];for(let i=0;i<2;i++)for(let j=0;j<3;j++)if(supply[i]>0&&demand[j]>0)opts.push([costs[i][j],i,j]);if(!opts.length){finished=true;return}opts.sort((a,b)=>a[0]-b[0]);let [c,i,j]=opts[0],q=Math.min(supply[i],demand[j]);sol[i][j]+=q;supply[i]-=q;demand[j]-=q;total+=q*c;$("#tlog").textContent+=`\nO${i+1} → D${j+1}: min(oferta ${q+supply[i]}, demanda ${q+demand[j]}) = ${q}; ${q}×${c}=${q*c}.`;if(demand.every(x=>x===0))finished=true;tshow()}
function tshow(){$("#tstate").innerHTML=`Oferta restante: <b>${supply.join(", ")}</b> · Demanda restante: <b>${demand.join(", ")}</b><br>Asignación: <span class="mono">[${sol[0]}] [${sol[1]}]</span> · Costo acumulado: <b>${total}</b>${finished?"<br><b>Solución factible terminada.</b>":""}`}
$("#treset").onclick=treset;$("#tstep").onclick=tstep;$("#tall").onclick=()=>{while(!finished)tstep()};treset();
$$(".route").forEach(b=>b.onclick=()=>{let c=+b.dataset.cost,total=c*20;$("#rresult").innerHTML=`Ruta <b>${b.dataset.route.replaceAll("-"," → ")}</b><br>Costo unitario: <b>Q${c}</b> · 20 unidades × Q${c} = <b>Q${total}</b>${c===5?"<br>⭐ Es la más barata de las tres rutas.":""}`});
const ac=[[9,2,7],[6,4,3],[5,8,1]], names=["A","B","C"];
$("#check").onclick=()=>{let v=$$(".task").map(x=>names.indexOf(x.value));if(new Set(v).size<3){$("#aresult").innerHTML="<b>Asignación inválida:</b> una tarea no puede repetirse.";return}let c=v.reduce((s,t,p)=>s+ac[p][t],0);$("#aresult").innerHTML=`Costo de tu asignación: <b>${c}</b>${c===9?"<br>⭐ ¡Encontraste el óptimo!":""}`};
$("#optimal").onclick=()=>{$$(".task")[0].value="B";$$(".task")[1].value="A";$$(".task")[2].value="C";$("#aresult").innerHTML="Óptimo: <b>Ana → B, Luis → A, Marta → C</b>. Costo = <b>2 + 6 + 1 = 9</b>."};
