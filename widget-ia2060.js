(function() {
    // --- 1. CONFIGURACIÓN DE CLIENTES ---
    const dominiosAutorizados = {
        "ia2060_admin": "ia2060.com",
        "demo": "webdeprueba.com"
    };

    const db = {
        "ia2060_admin": {
            nombre: "IA2060 Oficial",
            activo: true,
            color: "#0056b3",
            logo: "https://primary.jwwb.nl/public/q/i/t/temp-etdynbyloisuubyjguaw/logo-ia2060-alone-high.jpg",
            descripcion: "Soluciones Digitales",
            botones: [
                { texto: "WhatsApp", link: "https://wa.me/34643734158", icono: "fa-whatsapp", colorIcono: "#25D366" },
                { texto: "Email", link: "mailto:info@ia2060.com", icono: "fa-envelope", colorIcono: "#00d4ff" }
            ]
        }
    };

    // --- 2. VALIDACIÓN ---
    const scriptTag = document.currentScript;
    const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
    const clienteId = urlParams.get('id');
    const settings = db[clienteId];

    if (!settings || !settings.activo) return;

    // --- 3. ESTILOS ---
    const style = document.createElement('style');
    style.innerHTML = `
        #ia-master-root { font-family: sans-serif; }
        .ia-burbuja { position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; background: #fff; border-radius: 50%; border: 2px solid ${settings.color}; z-index: 999999; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .ia-burbuja img { width: 80%; border-radius: 50%; }
        .ia-panel { position: fixed; bottom: 90px; right: 20px; width: 320px; background: #111827; border-radius: 15px; display: none; flex-direction: column; padding: 20px; color: white; z-index: 999999; border: 1px solid ${settings.color}; }
        .ia-panel.show { display: flex; }
        .ia-btn { background: #fff; color: #111; padding: 12px; margin: 5px 0; border-radius: 8px; text-decoration: none; display: flex; align-items: center; font-weight: bold; }
        .ia-btn i { margin-right: 10px; width: 20px; text-align: center; }
        .ia-splash { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #111827; border-radius: 15px; display: flex; align-items: center; justify-content: center; z-index: 10; }
    `;
    document.head.appendChild(style);

    // --- 4. HTML ---
    const container = document.createElement('div');
    container.id = "ia-master-root";
    
    const htmlBotones = settings.botones.map(b => `
        <a href="${b.link}" target="_blank" class="ia-btn">
            <i class="fab ${b.icono}" style="color:${b.colorIcono}"></i> ${b.texto}
        </a>
    `).join('');

    container.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <div class="ia-burbuja" id="ia-open"><img src="${settings.logo}"></div>
        <div class="ia-panel" id="ia-panel">
            <div class="ia-splash" id="ia-splash"><img src="${settings.logo}" width="60"></div>
            <h4 style="text-align:center; margin: 10px 0;">${settings.nombre}</h4>
            ${htmlBotones}
            <p style="font-size:10px; text-align:center; opacity:0.5; margin-top:15px;">Powered by IA2060</p>
        </div>
    `;
    document.body.appendChild(container);

    // --- 5. LÓGICA ---
    const btn = document.getElementById('ia-open');
    const pan = document.getElementById('ia-panel');
    const spl = document.getElementById('ia-splash');

    btn.onclick = () => {
        pan.classList.toggle('show');
        if(pan.classList.contains('show')){
            spl.style.display = 'flex';
            setTimeout(() => { spl.style.display = 'none'; }, 1000);
        }
    };
})();
