(function() {
    // --- 1. CONFIGURACIÓN DE SEGURIDAD Y CLIENTES ---
    const dominiosAutorizados = {
        "ia2060_admin": "ia2060.com",
        "ia2060_test": window.location.hostname, // LLAVE MAESTRA: Funciona en cualquier dominio para tus pruebas
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
        },
        "ia2060_test": {
            nombre: "Modo de Prueba IA2060",
            activo: true,
            color: "#34495e",
            logo: "https://primary.jwwb.nl/public/q/i/t/temp-etdynbyloisuubyjguaw/logo-ia2060-alone-high.jpg",
            descripcion: "Si ves esto, el sistema funciona",
            botones: [
                { texto: "WhatsApp Test", link: "https://wa.me/34643734158", icono: "fa-whatsapp", colorI: "#25D366" },
                { texto: "Cerrar Prueba", link: "#", icono: "fa-times", colorI: "#e74c3c" }
            ]
        }
    };

    // --- 2. LÓGICA DE VALIDACIÓN ---
    const scriptTag = document.currentScript;
    const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
    const clienteId = urlParams.get('id') || "ia2060_admin";
    const hostActual = window.location.hostname.replace('www.', '');

    const settings = db[clienteId];

    // Bloqueo de seguridad: Si no existe el ID o el dominio no coincide (y no es el modo test)
    if (!settings || !settings.activo) return;
    if (clienteId !== "ia2060_test" && clienteId !== "ia2060_admin" && dominiosAutorizados[clienteId] !== hostActual) {
        console.error("IA2060: Dominio no autorizado.");
        return;
    }

    // --- 3. INYECCIÓN DE ESTILOS (BLINDAJE MÓVIL) ---
    const style = document.createElement('style');
    style.innerHTML = `
        #ia-master-root { font-family: 'Segoe UI', Roboto, sans-serif; z-index: 2147483647 !important; }
        .ia-burbuja { position: fixed !important; bottom: 25px; right: 20px; width: 65px; height: 65px; background: #fff; border-radius: 50%; border: 2px solid ${settings.color}; z-index: 2147483647 !important; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 25px rgba(0,0,0,0.3); animation: ia-float 3.5s ease-in-out infinite; padding: 5px; box-sizing: border-box; }
        .ia-burbuja img { width: 100%; border-radius: 50%; object-fit: contain; }
        
        .ia-panel { position: fixed !important; bottom: 100px; right: 20px; width: 400px; max-width: calc(100vw - 40px); max-height: 80vh; background: #111827; border-radius: 20px; z-index: 2147483647 !important; display: none; flex-direction: column; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 50px rgba(0,0,0,0.5); color: white; }
        .ia-panel.show { display: flex !important; animation: ia-fadeIn 0.3s ease; }
        
        .ia-header { padding: 25px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.02); }
        .ia-header img { width: 90px; height: 90px; border-radius: 50%; margin-bottom: 15px; border: 2px solid ${settings.color}; }
        .ia-header h4 { margin: 0; color: ${settings.color}; font-size: 18px; }
        .ia-header p { font-size: 12px; opacity: 0.7; margin: 5px 0 0; }

        .ia-body { padding: 15px; overflow-y: auto; flex-grow: 1; display: grid; gap: 10px; }
        .ia-btn { display: flex; align-items: center; background: white !important; color: #111 !important; padding: 14px; border-radius: 12px; text-decoration: none !important; font-weight: bold; transition: 0.3s; border: 1px solid #ddd; font-size: 14px; }
        .ia-btn:hover { transform: translateX(-5px); border-color: ${settings.color}; }
        .ia-btn i { width: 30px; font-size: 18px; margin-right: 10px; text-align: center; }

        .ia-splash { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #111827; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: 0.5s; }
        .ia-loader { width: 30px; height: 30px; border: 3px solid rgba(255,255,255,0.1); border-top: 3px solid ${settings.color}; border-radius: 50%; animation: spin 1s linear infinite; margin-top: 15px; }

        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes ia-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes ia-fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 600px) { .ia-panel { bottom: 95px; right: 15px; width: calc(100vw - 30px); } .ia-btn { padding: 16px; } }
    `;
    document.head.appendChild(style);

    // --- 4. CONSTRUCCIÓN DEL HTML ---
    const container = document.createElement('div');
    container.id = "ia-master-root";

    const botonesHtml = settings.botones.map(b => `
        <a href="${b.link}" target="_blank" class="ia-btn">
            <i class="fas ${b.icono}" style="color: ${b.colorI}"></i> ${b.texto}
        </a>
    `).join('');

    container.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <div class="ia-burbuja" id="ia-trigger">
            <img src="${settings.logo}" alt="Logo">
        </div>
        <div class="ia-panel" id="ia-panel-div">
            <div class="ia-splash" id="ia-splash-screen">
                <img src="${settings.logo}" style="width:70px; border-radius:50%">
                <div class="ia-loader"></div>
            </div>
            <div class="ia-header">
                <img src="${settings.logo}">
                <h4>${settings.nombre}</h4>
                <p>${settings.descripcion}</p>
            </div>
            <div class="ia-body">
                ${botonesHtml}
                <div style="text-align:center; padding: 10px; font-size:10px; opacity:0.4;">
                    Powered by IA2060 - Soluciones Digitales
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // --- 5. FUNCIONALIDAD Y PERSISTENCIA ---
    const trigger = document.getElementById('ia-trigger');
    const panel = document.getElementById('ia-panel-div');
    const splash = document.getElementById('ia-splash-screen');

    trigger.onclick = (e) => {
        e.stopPropagation();
        const isOpening = !panel.classList.contains('show');
        panel.classList.toggle('show');
        
        if (isOpening) {
            splash.style.display = 'flex';
            splash.style.opacity = '1';
            setTimeout(() => {
                splash.style.opacity = '0';
                setTimeout(() => { splash.style.display = 'none'; }, 500);
            }, 1000);
        }
    };

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && panel.classList.contains('show')) {
            panel.classList.remove('show');
        }
    });

    // SISTEMA DE PERSISTENCIA: Evita que Webador lo oculte
    function mantenerVivo() {
        if (container.parentNode !== document.body) {
            document.body.appendChild(container);
        }
        container.style.setProperty('display', 'block', 'important');
    }
    setInterval(mantenerVivo, 1000);

})();
