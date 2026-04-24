(function() {
    const db = {
        "betterworld2060.org": {
            nombre: "Better World 2060",
            activo: true,
            color: "#3eb300",
            logo: "https://primary.jwwb.nl/public/h/d/b/temp-pvyubjwyjdlmnfodqbn/betterworld2060-high-3vrs46.png",
            botones: [
                { texto: "WhatsApp", link: "https://wa.me/34643734158", icono: "fa-whatsapp", colorI: "#25D366" },
                { texto: "Llamar Ahora", link: "tel:+34604917949", icono: "fa-phone-alt", colorI: "#e74c3c" },
                { texto: "Contacto", link: "https://betterworld2060.org/contacto", icono: "fa-envelope", colorI: "#3498db" }
            ]
        }
    };

    const scriptTag = document.currentScript;
    const urlParams = new URLSearchParams(scriptTag.src.split('?')[1]);
    const clienteId = urlParams.get('id') || "betterworld2060.org";
    const settings = db[clienteId];

    if (!settings || !settings.activo) return;

    const style = document.createElement('style');
    style.innerHTML = `
        .ia-burbuja { position: fixed!important; bottom: 20px; right: 20px; width: 60px; height: 60px; background: #fff; border-radius: 50%; border: 2px solid ${settings.color}; z-index: 2147483647; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3); }
        .ia-burbuja img { width: 80%; border-radius: 50%; }
        .ia-panel { position: fixed!important; bottom: 90px; right: 20px; width: 300px; background: #111827; border-radius: 15px; display: none; flex-direction: column; padding: 15px; color: white; z-index: 2147483647; border: 1px solid ${settings.color}; }
        .ia-panel.show { display: flex!important; }
        .ia-btn { background: #fff!important; color: #111!important; padding: 12px; margin: 5px 0; border-radius: 10px; text-decoration: none!important; display: flex; align-items: center; font-weight: bold; }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    const bHtml = settings.botones.map(b => `<a href="${b.link}" target="_blank" class="ia-btn"><i class="fas ${b.icono}" style="color:${b.colorI}"></i> ${b.texto}</a>`).join('');
    container.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        <div class="ia-burbuja" id="ia-open-btn"><img src="${settings.logo}"></div>
        <div class="ia-panel" id="ia-main-panel"><h4 style="text-align:center;margin:0 0 10px 0">${settings.nombre}</h4>${bHtml}</div>
    `;
    document.body.appendChild(container);

    document.getElementById('ia-open-btn').onclick = (e) => {
        e.stopPropagation();
        document.getElementById('ia-main-panel').classList.toggle('show');
    };
})();
