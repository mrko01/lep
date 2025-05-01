document.addEventListener("DOMContentLoaded",()=>{
 AOS.init({duration:800,easing:"ease-in-out",once:true})
 initParticles()
 setupScrollAnimations()
 initAIAssistant()
 setupNavHighlight()
 initDashboardCharts()
 setupInteractiveElements()
 setupPresentationMode()
 document.querySelector(".back-to-top").addEventListener("click",e=>{
  e.preventDefault()
  window.scrollTo({top:0,behavior:"smooth"})
 })
 checkScreenSize()
 window.addEventListener("resize",checkScreenSize)
})
function initParticles(){
 particlesJS("particles-js",{particles:{number:{value:80,density:{enable:true,value_area:800}},color:{value:["#4A6FA5","#166D39","#7371FC","#444E96","#00A676"]},shape:{type:"circle",stroke:{width:0,color:"#000"}},opacity:{value:.5},size:{value:3,random:true},line_linked:{enable:true,distance:150,color:"#c8c8c8",opacity:.4,width:1},move:{enable:true,speed:2,out_mode:"out"}},interactivity:{detect_on:"canvas",events:{onhover:{enable:true,mode:"grab"},onclick:{enable:true,mode:"push"},resize:true},modes:{grab:{distance:140,line_linked:{opacity:1}},push:{particles_nb:4}}},retina_detect:true})
}
function toggleTheme(){
 document.body.classList.toggle("dark-mode")
 const icon=document.querySelector("#toggle-theme i")
 icon.className=document.body.classList.contains("dark-mode")?"fas fa-sun":"fas fa-moon"
}
function checkScreenSize(){
 const chat=document.getElementById("ai-chat-container")
 if(window.innerWidth<=1024){
  chat.classList.add("minimized")
 }else chat.classList.remove("minimized")
}
function setupScrollAnimations(){
 gsap.registerPlugin(ScrollTrigger)
 gsap.from("header h1",{scrollTrigger:{trigger:"header",start:"top 80%"},y:50,opacity:0,duration:1,ease:"power2.out"})
 gsap.from("header .tagline",{scrollTrigger:{trigger:"header",start:"top 80%"},y:30,opacity:0,duration:1,delay:.3,ease:"power2.out"})
 document.querySelectorAll(".pillar").forEach(pillar=>{
  gsap.from(pillar.querySelector(".pillar-icon"),{scrollTrigger:{trigger:pillar,start:"top 80%"},y:30,opacity:0,duration:1,ease:"power2.out"})
  gsap.from(pillar.querySelector("h2"),{scrollTrigger:{trigger:pillar,start:"top 75%"},y:20,opacity:0,duration:.8,delay:.3,ease:"power2.out"})
  gsap.from(pillar.querySelector(".pillar-subtitle"),{scrollTrigger:{trigger:pillar,start:"top 75%"},y:20,opacity:0,duration:.8,delay:.5,ease:"power2.out"})
  gsap.from(pillar.querySelector(".pillar-info"),{scrollTrigger:{trigger:pillar,start:"top 70%"},y:30,opacity:0,duration:1,delay:.7,ease:"power2.out"})
  const el=pillar.querySelector(".interactive-element")
  if(el)gsap.from(el,{scrollTrigger:{trigger:el,start:"top 80%"},y:30,opacity:0,duration:1,delay:.9,ease:"power2.out"})
 })
 const conclusion=document.getElementById("conclusion")
 if(conclusion)gsap.from("#conclusion h2",{scrollTrigger:{trigger:conclusion,start:"top 80%"},y:30,opacity:0,duration:1,ease:"power2.out"})
 const diagram=document.querySelector(".connection-diagram")
 if(diagram)gsap.from(diagram,{scrollTrigger:{trigger:diagram,start:"top 80%"},scale:.9,opacity:0,duration:1,delay:.3,ease:"power2.out"})
}
function setupNavHighlight(){
 const sections=document.querySelectorAll(".pillar"),navItems=document.querySelectorAll(".nav-item")
 window.addEventListener("scroll",()=>{
  let current=""
  sections.forEach(sec=>{
   const top=sec.offsetTop,height=sec.clientHeight
   if(pageYOffset>=top-height/3)current=sec.id
  })
  navItems.forEach(nav=>{
   nav.classList.toggle("active",nav.getAttribute("href").substring(1)===current)
  })
 })
}
function initDashboardCharts(){
 const colors={think:"#7371FC",sleep:"#444E96",move:"#00A676",eat:"#FF8552",addiction:"#7D4E57"}
 const cfg={type:"doughnut",options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{enabled:true}},cutout:"70%",animation:{animateScale:true,animateRotate:true}}}
 const charts=[
  {el:"thinkChart",val:75,bg:"#E9E9FF"},
  {el:"sleepChart",val:65,bg:"#D8DCF0"},
  {el:"moveChart",val:60,bg:"#C5F2E0"},
  {el:"eatChart",val:70,bg:"#FFDCC9"},
  {el:"habitChart",val:55,bg:"#E8D3D7"}
 ]
 charts.forEach(({el,val,bg},i)=>{
  new Chart(document.getElementById(el),{...cfg,data:{datasets:[{data:[val,100-val],backgroundColor:[Object.values(colors)[i],bg],borderWidth:0}],labels:["Progress","Remaining"]}})
 })
 document.querySelectorAll(".dashboard-card").forEach(card=>{
  card.addEventListener("click",()=>document.querySelector(`#${card.dataset.pillar}-well`).scrollIntoView({behavior:"smooth"}))
 })
}
function setupInteractiveElements(){
 const btn=document.querySelector(".start-breathing"),circle=document.querySelector(".breathing-circle"),text=document.querySelector(".breathing-instruction")
 let interval,isBreathing=false
 if(btn)btn.addEventListener("click",()=>{
  isBreathing=!isBreathing
  btn.textContent=isBreathing?"Stop":"Start"
  if(isBreathing){
   let phase="inhale"
   circle.classList.add("inhale")
   text.textContent="Breathe in..."
   interval=setInterval(()=>{
    if(phase==="inhale"){phase="hold";text.textContent="Hold...";setTimeout(()=>{if(isBreathing){phase="exhale";circle.className="breathing-circle exhale";text.textContent="Breathe out..."}},2e3)}
    else{phase="inhale";circle.className="breathing-circle inhale";text.textContent="Breathe in..."}
   },4e3)
  }else{clearInterval(interval);circle.className="breathing-circle";text.textContent="Breathe in..."}
 })
 const stages=document.querySelectorAll(".cycle-stage"),info=document.querySelector(".cycle-info p"),sleepInfo={1:"Light Sleep: easy to wake, theta waves dominate.",2:"Deep Sleep: body repair and immune boost.",3:"REM Sleep: dreaming, memory consolidation."}
 stages.forEach(s=>s.addEventListener("click",()=>{stages.forEach(x=>x.classList.remove("active"));s.classList.add("active");info.textContent=sleepInfo[s.dataset.stage];info.style.opacity=0;setTimeout(()=>info.style.opacity=1,200)}))
 const exBtns=document.querySelectorAll(".exercise-btn"),gif=document.querySelector(".exercise-gif"),gifs={stretch:"https://cdn.dribbble.com/users/2593068/screenshots/7771215/media/67d1d801bf4dc7487b04d36b6ec78c1d.gif",twist:"https://cdn.dribbble.com/users/1902827/screenshots/6560535/dribbble_chair_twist.gif",arms:"https://cdn.dribbble.com/users/3097534/screenshots/11937583/media/5fce8d2a378bc4ad4dbc8ae4e003dfb7.gif"}
 exBtns.forEach(b=>b.addEventListener("click",()=>{exBtns.forEach(x=>x.classList.remove("active"));b.classList.add("active");gif.style.opacity=0;setTimeout(()=>{gif.src=gifs[b.dataset.exercise];gif.style.opacity=1},300)}))
 const items=document.querySelectorAll(".food-item"),sections=document.querySelectorAll(".plate-section")
 items.forEach(i=>i.addEventListener("click",()=>{const type=i.dataset.type,target=document.querySelector(`.plate-section.${type}`);if(target.dataset.filled==="false"){target.dataset.filled="true";target.textContent=i.textContent;i.style.transform="scale(1.1)";setTimeout(()=>i.style.transform="scale(1)",200)}}))
 sections.forEach(s=>s.addEventListener("click",()=>{if(s.dataset.filled==="true"){s.dataset.filled="false";const t=s.classList[1];if(t==="veggies")s.textContent="Vegetables (50%)";if(t==="protein")s.textContent="Protein (25%)";if(t==="carbs")s.textContent="Whole Grains (25%)"}}))
 document.querySelectorAll(".interactive-tip").forEach(t=>t.addEventListener("click",()=>{const input=document.getElementById("user-message");if(input){input.value=`Tell me more about: ${t.textContent}`;document.getElementById("send-message").click();if(window.innerWidth<=1024)document.getElementById("ai-chat-container").classList.remove("minimized")}}))
 const showBtn=document.getElementById("show-connections"),diag=document.getElementById("connection-diagram")
 if(showBtn&&diag)showBtn.addEventListener("click",()=>{diag.innerHTML="";const center=document.createElement("div");center.className="center-node";center.innerHTML="Complete<br>Wellbeing";Object.assign(center.style,{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"100px",height:"100px",borderRadius:"50%",background:"#4A6FA5",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",fontWeight:"bold",boxShadow:"0 0 15px rgba(0,0,0,.1)",zIndex:2});diag.appendChild(center)
 const pillars=[{name:"Think Well",color:"#7371FC",icon:"brain"},{name:"Sleep Well",color:"#444E96",icon:"moon"},{name:"Move Well",color:"#00A676",icon:"running"},{name:"Eat Well",color:"#FF8552",icon:"apple-alt"},{name:"Manage Habits",color:"#7D4E57",icon:"balance-scale"}]
 const radius=120,step=2*Math.PI/pillars.length
 pillars.forEach((p,i)=>{const a=step*i-Math.PI/2,x=radius*Math.cos(a),y=radius*Math.sin(a);const node=document.createElement("div");node.className="pillar-node";node.innerHTML=`<i class="fas fa-${p.icon}"></i><span>${p.name}</span>`;Object.assign(node.style,{position:"absolute",top:`calc(50% + ${y}px)`,left:`calc(50% + ${x}px)`,transform:"translate(-50%,-50%)",width:"80px",height:"80px",borderRadius:"50%",background:p.color,color:"#fff",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",fontWeight:"bold",fontSize:".8rem",boxShadow:"0 0 15px rgba(0,0,0,.1)",zIndex:2});node.querySelector("i").style.cssText="font-size:1.5rem;margin-bottom:5px";diag.appendChild(node);const line=document.createElement("div");line.className="connection-line";Object.assign(line.style,{position:"absolute",top:"50%",left:"50%",width:`${radius}px`,height:"2px",background:p.color,transform:`rotate(${a*180/Math.PI}deg)`,transformOrigin:"0 0",zIndex:1});diag.appendChild(line)})
 gsap.from(".pillar-node",{scale:0,opacity:0,duration:.8,stagger:.1,ease:"back.out(1.5)"});gsap.from(".connection-line",{scaleX:0,opacity:0,duration:1,stagger:.1,ease:"power2.out"});showBtn.textContent="Reset Diagram";showBtn.addEventListener("click",()=>location.reload(),{once:true})})
}
function setupPresentationMode(){
 const btn=document.getElementById("presentation-mode"),overlay=document.getElementById("presentation-overlay"),prev=document.getElementById("prev-slide"),next=document.getElementById("next-slide"),exit=document.getElementById("exit-presentation"),indicator=document.getElementById("slide-indicator"),slides=["dashboard","think-well","sleep-well","move-well","eat-well","manage-addiction"];let idx=0
 const show=i=>{idx=i;indicator.textContent=`Slide ${i+1}/${slides.length}`;document.getElementById(slides[i]).scrollIntoView({behavior:"smooth"});prev.disabled=i===0;next.disabled=i===slides.length-1;prev.style.opacity=i===0?".5":"1";next.style.opacity=i===slides.length-1?".5":"1"}
 if(btn)btn.addEventListener("click",()=>{overlay.classList.remove("hidden");document.body.style.overflow="hidden";show(0)})
 exit.addEventListener("click",()=>{overlay.classList.add("hidden");document.body.style.overflow=""})
 prev.addEventListener("click",()=>{if(idx>0)show(idx-1)})
 next.addEventListener("click",()=>{if(idx<slides.length-1)show(idx+1)})
 document.addEventListener("keydown",e=>{if(overlay.classList.contains("hidden"))return;if(e.key==="ArrowRight"||e.key===" ")next.click();else if(e.key==="ArrowLeft")prev.click();else if(e.key==="Escape")exit.click()})
}
function initAIAssistant(){
 const chat=document.getElementById("ai-chat-container"),header=document.querySelector(".chat-header"),close=document.getElementById("close-ai"),send=document.getElementById("send-message"),input=document.getElementById("user-message"),messages=document.getElementById("chat-messages"),topics=document.querySelectorAll(".topic-btn"),API_KEY="AIzaSyDG55m1mIek1S7HH3oJILfuWDNWT1DEx3U",URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent"
 let minimized=window.innerWidth<=1024
 const toggle=()=>{minimized=!minimized;chat.classList.toggle("minimized",minimized);close.innerHTML=minimized?'<i class="fas fa-expand"></i>':'<i class="fas fa-minus"></i>'}
 if(window.innerWidth<=1024){close.addEventListener("click",e=>{e.stopPropagation();toggle()});header.addEventListener("click",e=>{if(e.target!==close&&!close.contains(e.target))toggle()})}
 const topicQ={think:"How can I improve my mental health?",sleep:"What are the best tips for better sleep?",move:"How much exercise do I need each day?",eat:"What foods should I eat for more energy?",addiction:"How can I reduce my screen time?"}
 topics.forEach(b=>b.addEventListener("click",()=>{input.value=topicQ[b.dataset.topic];sendMessage();if(window.innerWidth<=1024&&minimized)toggle();b.classList.add("active");setTimeout(()=>b.classList.remove("active"),500)}))
 send.addEventListener("click",sendMessage);input.addEventListener("keypress",e=>{if(e.key==="Enter")sendMessage()})
 function sendMessage(){
  const msg=input.value.trim();if(!msg)return;if(window.innerWidth<=1024&&minimized)toggle();addMessage(msg,"user");input.value=""
  const typing=document.createElement("div");typing.className="typing-indicator";typing.innerHTML="<span></span><span></span><span></span>";messages.appendChild(typing);messages.scrollTop=messages.scrollHeight
  getAIResponse(msg).then(r=>{typing.remove();addMessage(r||"Connection issue. Try again later.","assistant")}).catch(()=>{typing.remove();addMessage("Connection issue. Try again later.","assistant")})
 }
 function addMessage(text,sender){const msg=document.createElement("div");msg.className=`message ${sender}`;msg.style.opacity=0;msg.style.transform="translateY(10px)";const c=document.createElement("div");c.className="message-content";c.textContent=text;msg.appendChild(c);messages.appendChild(msg);setTimeout(()=>{msg.style.opacity=1;msg.style.transform="translateY(0)"},10);setTimeout(()=>{messages.scrollTo({top:messages.scrollHeight,behavior:"smooth"})},100)}
 async function getAIResponse(q){
  try{
   const ctx=`You are Health Buddy, a friendly AI assistant focusing on the 5 pillars of wellbeing. Keep answers short (2-3 sentences) for grade-10 students.`
   const body={contents:[{parts:[{text:ctx},{text:q}]}],generationConfig:{temperature:.7,topK:40,topP:.95,maxOutputTokens:400}}
   const res=await fetch(`${URL}?key=${API_KEY}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)})
   if(!res.ok)throw new Error();const d=await res.json()
   return d?.candidates?.[0]?.content?.parts?.[0]?.text||"Balance all five pillars for better wellbeing."
  }catch{return null}
 }
 setTimeout(()=>addMessage("Hi! I'm your Health Buddy. Ask anything about the 5 pillars or tap a topic below.","assistant"),800)
}
