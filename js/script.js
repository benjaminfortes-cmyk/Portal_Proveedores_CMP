        (function () {
            const QUALTRICS_URL = 'https://ciamineradelpacifico.qualtrics.com/jfe/form/SV_eRNMhbvPVHHACt8';

            // Datos referenciales 
            const concesiones = {
                arica: {
                    nombre: 'Región de Arica y Parinacota',
                    comunas: ['Arica', 'Camarones', 'Putre', 'General Lagos'],
                    items: []
                },
                tarapaca: {
                    nombre: 'Región de Tarapacá',
                    comunas: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Pica', 'Huara', 'Camiña', 'Colchane'],
                    items: []
                },
                antofagasta: {
                    nombre: 'Región de Antofagasta',
                    comunas: ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Tocopilla', 'María Elena', 'Calama', 'San Pedro de Atacama', 'Ollagüe'],
                    items: [
                        { nombre: 'Concesión Demo Norte', comuna: 'Taltal', yacimiento: 'Pequeña', mineral: 'Fe', escala: 'Pequeña' }
                    ]
                },
                atacama: {
                    nombre: 'Región de Atacama',
                    comunas: ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Huasco', 'Freirina', 'Alto del Carmen'],
                    items: [
                        { nombre: 'Concesión Demo Atacama A', comuna: 'Chañaral', yacimiento: 'Pequeña', mineral: 'Fe', escala: 'Pequeña' },
                        { nombre: 'Concesión Demo Atacama B', comuna: 'Vallenar', yacimiento: 'Mediana', mineral: 'Fe', escala: 'Mediana' }
                    ]
                },
                coquimbo: {
                    nombre: 'Región de Coquimbo',
                    comunas: ['La Serena', 'Coquimbo', 'Andacollo', 'Vicuña', 'Paihuano', 'La Higuera', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado', 'Illapel', 'Salamanca', 'Los Vilos', 'Canela'],
                    items: []
                }
            };

            const panel = document.getElementById('cmp-mapa-panel');
            if (!panel) return;

            function escapeHtml(s) {
                return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
            }

            function renderRegion(key) {
                const data = concesiones[key];
                if (!data) return;

                const totalItems = data.items.length;
                const totalComunas = data.comunas.length;

                let html = '<div class="cmp-mapa-content">';
                html += '<h3 class="region-title">' + escapeHtml(data.nombre) + '</h3>';
                html += '<div class="region-meta">';
                html += '<span class="region-meta-pill"><i class="ph ph-stack" style="vertical-align: text-bottom;"></i> ' + totalItems + ' ' + (totalItems === 1 ? 'concesión' : 'concesiones') + '</span>';
                html += '<span class="region-meta-pill"><i class="ph ph-map-pin" style="vertical-align: text-bottom;"></i> ' + totalComunas + ' comunas</span>';
                html += '</div>';

                if (totalItems === 0) {
                    html += '<div class="cmp-mapa-no-data">';
                    html += '<i class="ph ph-clock-countdown"></i>';
                    html += '<strong>Próximamente</strong>';
                    html += 'Aún no tenemos concesiones publicadas en esta región. Si te interesa operar aquí, déjanos tus datos y te avisaremos cuando estén disponibles.';
                    html += '<div style="margin-top: 14px;"><a href="' + QUALTRICS_URL + '" class="cmp-concesion-cta" target="_blank" rel="noopener">Notificarme</a></div>';
                    html += '</div>';
                } else {
                    data.items.forEach(item => {
                        html += '<div class="cmp-concesion-card">';
                        html += '<div class="cmp-concesion-icon"><img src="./logo.png" alt="CMP"></div>';
                        html += '<div class="cmp-concesion-info">';
                        html += '<h4>' + escapeHtml(item.nombre) + '</h4>';
                        html += '<div class="cmp-concesion-info-list">';
                        html += '<strong>Comuna:</strong> ' + escapeHtml(item.comuna) + '<br>';
                        html += '<strong>Yacimiento:</strong> ' + escapeHtml(item.yacimiento) + ' · <strong>Mineral:</strong> ' + escapeHtml(item.mineral) + '<br>';
                        html += '<strong>Escala de minería:</strong> ' + escapeHtml(item.escala);
                        html += '</div></div>';
                        html += '<a href="' + QUALTRICS_URL + '" class="cmp-concesion-cta" target="_blank" rel="noopener">Postular</a>';
                        html += '</div>';
                    });
                }

                html += '<div class="cmp-mapa-comunas">';
                html += '<div class="cmp-mapa-comunas-title"><i class="ph ph-map-pin-line" style="vertical-align: text-bottom;"></i> Comunas en la región</div>';
                html += '<div class="cmp-mapa-comunas-list">';
                data.comunas.forEach(c => {
                    html += '<span class="cmp-mapa-comuna-tag">' + escapeHtml(c) + '</span>';
                });
                html += '</div></div>';

                html += '</div>';
                panel.innerHTML = html;
            }

            const regions = document.querySelectorAll('.cmp-mapa-region-group');
            regions.forEach(el => {
                const isDisabled = el.dataset.disabled === 'true';

                if (isDisabled) {
                    el.setAttribute('aria-disabled', 'true');
                    el.setAttribute('aria-label', 'Región próximamente disponible');
                    return;
                }

                el.setAttribute('tabindex', '0');
                el.setAttribute('role', 'button');
                el.setAttribute('aria-label', 'Ver concesiones en ' + (concesiones[el.dataset.region] ? concesiones[el.dataset.region].nombre : el.dataset.region));

                const activate = () => {
                    regions.forEach(r => r.classList.remove('active'));
                    document.querySelectorAll('.cmp-mapa-region-group[data-region="' + el.dataset.region + '"]:not(.is-disabled)')
                        .forEach(g => g.classList.add('active'));
                    renderRegion(el.dataset.region);
                };
                const setHover = (on) => {
                    document.querySelectorAll('.cmp-mapa-region-group[data-region="' + el.dataset.region + '"]:not(.is-disabled)')
                        .forEach(g => g.classList.toggle('hover-sync', on));
                };
                el.addEventListener('click', activate);
                el.addEventListener('mouseenter', () => setHover(true));
                el.addEventListener('mouseleave', () => setHover(false));
                el.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        activate();
                    }
                });
            });
        })();