(function() {
    const db = {
        "ia2060_admin": {
            nombre: "IA2060 Oficial",
            activo: true,
            color: "#0056b3",
            logo: "https://primary.jwwb.nl/public/q/i/t/temp-etdynbyloisuubyjguaw/logo-ia2060-alone-high.jpg",
            botones: [
                { t: "WhatsApp", l: "https://wa.me/34643734158", i: "fa-whatsapp", c: "#25D366" },
                { t: "Google Chat", l: "https://mail.google.com/chat/u/info@ia2060.com", i: "fa-comment-dots", c: "#4285F4" },
                { t: "Formulario", l: "https://ia2060.com/formulario-app", i: "fa-envelope", c: "#00d4ff" },
                { t: "Anuncios", l: "https://ia2060.com/anuncio-importante", i: "fa-bullhorn", c: "#f1c40f" },
                { t: "Llamar", l: "tel:+34604917949", i: "fa-phone-alt", c: "#e74c3c" },
                { t: "Cita", l: "https://calendar.google.com", i: "fa-calendar-check", c: "#f39c12" },
                { t: "Ubicación", l: "http://maps.google.com", i: "fa-map-marker-alt", c: "#16a085" }
            ]
        },
        "betterworld2060.org": {
            nombre: "Better World 2060",
            activo: true,
            color: "#3eb300",
            logo: "https://primary.jwwb.nl/public/h/d/b/temp-pvyubjwyjdlmnfodqbn/betterworld2060-high-3vrs46.png",
            botones: [
                { t: "WhatsApp", l: "https://wa.me/34643734158", i: "fa-whatsapp", c: "#25D366" },
                { t: "Llamar Ahora", l: "tel:+34604917949", i: "fa-phone-alt", c: "#e74c3c" },
                { t: "Contacto", l: "https://betterworld2060.org/contacto", i: "fa-envelope", c: "#3498db" }
            ]
        }
    };

    const scriptTag = document.currentScript;
    const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
    const clienteId = urlParams.get('id') || "ia2060_admin";
    const settings = db[clienteId];

    if (!settings || !settings.activo) return;

    const style = document.createElement('style');
    style.innerHTML = `
        .ia-burbuja { position: fixed!important; bottom: 20px; right: 20px; width: 60px; height: 60px; background: #fff; border-radius: 50%; border: 2px solid ${settings.color}; z-index: 2147483647; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .ia-burbuja img { width: 85%; border-radius: 50%; }
        .ia-panel { position: fixed!important; bottom: 90px; right: 20px; width: 320px; max-width: 85vw; background: #111827; border-radius: 15px; display: none; flex-direction: column; padding: 15px; color: white; z-index: 2147483647; border: 1px solid ${settings.color}; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .ia-panel.show { display: flex!important; animation: iaFade 0.3s ease; }
        .ia-btn { background: #fff!important; color: #111!important; padding: 12px; margin: 5px 0; border-radius: 10px; text-decoration: none!important; display: flex; align-items: center; font-weight: bold; font-family: sans-serif; font-size: 14px; border: 1px solid #ddd; }
        @keyframes iaFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    const bHtml = settings.botones.map(b => `<a href="${b.l}" target="_blank" class="ia-btn"><i class="fas ${b.i}" style="color:${b.c}; margin-right:10px; width:20px; text-align:center;"></i> ${b.t}</a>`).join('');
    container.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <div class="ia-burbuja" id="ia-open-master"><img src="${settings.logo}"></div>
        <div class="ia-panel" id="ia-panel-master"><h4 style="text-align:center;margin:0 0 15px 0; color:${settings.color}">${settings.nombre}</h4>${bHtml}</div>
    `;
    document.body.appendChild(container);

    document.getElementById('ia-open-master').onclick = (e) => {
        e.stopPropagation();
        document.getElementById('ia-panel-master').classList.toggle('show');
    };
    document.addEventListener('click', () => { 
        const p = document.getElementById('ia-panel-master');
        if(p) p.classList.remove('show'); 
    });
})();
