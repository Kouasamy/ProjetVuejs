# Technical Documentation - Open Messenger

---

## 🇫🇷 DOCUMENTATION FRANÇAISE

### 1. Architecture du Système
**Open Messenger** est une Single Page Application (SPA) construite avec **Vue.js 3** (Composition API). Le projet utilise une architecture modulaire pour séparer la logique de l'interface utilisateur et les appels API.

### 2. Service API Centralisé
Toutes les interactions avec l'API **Kwick** sont isolées dans le service `src/services/api.js`. Ce service gère :
- L'authentification (Sign-up / Login).
- La récupération des utilisateurs connectés.
- L'envoi et la réception des messages.
- Le formatage des paramètres pour assurer la compatibilité avec le backend.

### 3. Simulation Temps Réel (Polling)
L'API Kwick étant basée sur des requêtes HTTP classiques, l'aspect "temps réel" est simulé via du **polling** (requêtes répétées) :
- **Messages** : Rafraîchis toutes les 2 secondes dans `ChatMessages.vue`.
- **Utilisateurs** : Rafraîchis toutes les 10 secondes dans `UserList.vue`.
Cela permet une synchronisation continue sans interaction manuelle de l'utilisateur.

### 4. Design & UX
L'interface utilise un **Design System** sur mesure défini dans `src/assets/main.css`, basé sur :
- **Glassmorphism** : Effets de transparence et de flou pour un rendu premium.
- **Variables CSS** : Pour une maintenance facile des couleurs et du thème.
- **Responsive Layout** : Adaptation automatique de la barre latérale pour les appareils mobiles.

---

## 🇺🇸 ENGLISH DOCUMENTATION

### 1. System Architecture
**Open Messenger** is a Single Page Application (SPA) built with **Vue.js 3** (Composition API). The project uses a modular architecture to decouple the UI logic from the API communication layer.

### 2. Centralized API Service
All interactions with the **Kwick API** are isolated within the `src/services/api.js` service. This service handles:
- Authentication (Sign-up / Login).
- Fetching logged-in users.
- Sending and receiving chat messages.
- Parameter encoding to ensure backend compatibility.

### 3. Real-Time Simulation (Polling)
Since the Kwick API is built on standard HTTP requests, the "real-time" experience is simulated using **polling** (periodic requests):
- **Messages**: Refreshed every 2 seconds in `ChatMessages.vue`.
- **Users**: Refreshed every 10 seconds in `UserList.vue`.
This ensures continuous synchronization without requiring manual user refreshes.

### 4. Design & UX
The interface leverages a custom **Design System** defined in `src/assets/main.css`, featuring:
- **Glassmorphism**: Transparency and blur effects for a premium look.
- **CSS Variables**: For easy maintenance of colors and themes.
- **Responsive Layout**: Automatic adjustment of the sidebar for mobile devices.

---
**Technical Specifications by: Kouat Ekra Samuel**
*March 2026*
