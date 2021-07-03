async function selectionSort(){
	let delay = disable_the_input();
	let container = document.getElementById("container");
	
    for(let i=0; i<bars.length; i++){
		let mn_ind = i;
		let curr_id = bars[i].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;

		for(let j=i+1; j<bars.length; j++){
			let nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			let a = parseInt(bars[mn_ind].split(":")[1].split("%")[0]);
			let b = parseInt(bars[j].split(":")[1].split("%")[0]);
			if(a>b) mn_ind = j;
			await sleep(delay/5.0);
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
		
		let nxt_ele = bars[mn_ind].split('id="')[1].split('"')[0];
		document.getElementById(nxt_ele).style.backgroundColor = swap;
		await sleep(5*delay/5.0);

		let tmp = bars[mn_ind];
		bars[mn_ind] = bars[i];
		bars[i] = tmp;

		container.innerHTML = bars.join('');
		await sleep(2*delay/5.0);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
	finished_sorting();
}

async function bubbleSort(){
    let delay = disable_the_input();
    let container = document.getElementById("container");

    for(let i=0; i<bars.length-1; i++){
        let has_swap = false;
        for(let j=0; j<bars.length-i-1; j++){
            let curr_id = bars[j].split('id="')[1].split('"')[0];
            let nxt_ele = bars[j+1].split('id="')[1].split('"')[0];
            
            document.getElementById(curr_id).style.backgroundColor = selected;
            document.getElementById(nxt_ele).style.backgroundColor = chng;

            await sleep(delay/2);

            let a = parseInt(bars[j].split(":")[1].split("%")[0]);
            let b = parseInt(bars[j+1].split(":")[1].split("%")[0]);
            if(a>b){
                has_swap = true;
                let t = bars[j];
                bars[j] = bars[j+1];
                bars[j+1] = t;

                container.innerHTML = bars.join("");
            }

            await(sleep(delay/2));
            document.getElementById(curr_id).style.backgroundColor = def;
            document.getElementById(nxt_ele).style.backgroundColor = def;
        }
        if(has_swap == false) 
            break;
    }
    finished_sorting();
}

async function insertionSort(){
    let delay = disable_the_input();
    let container = document.getElementById("container");

    for(let i=1; i<bars.length; i++){
        let j = i-1;
        let key = bars[i];
        let curr_id = key.split('id="')[1].split('"')[0];
        document.getElementById(curr_id).style.backgroundColor = selected;
        let nxt_ele = bars[j].split('id="')[1].split('"')[0];

        while(j>=0 && parseInt(bars[j].split(":")[1].split("%")[0]) > parseInt(key.split(":")[1].split("%")[0])){
            document.getElementById(nxt_ele).style.backgroundColor = def;
            nxt_ele = bars[j].split('id="')[1].split('"')[0];
            document.getElementById(nxt_ele).style.backgroundColor = chng;
            await(sleep(delay));
            bars[j+1] = bars[j];
            j--;
        }
        bars[j+1] = key;
        container.innerHTML = bars.join("");
        document.getElementById(curr_id).style.backgroundColor = selected;
        document.getElementById(nxt_ele).style.backgroundColor = chng;
        await(sleep(delay*3.0/5));
        document.getElementById(curr_id).style.backgroundColor = def;
        document.getElementById(nxt_ele).style.backgroundColor = def;
    }
    finished_sorting();
}

function slide_down(l,r){
    let tmp = bars[r];
    for(let i = r-1; i>=l; i--){
        bars[i+1] = bars[i];
    }
    bars[l] = tmp;
}

async function merge(l,m,r,d){
    let i = l;
    let j = m+1;

    while(i<j && j<=r){
        let curr_id = bars[j].split('id="')[1].split('"')[0];
        let nxt_ele = bars[i].split('id="')[1].split('"')[0];
        document.getElementById(curr_id).style.backgroundColor = selected;
        document.getElementById(nxt_ele).style.backgroundColor = chng;
        
        let a = parseInt(bars[j].split(":")[1].split("%")[0]);
        let b = parseInt(bars[i].split(":")[1].split("%")[0]);

        if(a>b){
            i++;
        }
        else{   
            slide_down(i,j);
            i++;
            j++;
        }
        await(sleep(d));
        container.innerHTML = bars.join('');
        document.getElementById(curr_id).style.backgroundColor = selected;
        document.getElementById(nxt_ele).style.backgroundColor = chng;

        await(sleep(d))
        document.getElementById(curr_id).style.backgroundColor = def;
        document.getElementById(nxt_ele).style.backgroundColor = def;
    }
}



async function merge_sort(l, r, d) {
	if (l < r) {
		let m = parseInt(l + (r - l) / 2);
		await merge_sort(l, m, d);
		await merge_sort(m + 1, r, d);
		await merge(l, m, r, d);
	}
}

async function mergeSort(){
    let delay = disable_the_input();
    await merge_sort(0,bars.length-1,delay);
    finished_sorting();
}