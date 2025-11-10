# 🧾 Signaturit - Document Upload & Signature Workflow (Frontend Test)

Este proyecto es una **prueba técnica de Frontend Developer** para **Signaturit Group**.  
El objetivo es construir una aplicación simple de gestión de documentos que permita subir archivos, solicitar firmas digitales, hacer seguimiento de estados y simular notificaciones.

---

## 🚀 Objetivo del proyecto

Desarrollar una aplicación web en **React + TypeScript** que cumpla con el siguiente flujo:

1. **Subida de documento** (`Upload`): permite cargar archivos PDF o DOCX.  
2. **Solicitud de firma** (`Signature Request`): ingresar emails de firmantes y enviar solicitud.  
3. **Seguimiento de estado** (`Tracking`): visualizar documentos con su estado (`Pending`, `Signed`, `Declined`).  
4. **Simulación de notificación** (`Notification Simulation`): mostrar un mensaje cuando el estado cambia.  
5. **Diseño responsive**: adaptado para escritorio y dispositivos móviles.

---

## 🧰 Tecnologías utilizadas

| Categoría | Tecnología |
|------------|-------------|
| Framework | [React 18](https://react.dev/) |
| Lenguaje | [TypeScript](https://www.typescriptlang.org/) |
| Compilador | [Vite + SWC](https://vitejs.dev/) |
| Estado global | [Zustand](https://github.com/pmndrs/zustand) |
| Formularios | [React Hook Form](https://react-hook-form.com/) |
| Testing | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |
| Estilos | CSS nativo (flex + grid + variables de tema) |

---

## 🧱 Estructura del proyecto

```bash
src/
├── api/ # Mock API que simula backend
│ └── mock.ts
├── store/ # Estado global (Zustand)
│ └── docStore.ts
├── components/ # Componentes principales
│ ├── UploadForm.tsx
│ ├── SignatureRequestForm.tsx
│ ├── DocumentTable.tsx
│ └── NotificationToast.tsx
├── types
│ └── types.ts # Tipos globales de TypeScript
├── test/ # Test/Pruebas
├── App.tsx # Estructura principal de la app
├── main.tsx # Punto de entrada
└── styles.css # Estilos
```

---

## ⚙️ Requerimientos técnicos

- Node.js **>= 18**
- npm o yarn
- Navegador moderno con soporte ES Modules

---

## 🧩 Funcionalidades implementadas

### 1. Subida de documentos
Permite subir archivos PDF o DOCX.  
Se guarda un objeto `DocumentItem` en el store con metadatos básicos (nombre, tamaño, tipo, fecha, estado).

### 2. Solicitud de firma
Campo para ingresar **uno o varios emails** (separados por comas).  
Simula el envío de una solicitud de firma y actualiza el documento con los firmantes.

### 3. Seguimiento de estado
Tabla dinámica que muestra todos los documentos con sus respectivos estados (`pending`, `signed`, `declined`).

### 4. Simulación de notificación
Cada acción (subir documento, solicitar firma o cambiar estado) genera una notificación visual tipo **toast**.

### 5. Diseño responsive
Adaptación mediante `@media` queries y `flexbox`.  
Funciona en pantallas móviles y desktop.

---

## 🧮 Flujo interno (resumen técnico)

1. **Zustand store (`docStore.ts`)**  
   Maneja el estado global y las acciones (`upload`, `request`, `updateStatus`, `fetch`, `closeToast`).

2. **Mock API (`api/mock.ts`)**  
   Simula un backend en memoria con pequeñas demoras artificiales (`delay`) para representar peticiones reales.

3. **Componentes React**  
   - `UploadForm`: maneja subida de archivos.  
   - `SignatureRequestForm`: envía emails de firmantes.  
   - `DocumentTable`: renderiza la lista y permite cambiar estados.  
   - `NotificationToast`: escucha cambios y muestra mensajes.

4. **App.tsx**  
   Orquesta el flujo de toda la aplicación: renderiza formularios, lista, spinner y notificaciones.

---

## ⚙️ Correr App en local:

```bash
  npm run test
  git clone https://github.com/soldiersnake/Signaturit-Technical-Test.git
  cd signaturit-mvp
  npm install
  npm run dev # Correr la app en local
  👉 http://localhost:5173
```

---

## 🧪 Pruebas

Incluye tests con React Testing Library y Vitest:

```bash
  npm run test
  git clone https://github.com/soldiersnake/Signaturit-Technical-Test.git
  cd signaturit-mvp
  npm install
  npm run test # Correr los test
  o
  npm run test:watch # Correr los test en modo escucha
  👉 http://localhost:5173
```

---

## ✍️ Autor

**Mariano D. Macías Gandulfo**
Frontend Developer · React / TypeScript · Valencia, España

