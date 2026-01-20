// aca importo facil a mis componentes DashboardFree y DashboardPremium
export { default as DashboardFree } from "./free/DashboardFree";
export { default as DashboardPremium } from "./premium/DashboardPremium";
// y los exporto desde este index.ts para que en el App.tsx pueda importarlos mas facil desde 'src/screens/dashboard'
// sin tener que ir a la ruta larga 'src/screens/dashboard/free/DashboardFree' o 'src/screens/dashboard/premium/DashboardPremium'
// es una forma de simplificar las importaciones y mantener el codigo mas limpio y organizado 