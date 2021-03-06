let bars = [];
const def = "#DAA520", chng = "#431f91", finished = "#8ef511", selected = "red", swap="green";

window.onload = setup();

async function setup(){
    let b = document.getElementById("bars");
    let d = document.getElementById("delay");
    document.getElementById("b").innerText = b.value;
    document.getElementById("d").innerText = d.value + "ms";

    if(bars.length != parseInt(b.value)){
        generateBars(parseInt(b.value));
    }
}

function reset(){
	location.reload();
}

function disable_the_input(){
	let x = document.getElementsByTagName("input");
	for(let i=0; i<x.length; i++)
		x[i].disabled = true;
	return parseInt(document.getElementById("delay").value);
}

function finished_sorting(){
	let x = document.getElementsByClassName("bar");
	for(let i=0; i<x.length; i++)
		x[i].style.backgroundColor = finished;
	x = document.getElementsByTagName("input");
	for(let i=0; i<x.length; i++)
		x[i].disabled = false;
	
}

function generateBars(n=-1){
    bars = [];
    let container = document.getElementById("container");
    n = n<0 ? Math.random()*20 : n;
    for(let i=0; i<n; i++){	
        bars.push('<div class="bar" id="' + i + '" style="height:' + Math.floor(2+Math.random()*98) + '%"></div>');
    }
	container.innerHTML = bars.join('');
}	

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve,ms));
}

function map_range(value,in_min,in_max,out_min,out_max){
	return (value-in_min)*(out_max-out_min)/(in_max-in_min)+out_min;
}

