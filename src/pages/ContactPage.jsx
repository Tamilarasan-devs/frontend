import { useState, useEffect } from "react";
import bnr from '../assets/images/cont.jpg'
// const FONT = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');`;

const CSS = `
  

  .ct * { box-sizing: border-box; margin: 0; padding: 0; }
  .ct {  background: #ffff; min-height: 100vh; color: #1a1008; }

  @keyframes ct-up    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ct-fade  { from{opacity:0} to{opacity:1} }
  @keyframes ct-spin  { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
  @keyframes ct-spin2 { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(-360deg)} }
  @keyframes ct-pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
  @keyframes ct-shim  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes ct-succ  { 0%{opacity:0;transform:scale(.9)} 60%{transform:scale(1.03)} 100%{opacity:1;transform:scale(1)} }

  .ct-a0{animation:ct-up .65s .05s ease both}
  .ct-a1{animation:ct-up .65s .15s ease both}
  .ct-a2{animation:ct-up .65s .25s ease both}
  .ct-a3{animation:ct-up .65s .35s ease both}
  .ct-a4{animation:ct-up .65s .45s ease both}

  /* Nav */
  .ct-nav {
    position:fixed; top:0; left:0; right:0; z-index:100;
    height:64px; display:flex; align-items:center; justify-content:space-between;
    padding:0 clamp(20px,5vw,64px);
    background:rgba(245,240,235,0.88); backdrop-filter:blur(18px);
    border-bottom:1px solid rgba(130,12,12,0.08);
  }
  .ct-logo {
   
    letter-spacing:.08em; text-transform:uppercase; color:#1a1008;
    display:flex; align-items:center; gap:9px;
  }
  .ct-logo-gem {
    width:28px; height:28px; border-radius:8px;
    background:linear-gradient(135deg,#03349a,#c9643a);
    display:flex; align-items:center; justify-content:center;
  }
  .ct-logo-gem svg { width:14px; height:14px; fill:white; }
  .ct-nav-pill {
    font-family:'Syne',sans-serif; font-size:10px; font-weight:700;
    letter-spacing:.16em; text-transform:uppercase;
    color:#03349a; padding:7px 16px;
    border:1.5px solid rgba(130,12,12,0.18);
    border-radius:100px; background:rgba(130,12,12,0.04);
  }

  /* Hero */
  .ct-hero {
    position:relative; z-index:10; overflow:hidden;
    min-height:100vh; display:grid; grid-template-columns:1fr 1fr;
    padding-top:64px;
  }
  @media(max-width:860px){ .ct-hero{grid-template-columns:1fr} .ct-hero-right{display:none} }

  .ct-hero-left {
    padding:clamp(60px,8vw,110px) clamp(24px,5vw,72px) 80px;
    display:flex; flex-direction:column; justify-content:center;
    border-right:1px solid rgba(130,12,12,0.08);
    position:relative; background:#f5f0eb;
  }
  .ct-hero-left::before {
    content:''; position:absolute; inset:0; pointer-events:none;
    background-image:radial-gradient(circle, rgba(130,12,12,0.09) 1px, transparent 1px);
    background-size:28px 28px;
    mask-image:radial-gradient(ellipse 70% 80% at 20% 60%, black 0%, transparent 100%);
  }

  .ct-hero-right {
    background:#ede7df; position:relative; overflow:hidden;
    display:flex; align-items:center; justify-content:center;
  }
  .ct-hero-right::before {
    content:''; position:absolute; inset:0;
    background-image:
      repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(130,12,12,0.05) 39px,rgba(130,12,12,0.05) 40px),
      repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(130,12,12,0.05) 39px,rgba(130,12,12,0.05) 40px);
  }

  .ct-ring {
    position:absolute; top:50%; left:50%; border-radius:50%;
  }
  .ct-ring-1 {
    width:380px; height:380px;
    border:1px solid rgba(130,12,12,0.12);
    animation:ct-spin 35s linear infinite;
  }
  .ct-ring-2 {
    width:260px; height:260px;
    border:1px dashed rgba(201,100,58,0.22);
    animation:ct-spin2 22s linear infinite;
  }
  .ct-ring-3 {
    width:140px; height:140px;
    background:radial-gradient(circle,rgba(201,100,58,0.1),transparent 70%);
    border:1px solid rgba(201,100,58,0.2);
    animation:ct-spin 15s linear infinite;
  }
  .ct-ring-dot {
    position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    width:14px; height:14px; border-radius:50%;
    background:linear-gradient(135deg,#03349a,#c9643a);
    box-shadow:0 0 24px rgba(201,100,58,0.4);
    animation:ct-pulse 2.5s ease-in-out infinite;
  }
  .ct-chip {
    position:absolute;
     font-size:10px; font-weight:700;
    letter-spacing:.13em; text-transform:uppercase;
    color:rgba(130,12,12,0.55); padding:7px 14px;
    border:1px solid rgba(130,12,12,0.13); border-radius:100px;
    background:rgba(245,240,235,0.82); backdrop-filter:blur(8px);
  }

  /* Eyebrow */
  .ct-eye {
    display:inline-flex; align-items:center; gap:10px; margin-bottom:26px;
     font-size:10px; font-weight:700;
    letter-spacing:.22em; text-transform:uppercase; color:#03349a;
  }
  .ct-eye-dot { width:6px; height:6px; border-radius:50%; background:#03349a; }

  /* Headline */
  .ct-h1 {
     font-weight:800;
    font-size:clamp(50px,6.5vw,92px); line-height:.9;
    letter-spacing:-.03em; color:#1a1008; margin-bottom:28px;
  }
  .ct-h1 em {
    font-style:italic; font-weight:400;
    background:linear-gradient(120deg,#03349a 0%,#c9643a 50%,#e8845a 100%);
    background-size:200%;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:ct-shim 4s ease-in-out infinite;
  }
  .ct-sub {
    font-size:20px; line-height:1.75; font-weight:400;
    color:black; max-width:360px; margin-bottom:44px;
  }

  /* Stats */
  .ct-stats { display:flex; gap:28px; flex-wrap:wrap; margin-bottom:50px; align-items:center; }
  .ct-stat-n {
     font-size:30px; font-weight:800;
    color:#1a1008; display:block; line-height:1;
  }
  .ct-stat-l {
    font-size:15px; font-weight:600; letter-spacing:.12em; text-transform:uppercase;
    color:black; display:block; margin-top:4px;
  }
  .ct-stat-sep { width:1px; height:36px; background:rgba(130,12,12,0.1); }

  /* Scroll cue */
  .ct-scroll {
    display:flex; align-items:center; gap:10px;
    font-size:9px; font-weight:700; letter-spacing:.18em;
    text-transform:uppercase; color:rgba(26,16,8,.25);
  }
  .ct-scroll-line { width:36px; height:1px; background:rgba(130,12,12,0.15); }

  /* Wrapper */
  .ct-wrap {
    position:relative; z-index:10;
    max-width:1200px; margin:0 auto;
    padding:0 clamp(20px,5vw,60px) 100px;
  }

  /* Section header */
  .ct-sh {
    display:flex; align-items:flex-end; justify-content:space-between;
    padding-bottom:28px; border-bottom:1px solid rgba(130,12,12,0.1);
    margin-bottom:36px; flex-wrap:wrap; gap:12px;
  }
  .ct-sh-num {
     font-size:12px; font-weight:700;
    letter-spacing:.2em; text-transform:uppercase; color:#8b0000; margin-bottom:6px;
  }
  .ct-sh-title {
     font-size:clamp(30px,3.5vw,42px);
    font-weight:800; color:#1a1008; line-height:1;
  }
  .ct-sh-note { font-size:12px; color:black; font-weight:300; max-width:220px; text-align:right; line-height:1.55; }

  /* Cards */
  .ct-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  @media(max-width:720px){ .ct-cards{grid-template-columns:1fr} }
  @media(min-width:480px) and (max-width:720px){ .ct-cards{grid-template-columns:1fr 1fr} }

  .ct-card {
    background:#fff; border:1px solid rgba(130,12,12,0.08);
    border-radius:22px; padding:28px 24px;
    position:relative; overflow:hidden;
    transition:transform .3s,box-shadow .3s,border-color .3s;
  }
  .ct-card::after {
    content:''; position:absolute; bottom:0; left:0; right:0;
    height:3px; border-radius:0 0 22px 22px;
    background:linear-gradient(90deg,#03349a,#c9643a);
    transform:scaleX(0); transform-origin:left; transition:transform .35s ease;
  }
  .ct-card:hover { transform:translateY(-6px); box-shadow:0 20px 50px rgba(130,12,12,0.1); border-color:rgba(130,12,12,0.15); }
  .ct-card:hover::after { transform:scaleX(1); }
  .ct-card-ico {
    width:44px; height:44px; border-radius:13px;
    display:flex; align-items:center; justify-content:center; margin-bottom:18px;
    background:rgba(130,12,12,0.06); color:#03349a; border:1px solid rgba(130,12,12,0.1);
  }
  .ct-card-lbl { font-size:20px; font-weight:700; letter-spacing:.2em; text-transform:uppercase; color: #03349a; margin-bottom:7px; }
  .ct-card-val { font-size:15px; font-weight:700; color:#1a1008; line-height:1.35; word-break:break-word; }
  .ct-card-sub { font-size:15px; color:black; margin-top:5px; font-weight:600; }

  /* Form grid */
  .ct-fg { display:grid; grid-template-columns:1fr 2fr; gap:20px; }
  @media(max-width:780px){ .ct-fg{grid-template-columns:1fr} }

  /* Side panel */
  .ct-panel {
    background:#fff; border:1px solid rgba(130,12,12,0.08);
    border-radius:24px; padding:36px 28px;
    display:flex; flex-direction:column; gap:22px; position:relative; overflow:hidden;
  }
  .ct-panel::before {
    content:''; position:absolute; top:0; left:0; bottom:0; width:4px;
    border-radius:24px 0 0 24px;
    background:linear-gradient(180deg,#03349a,#c9643a,#829b1c);
  }
  .ct-panel-tag {
    display:inline-flex; align-items:center; gap:7px;
    font-size:9px; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
    color:#03349a; padding:6px 13px; border:1.5px solid rgba(130,12,12,0.15);
    border-radius:100px; width:fit-content; background:rgba(130,12,12,0.04);
  }
  .ct-panel-title {font-size:19px; font-weight:800; color:#1a1008; line-height:1.2; }
  .ct-panel-body { font-size:15px; font-weight:600; line-height:1.75; color:black; }
  .ct-panel-div { height:1px; background:rgba(130,12,12,0.07); }
  .ct-panel-item { display:flex; align-items:center; gap:10px; font-size:16px; color:black; }
  .ct-panel-bullet {
    width:22px; height:22px; border-radius:6px; flex-shrink:0;
    background:rgba(130,12,12,0.07); color:#03349a;
    display:flex; align-items:center; justify-content:center;
  }
  .ct-panel-foot {
    font-size:18px; color:black; font-weight:400; line-height:1.7;
    padding:14px 16px; background:rgba(130,12,12,0.03);
    border:1px solid rgba(130,12,12,0.07); border-radius:13px;
  }

  /* Form box */
  .ct-fbox {
    background:#fff; border:1px solid rgba(130,12,12,0.08);
    border-radius:24px; padding:36px 32px; position:relative; overflow:hidden;
  }
  .ct-fbox::before {
    content:''; position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg,#03349a,#c9643a,#829b1c);
  }

  /* Label / Input */
  .ct-lbl { display:block; font-size:15px; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:#03349a; margin-bottom:9px; }
  .ct-inp {
    width:100%; background:#fdf9f6;
    border:1.5px solid rgba(130,12,12,0.1); border-radius:13px;
    padding:13px 16px; font-family:'DM Sans',sans-serif;
    font-size:14px; font-weight:400; color:#1a1008; outline:none; -webkit-appearance:none;
    transition:border-color .22s,box-shadow .22s,background .22s;
  }
  .ct-inp::placeholder { color:rgba(26,16,8,.22); }
  .ct-inp:focus { border-color:#03349a; background:#fff; box-shadow:0 0 0 4px rgba(130,12,12,0.07); }
  .ct-row2 { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  @media(max-width:480px){ .ct-row2{grid-template-columns:1fr} }
  .ct-fspace { display:flex; flex-direction:column; gap:16px; }

  /* Button */
  .ct-btn {
    width:100%; padding:16px; border:none; border-radius:14px; cursor:pointer;
    font-family:'Syne',sans-serif; font-size:11px; font-weight:700;
    letter-spacing:.2em; text-transform:uppercase; color:#fff;
    background:linear-gradient(135deg,#03349a 0%,#a01310 40%,#c9643a 100%);
    box-shadow:0 8px 28px rgba(130,12,12,0.28);
    position:relative; overflow:hidden; transition:transform .22s,box-shadow .22s;
  }
  .ct-btn::before {
    content:''; position:absolute; top:0; left:-100%; width:100%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent);
    transition:left .5s;
  }
  .ct-btn:hover::before { left:100%; }
  .ct-btn:hover { transform:translateY(-2px); box-shadow:0 14px 38px rgba(130,12,12,0.35); }
  .ct-btn:active { transform:translateY(0); }
  .ct-btn span { position:relative; z-index:1; display:flex; align-items:center; justify-content:center; gap:8px; }

  /* Success */
  .ct-ok {
    animation:ct-succ .4s ease both; display:flex; align-items:center; gap:11px;
    padding:14px 18px; border-radius:13px; margin-bottom:18px;
    background:rgba(130,155,28,0.07); border:1.5px solid rgba(130,155,28,0.22);
    font-size:13px; color:#4a5c0a;
  }
  .ct-ok-ic {
    width:26px; height:26px; border-radius:50%; flex-shrink:0;
    background:rgba(130,155,28,0.14); color:#5a7010;
    display:flex; align-items:center; justify-content:center;
  }

  /* Map */
  .ct-map { border-radius:24px; overflow:hidden; border:1px solid rgba(130,12,12,0.08); }
  .ct-map-top {
    background:#fff; display:flex; align-items:center; justify-content:space-between;
    padding:20px 28px; flex-wrap:wrap; gap:10px;
    border-bottom:1px solid rgba(130,12,12,0.07);
  }
  .ct-map-title { font-family:'Syne',sans-serif; font-size:15px; font-weight:800; color:#1a1008; }
  .ct-map-addr { font-size:12px; color:black; font-weight:300; margin-top:2px; }
  .ct-live { display:flex; align-items:center; gap:6px; font-size:9.5px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:#5a7010; }
  .ct-live-dot { width:7px; height:7px; border-radius:50%; background:#829b1c; animation:ct-pulse 2s ease-in-out infinite; }
`;

const Pin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const Mail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const Phone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);
const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = e => {
  e.preventDefault();

  const phoneNumber = "919443157282"; // India code +91

  const message = `Hello, I would like to contact you.

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Message: ${form.message}`;

  const encodedMessage = encodeURIComponent(message);

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open WhatsApp
  window.open(whatsappURL, "_blank");

  // Optional UI actions
  setSubmitted(true);
  setForm({ name:"", email:"", phone:"", message:"" });

  setTimeout(() => setSubmitted(false), 5000);
};

  const contacts = [
    { Icon: Pin,   label:"Address", value:"No:1/770, K.Ayyampalayam (PO)", sub:"Palladam, Tiruppur, TN 641662" },
    { Icon: Mail,  label:"Email",   value:"info.sblsmarketing@gmail.com",   sub:"Reply within 24 hours" },
    { Icon: Phone, label:"Phone",   value:"+91 94431 57282",                sub:"Mon – Sat, 9 AM – 6 PM" },
  ];

  return (
    <div className="ct">
      <style>{CSS}</style>


      {/* Hero */}
       <section className="relative w-full overflow-hidden">
                        {/* Background image */}
                        <div className="relative">
                          <img
                            src={bnr}
                            alt="About Banner"
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                      
                    
      
                        </div>
                      </section>
      <section className="ct-hero">
        <div className="ct-hero-left">
          
          <h1 className="ct-h1 ct-a1">
            Let's Start<br />a <em>Great</em><br />Conversation
          </h1>
          <p className="ct-sub ct-a2  ">
            Have questions, partnerships, or inquiries? Our dedicated team is here and happy to help you every step of the way.
          </p>
          <div className="ct-stats ct-a3">
            <div><span className="ct-stat-n">24h</span><span className="ct-stat-l">Response</span></div>
            <div className="ct-stat-sep" />
            <div><span className="ct-stat-n">6×</span><span className="ct-stat-l">Days / Week</span></div>
            <div className="ct-stat-sep" />
            <div><span className="ct-stat-n">100%</span><span className="ct-stat-l">Dedicated</span></div>
          </div>
        </div>

        <div className="ct-hero-right">
          <div className="ct-ring ct-ring-1" />
          <div className="ct-ring ct-ring-2" />
          <div className="ct-ring ct-ring-3" />
          <div className="ct-ring-dot" />
          {[
            {style:{top:"18%",left:"12%"},text:"Palladam, TN",delay:".1s"},
            {style:{top:"28%",right:"8%"},text:"Est. 2010",delay:".3s"},
            {style:{bottom:"28%",left:"10%"},text:"Life Science",delay:".5s"},
            {style:{bottom:"18%",right:"12%"},text:"Tamil Nadu",delay:".7s"},
          ].map(({style,text,delay},i)=>(
            <div key={i} className="ct-chip" style={{...style,animation:`ct-fade .8s ${delay} ease both`}}>{text}</div>
          ))}
          {[{top:24,left:24},{top:24,right:24},{bottom:24,left:24},{bottom:24,right:24}].map((pos,i)=>(
            <div key={i} style={{
              position:"absolute",...pos,width:20,height:20,
              borderTop:pos.bottom?undefined:"1.5px solid rgba(130,12,12,0.2)",
              borderBottom:pos.top?undefined:"1.5px solid rgba(130,12,12,0.2)",
              borderLeft:pos.right?undefined:"1.5px solid rgba(130,12,12,0.2)",
              borderRight:pos.left?undefined:"1.5px solid rgba(130,12,12,0.2)",
            }}/>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="ct-wrap" style={{paddingTop:72}}>
        <div className="ct-sh ct-a0">
          <div>
            <div className="ct-sh-num">01 — Contact Info</div>
          <div className="ct-sh-title">Reach Us</div>
          </div>
          {/* <div className="ct-sh-note">Multiple ways to connect with our team directly</div> */}
        </div>
        <div className="ct-cards">
          {contacts.map(({Icon,label,value,sub},i)=>(
            <div key={i} className={`ct-card ct-a${i+1}`}>
              <div className="ct-card-ico"><Icon /></div>
              <div className="ct-card-lbl">{label}</div>
              <div className="ct-card-val">{value}</div>
              <div className="ct-card-sub">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="ct-wrap" style={{paddingTop:0}}>
        <div className="ct-sh ct-a0">
          <div>
            <div className="ct-sh-num">02 — Message</div>
            <div className="ct-sh-title">Send a Message</div></div>
          {/* <div className="ct-sh-note">We reply personally — no bots, no templates</div> */}
        </div>
        <div className="ct-fg">
          <div className="ct-panel ct-a1">
            <div className="ct-panel-tag">
              <span style={{width:5,height:5,borderRadius:"50%",background:"#03349a",display:"inline-block"}} />
              Why Contact Us
            </div>
            <div className="ct-panel-title">Every message gets a personal reply.</div>
            <div className="ct-panel-body">We value every conversation — our team reads and responds to everything personally.</div>
            <div className="ct-panel-div" />
            {["Product & Service Inquiries","Business Partnerships","Distribution Queries","General Questions"].map((t,i)=>(
              <div key={i} className="ct-panel-item">
                <div className="ct-panel-bullet">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:11,height:11}}><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                {t}
              </div>
            ))}
            <div className="ct-panel-div" />
            <div className="ct-panel-foot">
              📍 Palladam, Tamil Nadu<br/>
              🕘 Mon – Sat · 9 AM – 6 PM IST<br/>
              ✉️ Response within 24 hours
            </div>
          </div>

          <div className="ct-fbox ct-a2">
            {submitted && (
              <div className="ct-ok">
                <div className="ct-ok-ic"><Check /></div>
                Message sent! We'll be in touch within 24 hours.
              </div>
            )}
            <form onSubmit={onSubmit} className="ct-fspace">
              <div className="ct-row2">
                <div>
                  <label className="ct-lbl">Full Name *</label>
                  <input className="ct-inp" type="text" name="name" value={form.name} onChange={onChange} required placeholder="Your name" />
                </div>
                <div>
                  <label className="ct-lbl">Phone</label>
                  <input className="ct-inp" type="tel" name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label className="ct-lbl">Email Address *</label>
                <input className="ct-inp" type="email" name="email" value={form.email} onChange={onChange} required placeholder="you@example.com" />
              </div>
              <div>
                <label className="ct-lbl">Message *</label>
                <textarea className="ct-inp" name="message" value={form.message} onChange={onChange} required rows={5} placeholder="Tell us how we can help…" style={{resize:"none"}} />
              </div>
              <button type="submit" className="ct-btn">
                <span>Send Message <Arrow /></span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="ct-wrap" style={{paddingTop:0}}>
        <div className="ct-sh ct-a0">
          <div><div className="ct-sh-num">03 — Location</div><div className="ct-sh-title">Find Us</div></div>
          {/* <div className="ct-sh-note">K.Ayyampalayam, Palladam, Tamil Nadu</div> */}
        </div>
        <div className="ct-map ct-a1">
          <div className="ct-map-top">
            <div>
              <div className="ct-map-title">Sri Bakawathi Life Science</div>
              <div className="ct-map-addr">No:1/770, K.Ayyampalayam(PO), Palladam, TN 641662</div>
            </div>
            <div className="ct-live"><div className="ct-live-dot" /> Live Map</div>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d250564.89793483046!2d77.3439278!3d11.1076742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3ba9ababa3eecfcf%3A0xd5408d394061bcb5!2sSri%20Bakawathi%20Life%20Science%2C%20No%3A1%2F770%2C%20K.Ayyampalayam(PO)%2C%20K.S.N%20Puram(Via)%2C%20Palladam%2C%20Tamil%20Nadu%20641662!3m2!1d10.982724!2d77.2239895!5e0!3m2!1sen!2sin!4v1772442468303!5m2!1sen!2sin"
            width="100%" height="420"
            style={{border:0,display:"block"}}
            allowFullScreen="" loading="lazy"
            title="Sri Bakawathi Life Science Location"
          />
        </div>
      </section>
    </div>
  );
}