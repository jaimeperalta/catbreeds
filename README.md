# 🐾 CatBreeds

Aplicación móvil desarrollada con **Ionic 8 + Angular 20 + Capacitor 7** para mostrar información y características de distintas razas de gatos.  

## 🚀 Características

- Construido con **Ionic Framework** y **Angular**.  
- Uso de **Capacitor** para integraciones nativas (Android e iOS).  
- Soporte para **internacionalización** con `@ngx-translate`.  
- Scripts personalizados para compilar en **Android** e **iOS** (Dev/Prod).  
- Arquitectura modular y escalable.  

---

## 📦 Scripts disponibles

| Script                   | Descripción                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| `npm start`               | Inicia la app en modo desarrollo con `ionic serve`.                        |
| `npm run build`           | Compila la app para producción (Angular build).                            |
| `npm run buildAndroidDev` | Construye la app Android en modo desarrollo y sincroniza con Capacitor.    |
| `npm run buildAndroidProd`| Construye la app Android en modo producción y sincroniza con Capacitor.    |
| `npm run buildIosDev`     | Construye la app iOS en modo desarrollo y sincroniza con Capacitor.        |
| `npm run buildIosProd`    | Construye la app iOS en modo producción y sincroniza con Capacitor.        |
| `npm run watch`           | Compila la app en modo watch (ideal para dev).                             |
| `npm run test`            | Ejecuta las pruebas unitarias con Karma + Jasmine.                         |
| `npm run lint`            | Ejecuta el linter con ESLint.                                              |

---

## 📂 Estructura del proyecto

La arquitectura sigue el estándar de **Ionic + Angular** con modularización por features.  

```bash
catbreeds/
├── android/                # Proyecto nativo Android generado por Capacitor
├── ios/                    # Proyecto nativo iOS generado por Capacitor
├── src/
│   ├── app/                # Configuración principal de la app
│   │   ├── core/           # plugins nativos, interceptores, guards
│   │   ├── shared/         # Componentes, servicios y utilidades compartidas
│   │   ├── features/       # Módulos de negocio (ej: cat-list, cat-detail)
│   │   ├── app.component.ts
│   │   └── app.config.ts
│   ├── assets/
│   │   ├── i18n/           # Archivos de traducciones (JSON)
│   │   └── icons/          # Íconos
│   │   └── imgs/           # Imágenes
│   ├── environments/       # Configuración env (dev, prod)
│   ├── index.html          # HTML principal
│   └── main.ts             # Entry point Angular
├── capacitor.config.ts     # Configuración Capacitor
├── package.json
└── README.md
