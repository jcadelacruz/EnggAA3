let degreeOfTool = 1, mult = 10, isPositive = true;
document.getElementById('dplus').addEventListener('click', function(){
    degreeOfTool++;
    mult = 10**degreeOfTool;
    document.getElementById('degree').innerHTML = degreeOfTool;
});
document.getElementById('dmin').addEventListener('click', function(){
    degreeOfTool--;
    mult = 10**degreeOfTool;
    document.getElementById('degree').innerHTML = degreeOfTool;
});
document.getElementById('mplus').addEventListener('click', function(){
    isPositive = true;
});
document.getElementById('mmin').addEventListener('click', function(){
    isPositive = false;
});
function updateTool(comp){
    document.getElementById('name').innerHTML = comp.name;
    document.getElementById('toCopy').innerHTML = comp.width+" "+comp.height+" "+comp.left+" "+comp.top+" "+comp.rotate;
}
document.getElementById('ch1').addEventListener('click', function(){
    const x = parseInt(clicked.mapComponent.style.width.slice(0,-1));
    let j=(mult*(-1));
    if(isPositive){
        j = mult;
    }
    clicked.mapComponent.style.width = (x+j)+"%";
    clicked.width = x+j;
    updateTool(clicked);
});
document.getElementById('ch2').addEventListener('click', function(){
    const x = parseInt(clicked.mapComponent.style.height.slice(0,-1));
    let j=(mult*(-1));
    if(isPositive){
        j = mult;
    }
    clicked.mapComponent.style.height = (x+j)+"%";
    clicked.height = x+j;
    updateTool(clicked);
});
document.getElementById('ch3').addEventListener('click', function(){
    const x = parseInt(clicked.mapComponent.style.left.slice(0,-1));
    let j=(mult*(-1));
    if(isPositive){
        j = mult;
    }
    clicked.mapComponent.style.left = (x+j)+"%";
    clicked.left = x+j;
    updateTool(clicked);
});
document.getElementById('ch4').addEventListener('click', function(){
    const x = parseInt(clicked.mapComponent.style.top.slice(0,-1));
    let j=(mult*(-1));
    if(isPositive){
        j = mult;
    }
    clicked.mapComponent.style.top = (x+j)+"%";
    clicked.top = x+j;
    updateTool(clicked);
});
document.getElementById('ch5').addEventListener('click', function(){
    const x = clicked.rotate;
    let j=(mult*(-1));
    if(isPositive){
        j = mult;
    }
    clicked.mapComponent.style.transform = "rotate("+(x+j)+"deg)";
    clicked.rotate = x+j;
    updateTool(clicked);
});