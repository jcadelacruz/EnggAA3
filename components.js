let components = {}; 

let clicked;
class Component{
    constructor(n, varName, w,h,l,t,r, i,d,c,z=2){
        allComps.push(this);
    
        this.name = n;
        this.color = c;
        
        this.panelComponent = new PanelComponent(this,n,i,d,c);
        this.panelDetails = this.panelComponent.panelDetails;
        
        let mc = document.createElement('div');
        mc.classList.add("mapComponent");
        mc.style.width = w;
        mc.style.height = h;
        mc.style.left = l;
        mc.style.top = t;
        mc.style.transform = "rotate("+r+"deg)";
        this.width = parseInt(w.slice(0,-1));
        this.height = parseInt(h.slice(0,-1));
        this.left = parseInt(l.slice(0,-1));
        this.top = parseInt(t.slice(0,-1));
        this.rotate = parseInt(r);
        this.zoom = z;
        document.getElementById("map").appendChild(mc);
        //mc.innerHTML = n;
        mc.style.backgroundColor = c;
        mc.addEventListener("mouseover", this.handleMouseover.bind(this));
        mc.addEventListener("mouseout", this.handleMouseout.bind(this));
        mc.addEventListener("click", this.handleClick.bind(this));
        this.mapComponent = mc;
        
        this.clicked = false;
        components[varName] = this;
    }
    handleClick(){
        allComps.forEach(this.unclick);
        this.clicked = true
        clicked = this;
        
        this.panelDetails.open();
        this.highlight(85,false);
        if(!this.disabled){
            targetScale = this.zoom;
            console.log(this, targetScale);
            zoom();
        }
        updateTool(this);
    }
    unclick(value, index, array){
        if(value.clicked){
            value.clicked = false;
            
            value.panelDetails.close();
            value.handleMouseout();
        }
    }
    handleMouseover(){
        if(this.clicked){
        }
        else{
            this.highlight(70, true);
        }
    }
    handleMouseout(){
        if(this.clicked){
        }
        else{
            this.unhighlight();
        }
    }
    highlight(intensity, isReversed){
        this.panelComponent.highlight(false);
        if(isReversed){
            this.mapComponent.style.opacity = (100-(intensity))+"%";
        }
        else{
            this.mapComponent.style.opacity = (intensity/1.4)+"%";
        }
    }
    unhighlight(){
        this.highlight(100, true);
        this.panelComponent.highlight(true);
    }
}
class PanelComponent{
    constructor(t,n,i,d,c){
        this.name = n;
        this.color = c;
        this.initialColor = i;
    
        let pc = document.createElement('div');
        pc.classList.add("panelComponent");
        document.getElementById("panel").appendChild(pc);
        let nameHTML = document.createElement('p');
        nameHTML.innerHTML = n;
        nameHTML.style.fontSize = "24px";
        pc.appendChild(nameHTML);
        pc.style.backgroundColor = i;
        pc.addEventListener("mouseover", t.handleMouseover.bind(t));
        pc.addEventListener("mouseout", t.handleMouseout.bind(t));
        pc.addEventListener("click", t.handleClick.bind(t));
        this.htmlComponent = pc;
        
        this.panelDetails = new PanelDetails(this,d,i,c, "images/panelDtl"+n+".img");
    }
    highlight(isReversed){
        if(isReversed){
        this.htmlComponent.style.backgroundColor = this.initialColor;
        }
        else{
        this.htmlComponent.style.backgroundColor = this.color;
        }
    }
}
class PanelDetails{
    constructor(pc,d,i,c, imag){
        this.disabled = false; 
        
        let pd = document.createElement('div');
        pd.classList.add("panelDetails");
        pc.htmlComponent.appendChild(pd);
        this.htmlComponent = pd;
        
        let img = document.createElement('img');
        img.src = imag;
        img.alt = pc.name;
        this.htmlImage = img;
        this.htmlComponent.appendChild(img);
        
        let t = document.createElement('p');
        t.innerHTML = d;
        this.htmlComponent.appendChild(t);
        
        let l = document.createElement('a');
        l.href = pc.name+'.html';
        l.textContent = 'See Details [>]';
        this.htmlHyperlink = l;
        this.htmlComponent.appendChild(l);
    }
    open(){
        if(this.disabled){}else{
            this.htmlComponent.style.display = "block";
        }
    }
    close(){
        this.htmlComponent.style.display = "none";
    }
}

function createClipPath(vs){
    let x = "path('";
    vs.forEach((v, index) => {
        vs[index] = v*(60/65);
    });

    vs.forEach((v, index) => {
        //convert to window width
        vs[index] = v*window.innerWidth/100;
        v = vs[index];
        //add to string x
        if(index==0){ x+="M "+v;
        }else{ x+=" "+v;}
    });
    x+=" Z')";
    return x;
}


function initComponents(window){
    window.components = {};
    components = window.components;
    var title = new Component("Title", "title","0%","0%","50%","50%", "0", "", "", "", 1);
    //title.panelDetails.disabled = true;
    title.panelDetails.htmlComponent.innerHTML = "The plan is focused on creating a harmonious environment that fosters collaboration, innovation, and a deep connection to nature, inviting students and faculty alike to thrive in a vibrant and inspiring academic oasis.";
    const purple="#B7B1F2",green="#D5E5D5",orange="#FFF1D5",red="#F6D6D6",blue="#D4F6FF";
//1.RESIDENTIAL ZONE (1)
    var dorms = new Component("DORM", "dorm", "21.5%", "37%", "43%", "8.5%" , "0", "rgb(221 196 245)", "This is breindel yes", "#574964");
    let vs = [
    0,0,
    13.7,0,
    13.7,8.2,
    7.3,8.2,
    7.3,15.4,
    0,15.4
    ];
    dorms.mapComponent.style.clipPath = createClipPath(vs);

//2.ACADEMIC ZONE (3)
    var classrms = new Component("CLASSRMS", "classrms", "11%", "34%", "67.65%", "18%" , "0", blue, "hrm chem bio", "#9EC6F3");
    var labs = new Component("LABORATORIES", "labs", "10%", "27.5%", "83.4%", "24.5%" , "0", blue, "hrm chem bio", "#9FB3DF");
    var acadAttach = new Component("XACAD", "acadAttach", "26%", "20%", "67.6%", "5.5%" , "0", blue, "hrm chem bio", "#C6E7FF");
    vs = [
    0,0,
    16.7,0,
    16.7,9.62,
    7.25,9.62,
    7.25,6.2,
    0,6.2
    ];
    acadAttach.mapComponent.style.clipPath = createClipPath(vs);
    var pond = new Component("POND", "pond", "3.7%", "9%", "79.3%", "33%" , "0", green, "hrm chem bio", "orange");

//3.REST ZONE (7)
    var cafeteria = new Component("CAFETERIA", "cafeteria", "20%", "16.5%", "53.63%", "58.5%", "0", green, "smol", "#BAD8B6");
    cafeteria.mapComponent.style.borderRadius = "100000px";
    var rest = new Component("REST AREA", "rest", "7.8%", "12.8%", "55.8%", "27%" , "0", green, "hrm chem bio", "#AAB99A");
    
    var forest = new Component("FOREST", "forest" , "10.5%", "63%", "89%", "2%" , "0", green, "This is breindel yes", "#727D73", 1.5);

    vs = [
    0,0.5,
    6.85,0,
    5.45,30.7,
    0.2,30.5,
    0.4,25,
    2.8,25,
    2.9,1.85,
    0, 1.85
    ];
    forest.mapComponent.style.clipPath = createClipPath(vs);

    var kala = new Component("KALA LANE", "kala", "4%", "17%", "61.3%", "40.5%", "0", green, "smol", "#F0F0D7");
    var grandstand = new Component("GRANDSTAND", "grandstand", "4.4%", "3.8%", "51.8%", "52.3%", "0", green, "smol", "#E1EACD");
    var garden = new Component("GARDEN", "garden", "5.1%", "4.2%", "73.8%", "52%" , "0", green, "hrm chem bio", "#D0DDD0");

//4.ADMIN ZONE (4)
    var admin = new Component("ADMIN", "admin", "12.7%", "10.4%", "84.7%", "62.8%", "3", orange, "smol", "#FFB38E");
    var flag = new Component("FLAGPOLE", "flag", "11.2%", "5.8%", "67.5%", "78.7%", "-1", orange, "smol", "#FFB26F");
    flag.mapComponent.style.backgroundImage = "url('https://img.freepik.com/free-vector/illustration-philippinesflag_53876-27126.jpg')";
    flag.mapComponent.style.backgroundRepeat = "no-repeat";
    flag.mapComponent.style.backgroundSize = "100% 100%";
    var dropoff = new Component("DROPOFF", "dropoff", "20%", "16.5%", "48.75%", "77%", "0", orange, "smol", "#FFCF9D");
    vs = [
    0,0,
    5.5,0.2,
    5.47,3.2,
    11.5,3.38,
    11.4,4.5,
    0,4.15
    ];
    dropoff.mapComponent.style.clipPath = createClipPath(vs);
    var wait = new Component("WAIT", "wait", "4.8%", "3.6%", "70.25%", "88.5%", "0", orange, "smol", "#DE8F5F");

//5.SPORTS ZONE (2)
    var gym = new Component("GYM", "gym", "50%", "34%", "5%" , "47.86%", "11.6", red, "hrm chem bio", "#DC8686", 1.7);
    vs = [
    4,0,
    26.65,0,
    26.65,5.3,
    6.7,5.3,
    4.4,14.7,
    0.7,13.7
    ];
    gym.mapComponent.style.clipPath = createClipPath(vs);
    var field = new Component("FIELD", "field", "27%", "20.3%", "16.15%" , "60.55%", "12", red, "hrm chem bio", "#D37676", 1.7);
    field.mapComponent.style.borderRadius = "2.5vw";

}
