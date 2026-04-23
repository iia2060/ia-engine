(function() {
    // --- 1. CONFIGURACIÓN DE CLIENTES ---
    const dominiosAutorizados = {
        "ia2060_admin": "ia2060.com",
        "demo_cliente": "webdeprueba.es"
    };

    const db = {
        "ia2060_admin": {
            nombre: "IA2060 Oficial",
            activo: true,
            color: "#0056b3",
            logo: "https://primary.jwwb.nl/public/q/i/t/temp-etdynbyloisuubyjguaw/logo-ia2060-alone-high.jpg",
            descripcion: "Expertos en IA + Soluciones Digitales",
            botones: [
                { texto: "WhatsApp", link: "https://wa.me/34643734158", icono: "fa-whatsapp", colorI: "#25D366" },
                { texto: "Google Chat", link: "https://mail.google.com/chat/u/info@ia2060.com", icono: "fa-comment-dots", colorI: "#4285F4" },
                { texto: "Formulario de Contacto", link: "https://ia2060.com/formulario-app", icono: "fa-envelope-open-text", colorI: "#00d4ff" },
                { texto: "Anuncios Importantes", link: "https://ia2060.com/anuncio-importante", icono: "fa-bullhorn", colorI: "#f1c40f" },
                { texto: "Llamar Ahora", link: "tel:+34604917949", icono: "fa-phone-alt", colorI: "#e74c3c" },
                { texto: "Agendar Cita", link: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3gCW6yPDZRvZEJ2ShEk8MsbO-t1ZlRoiW9s6X26d_tl4xQAwdscT8EaucQXKRqMSFnENitggrn?gv=true", icono: "fa-calendar-check", colorI: "#f39c12" },
                { texto: "Ubicación", link: "https://www.google.com/maps?q=Av.+la+Habana+71,+Ourense,+España", icono: "fa-map-marker-alt", colorI: "#16a085" }
            ]
        }
    };

    // --- 2. VALIDACIÓN ---
    const scriptTag = document.currentScript;
    const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
    const clienteId = urlParams.get('id');
    const settings = db[clienteId];
    const hostActual = window.location.hostname.replace('www.', '');

    if (!settings || !settings.activo) return;
    if (dominiosAutorizados[clienteId] !== hostActual && clienteId !== "ia2060_admin") {
        console.error("Dominio no autorizado."); return;
    }

    // --- 3. ESTILOS (CON PERSISTENCIA MÓVIL) ---
    const style = document.createElement('style');
    style.innerHTML = `
        #ia-master-root { font-family: 'Segoe UI', Roboto, sans-serif; z-index: 2147483647 !important; }
        .ia-burbuja { position: fixed !important; bottom: 25px; right: 20px; width: 65px; height: 65px; background: #fff; border-radius: 50%; border: 2px solid ${settings.color}; z-index: 2147483647 !important; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(0,0,0,0.3); animation: ia-float 3.5s ease-in-out infinite; padding: 5px; box-sizing: border-box; }
        .ia-burbuja img { width: 100%; border-radius: 50%; object-fit: contain; }
        .ia-panel { position: fixed !important; bottom: 100px; right: 20px; width: 400px; max-width: calc(100vw - 40px); max-height: 80vh; background: #111827; border-radius: 20px; display: none; flex-direction: column; z-index: 2147483647 !important; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 50px rgba(0,0,0,0.5); color: white; overflow: hidden; }
        .ia-panel.show { display: flex !important; animation: ia-fadeIn 0.3s ease; }
        .ia-header { padding: 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .ia-header img { width: 100px; border-radius: 50%; margin-bottom: 10px; }
        .ia-btn-grid { padding: 15px; overflow-y: auto; display: grid; gap: 10px; }
        .ia-btn { display: flex; align-items: center; background: #fff !important; color: #111 !important; padding: 12px; border-radius: 12px; text-decoration: none !important; font-weight: bold; border: 1px solid #ddd; transition: 0.3s; }
        .ia-btn:hover { transform: translateX(-5px); border-color: ${settings.color}; }
        .ia-btn i { width: 25px; margin-right: 10px; text-align: center; font-size: 18px; }
        @keyframes ia-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes ia-fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 600px) { .ia-panel { bottom: 95px; width: calc(100vw - 30px); right: 15px; } .ia-btn { padding: 15px; } }
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
            <div class="ia-header">
                <img src="${settings.logo}">
                <h4 style="margin:0; color:${settings.color}">${settings.nombre}</h4>
                <p style="margin:5px 0 0; font-size:12px; opacity:0.7">${settings.descripcion}</p>
            </div>
            <div class="ia-btn-grid">${bHtml}</div>
            <p style="text-align:center; font-size:10px; opacity:0.4; padding-bottom:10px">Powered by IA2060</p>
        </div>
    `;
    document.body.appendChild(container);

    // --- 5. LÓGICA Y PERSISTENCIA ---
    const btn = document.getElementById('ia-open-btn');
    const pan = document.getElementById('ia-main-panel');

    btn.onclick = (e) => { e.stopPropagation(); pan.classList.toggle('show'); };
    document.addEventListener('click', (e) => { if(!container.contains(e.target)) pan.classList.remove('show'); });

    // Forzar visibilidad en móviles (evita que Webador lo oculte al inicio)
    function force() {
        container.style.setProperty('display', 'block', 'important');
        if (container.parentNode !== document.body) document.body.appendChild(container);
    }
    setInterval(force, 1000);
})();
