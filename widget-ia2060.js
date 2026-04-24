(function() {
    // --- 1. CONFIGURACIÓN DE SEGURIDAD Y DOMINIOS ---
    const dominiosAutorizados = {
        "ia2060_admin": "ia2060.com",
        "ia2060_test": window.location.hostname,
        "betterworld2060.org": "betterworld2060.org"
    };

    const db = {
        // CONFIGURACIÓN DE IA2060 (7 BOTONES)
        "ia2060_admin": {
            nombre: "IA2060 Oficial",
            activo: true,
            color: "#0056b3",
            logo: "https://primary.jwwb.nl/public/q/i/t/temp-etdynbyloisuubyjguaw/logo-ia2060-alone-high.jpg",
            descripcion: "Expertos en IA + Soluciones Digitales",
            botones: [
                { texto: "WhatsApp", link: "https://wa.me/34643734158", icono: "fa-whatsapp", colorI: "#25D366" },
                { texto: "Google Chat", link: "https://mail.google.com/chat/u/info@ia2060.com", icono: "fa-comment-dots", colorI: "#4285F4" },
                { texto: "Formulario", link: "https://ia2060.com/formulario-app", icono: "fa-envelope", colorI: "#00d4ff" },
                { texto: "Anuncios", link: "https://ia2060.com/anuncio-importante", icono: "fa-bullhorn", colorI: "#f1c40f" },
                { texto: "Llamar Ahora", link: "tel:+34604917949", icono: "fa-phone-alt", colorI: "#e74c3c" },
                { texto: "Agendar Cita", link: "https://calendar.google.com/calendar", icono: "fa-calendar-check", colorI: "#f39c12" },
                { texto: "Ubicación", link: "https://maps.google.com", icono: "fa-map-marker-alt", colorI: "#16a085" }
            ]
        },
        // CONFIGURACIÓN DE BETTER WORLD 2060
        "betterworld2060.org": {
            nombre: "Better World 2060",
            activo: true,
            color: "#3eb300",
            logo: "https://primary.jwwb.nl/public/h/d/b/temp-pvyubjwyjdlmnfodqbn/betterworld2060-high-3vrs46.png",
            descripcion: "Solución Digital Activa",
            botones: [
                { texto: "WhatsApp", link: "https://wa.me/34643734158", icono: "fa-whatsapp", colorI: "#25D366" },
                { texto: "Llamar Ahora", link: "tel:+34604917949", icono: "fa-phone-alt", colorI: "#e74c3c" },
                { texto: "Contacto", link: "https://betterworld2060.org/contacto", icono: "fa-envelope", colorI: "#3498db" }
            ]
        }
    };

    // --- 2. LÓGICA DE CARGA ---
    const scriptTag = document.currentScript;
    const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
    const clienteId = urlParams.get('id') || "ia2060_admin";
    const hostActual = window.location.hostname.replace('www.', '');
    const settings = db[clienteId];

    if (!settings || !settings.activo) return;
    if (clienteId !== "ia2060_test" && clienteId !== "ia2060_admin" && dominiosAutorizados[clienteId] !== hostActual) return;

    // --- 3. ESTILOS ---
    const style = document.createElement('style');
    style.innerHTML = `
        #ia-master-root { font-family: sans-serif; }
        .ia-burbuja { position: fixed!important; bottom: 25px; right: 20px; width: 65px; height: 65px; background: #fff; border-radius: 50%; border: 2px solid ${settings.color}; z-index: 2147483647; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(0,0,0,0.3); padding: 5px; box-sizing: border-box; }
        .ia-burbuja img { width: 100%; border-radius: 50%; object-fit: contain; }
        .ia-panel { position: fixed!important; bottom: 100px; right: 20px; width: 350px; max-width: 90vw; background: #111827; border-radius: 20px; display: none; flex-direction: column; z-index: 2147483647; border: 1px solid ${settings.color}; color: white; padding: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.6); }
        .ia-panel.show { display: flex!important; animation: ia-fadeIn 0.3s ease; }
        .ia-btn { display: flex; align-items: center; background: #fff!important; color: #111!important; padding: 12px; margin: 8px 0; border-radius: 12px; text-decoration: none!important; font-weight: bold; transition: 0.2s; border: 1px solid #ddd; }
        .ia-btn i { margin-right: 12px; width: 25px; text-align: center; font-size: 18px; }
        @keyframes ia-fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);

    // --- 4. HTML ---
    const container = document.createElement('div');
    container.id = "ia-master-root";
    const bHtml = settings.botones.map(b => `
        <a href="${b.link}" target="_blank" class="ia-btn">
            <i class="fas ${b.icono}" style="color:${b.colorI}"></i> ${b.texto}
        </a>
    `).join('');

    container.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <div class="ia-burbuja" id="ia-open-btn"><img src="${settings.logo}"></div>
        <div class="ia-panel" id="ia-main-panel">
            <h4 style="text-align:center; margin:0 0 15px 0; color:${settings.color}">${settings.nombre}</h4>
            ${bHtml}
            <p style="text-align:center; font-size:9px; opacity:0.5; margin-top:15px;">Powered by IA2060</p>
        </div>
    `;
    document.body.appendChild(container);

    // --- 5. FUNCIONALIDAD ---
    const btn = document.getElementById('ia-open-btn');
    const pan = document.getElementById('ia-main-panel');
    btn.onclick = (e) => { e.stopPropagation(); pan.classList.toggle('show'); };
    document.addEventListener('click', () => { pan.classList.remove('show'); });

    // Persistencia para Webador
    setInterval(() => {
        if (container.parentNode !== document.body) document.body.appendChild(container);
    }, 1000);
})();
