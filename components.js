let components = {}; 

let clicked;
class Component{
    constructor(n, varName, w,h,l,t,r, i,d,c, redir, z=2){
        allComps.push(this);
    
        this.name = n;
        this.color = c;
        
        this.panelComponent = new PanelComponent(this,n,i,d,c, redir);
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
    constructor(t,n,i,d,c, redir){
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
        
        this.panelDetails = new PanelDetails(this,d,i,c, "images/panelDtl"+n+".img", redir);
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
    constructor(pc,d,i,c, imag,redir){
        this.disabled = false; 
        
        let pd = document.createElement('div');
        pd.classList.add("panelDetails");
        pc.htmlComponent.appendChild(pd);
        this.htmlComponent = pd;
        
        let img = document.createElement('img');
        img.src = imag;
        img.alt = pc.name;
        this.htmlImage = img;
        this.htmlImage.style.display = "none";
        this.htmlComponent.appendChild(img);
        
        let t = document.createElement('p');
        t.innerHTML = d;
        this.htmlComponent.appendChild("    "+t);
        
        let l = document.createElement('a');
        l.href = redir;
        l.textContent = 'See Details [>]';
        console.log(this,redir);
        if(true){//redir===""){//manual override
            l.style.display = "none";
        }
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
    title.panelDetails.htmlComponent.innerHTML = "The plan is focused on creating a harmonious environment that fosters collaboration, innovation, and a deep connection to nature, inviting students and faculty alike to thrive in a vibrant and inspiring academic oasis.");
    title.panelDetails.htmlHyperlink.style.display = "inline-block";
    title.panelDetails.htmlHyperlink.href = "academicZone.html";
    const purple="#B7B1F2",green="#D5E5D5",orange="#FFF1D5",red="#F6D6D6",blue="#D4F6FF";
//1.RESIDENTIAL ZONE (1)
    var dorms = new Component("DORMITORIES", "dorm", "21.5%", "37%", "43%", "8.5%" , "0", "rgb(221 196 245)", "The location at the back of the campus enhances security and keeps the dormitories slightly secluded from the public-facing areas. Additionally, the path to the dorms avoids passing by the faculty and classrooms, reducing unnecessary foot traffic and keeping academic areas undisturbed. The dormitories contain a chapel, a study room, a kitchen, water dispensers and showers with both hot and cold water, air-conditioned rooms, and a billiard table.", "#d899e8", "dormsZone.html");
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
    var classrms = new Component("CLASSROOMS", "classrms", "11%", "34%", "67.65%", "18%" , "0", blue, " The main academic classrooms are centralized into a single building, making scheduling, navigation, and supervision efficient. The wider structure also allows us to enlarge individual classrooms, improving the learning environment and making room for more flexible furniture arrangements. This building includes specialized rooms for the Humanities subjects, including Audio-Visual Rooms (AVR) where students can practice public speaking.", "#9EC6F3", "academicZone.html");
    var labs = new Component("LABORATORIES", "labs", "10%", "27.5%", "83.4%", "24.5%" , "0", blue, "Dedicated laboratory building offers an unparalleled educational environment equipped with cutting-edge technology, fostering collaboration across various science and technology disciplines. With spacious, safety-focused labs and conference rooms for presentations, students engage in hands-on experimentation in fields like Chemistry, Biology, and Physics while receiving guidance from accessible faculty. This innovative facility is designed to inspire creativity and exploration, ensuring our students are well-prepared for future academic and professional pursuits.", "#9FB3DF", "academicZone.html");
    var acadAttach = new Component("ACADEMIC FACILITIES", "acadAttach", "26%", "20%", "67.6%", "5.5%" , "0", blue, "The overall student activity zone has been placed toward the back of the school for added privacy and security. This section is reserved mainly for enrolled students, though has the capacity to host guests. This layout keeps academic and residential life more protected and uninterrupted. All rooms will be air-conditioned in order to ensure the students and staff will be comfortable.", "#C6E7FF", "academicZone.html");
    vs = [
    0,0,
    16.7,0,
    16.7,9.62,
    7.25,9.62,
    7.25,6.2,
    0,6.2
    ];
    acadAttach.mapComponent.style.clipPath = createClipPath(vs);
    var pond = new Component("POND", "pond", "3.7%", "9%", "79.3%", "33%" , "0", green, "While a small pond area was kept in the center as a visual and symbolic centerpiece, creating a sense of tranquility and natural beauty that complements the more structured academic environment.", "orange");

//3.REST ZONE (7)
    var cafeteria = new Component("CAFETERIA", "cafeteria", "20%", "16.5%", "53.63%", "58.5%", "0", green, " The cafeteria is centralized to make it the heart of the campus, reflecting its importance as a space where students gather, eat, and unwind. It is large enough to accommodate various vendors and seating preferences. The vendors were chosen considering the large student population and the overall school community. While the seating arrangements include covered, uncovered, and enclosed areas; this flexibility allows students to choose between enjoying the sun, relaxing in the shade, and air-conditioning.", "#BAD8B6", "restZone.html");
    cafeteria.mapComponent.style.borderRadius = "100000px";
    var rest = new Component("REST AREA", "rest", "7.8%", "12.8%", "55.8%", "27%" , "0", green, " A rest area open to all students. This area can be flexible — possibly used for lounging, socializing, or studying outdoors. Originally inspired by casual student suggestions, it’s a space open to interpretation and future customization.", "#AAB99A", "restZone.html");
    
    var forest = new Component("FOREST", "forest" , "10.5%", "63%", "89%", "2%" , "0", green, "The forest area is a dedicated quiet zone for students and staff who want to escape the busy school atmosphere. It offers a peaceful environment for solitude, reflection, or even outdoor classes and activities.", "#727D73", "restZone.html", 1.5);

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

    var kala = new Component("KALACHUCHI LANE", "kala", "4%", "17%", "61.3%", "40.5%", "0", green, "These three large gazebos are situated in a quieter area with a scenic view, but still close to the academic zone, despite being a more peaceful alternative to the bustling cafeteria. They provide shaded seating while being more surrounded by the open area, and closer to nature.", "#F0F0D7", "restZone.html");
    var grandstand = new Component("GRANDSTAND", "grandstand", "4.4%", "3.8%", "51.8%", "52.3%", "0", green, " It serves as a gathering place for students with a great view of both the field and cafeteria. Whether for sports events, general assemblies, or celebrations, this elevated structure offers seating and visibility for large groups.", "#E1EACD", "restZone.html");
    var garden = new Component("GARDEN", "garden", "5.1%", "4.2%", "73.8%", "52%" , "0", green, "We have added a garden area that provides both beauty and educational value. It can be used for student projects while adding a touch of greenery to the school environment.", "#D0DDD0", "restZone.html");

//4.ADMIN ZONE (4)
    var admin = new Component("ADMIN BUILDING", "admin", "12.7%", "10.4%", "84.7%", "62.8%", "3", orange, "The admin building remains at the front of the campus because it serves as the main point of contact for visitors, deliveries, and administrative matters. This location supports safety, oversight, and efficiency by keeping key staff close to the entrance. It ensures that external matters can be addressed without disrupting internal academic life.", "#FFB38E", "");
    var flag = new Component("FLAGPOLE", "flag", "11.2%", "5.8%", "67.5%", "78.7%", "-1", orange, "As flag ceremonies usually mark the start of the week or special events, having the flagpole in a prominent, accessible location ensures visibility and convenience. It continues to serve as a cultural anchor point for the school community, kept near the entrance for symbolic reasons.", "#FFB26F","");
    flag.mapComponent.style.backgroundImage = "url('https://img.freepik.com/free-vector/illustration-philippinesflag_53876-27126.jpg')";
    flag.mapComponent.style.backgroundRepeat = "no-repeat";
    flag.mapComponent.style.backgroundSize = "100% 100%";
    var dropoff = new Component("DROP-OFF AREA", "dropoff", "20%", "16.5%", "48.75%", "77%", "0", orange, "The dropoff area is designed to protect students from rain and reduce congestion during peak arrival and dismissal times. The layout encourages smoother transitions and offers a safe, spacious waiting zone for cars and students alike. These improvements contribute to the school’s overall traffic management and safety.", "#FFCF9D","");
    vs = [
    0,0,
    5.5,0.2,
    5.47,3.2,
    11.5,3.38,
    11.4,4.5,
    0,4.15
    ];
    dropoff.mapComponent.style.clipPath = createClipPath(vs);
    var wait = new Component("WAITING AREA", "wait", "4.8%", "3.6%", "70.25%", "88.5%", "0", orange, "Located just outside the school gate, the waiting area is designed for parents, guardians, and visitors to sit and wait comfortably. It provides seating, shade, and shelter from rain while keeping foot traffic outside the main school grounds. This thoughtful addition improves the experience for families and creates a more organized pickup routine.", "#DE8F5F","");

//5.SPORTS ZONE (2)
    var gym = new Component("GYMNASIUM", "gym", "50%", "34%", "5%" , "47.86%", "11.6", red, "Housing an olympic-sized pool, indoor basketball court, music room, dance room, clinic, and also a stage which serves as a back-up auditorium, the gymnasium is an all rounder building. The clinic is close to the sports area where injuries are more likely to happen, allowing for quick response time. The volleyball court has been fenced off, while the basketball court is located in an open area.", "#DC8686","sportsZone.html", 1.7);
    vs = [
    4,0,
    26.65,0,
    26.65,5.3,
    6.7,5.3,
    4.4,14.7,
    0.7,13.7
    ];
    gym.mapComponent.style.clipPath = createClipPath(vs);
    var field = new Component("FIELD", "field", "27%", "20.3%", "16.15%" , "60.55%", "12", red, "The field enhances community engagement and promotes school spirit, as it is easily accessible and visible from outside, making it ideal for big or small events and inter-school matches. Its location near the perimeter fence ensures that it remains accessible without disrupting the quieter academic areas of the school. Additionally, the field offers a broad view of the campus, making it a visually prominent feature that adds to the school's overall appeal.", "#D37676","sportsZone.html", 1.7);
    field.mapComponent.style.borderRadius = "2.5vw";

}

function setBackButton(button){
    button.addEventListener('click', returnToMainWindow);
}
function returnToMainWindow(){
    window.location = "index.html";
}
