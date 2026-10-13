# Arquitectura del feature Feed — Frontend Web (Krona)

> Documento de contexto para pasar a otra IA. Describe cómo está construido
> el feature "Feed" dentro de `apps/web` (Next.js) a fecha 2026-10-10,
> en la branch `backend/feed`. Todo lo descrito abajo fue verificado leyendo
> el código fuente, no es una suposición.

## 1. Stack y convenciones generales

- Monorepo con **pnpm + turborepo**. Apps relevantes: `apps/backend` (NestJS),
  `apps/web` (Next.js App Router), `apps/mobile` (Expo).
- Frontend web: **Next.js con App Router**, componentes cliente marcados con
  `"use client"`, CSS Modules (`*.module.css`) por componente, íconos de
  `lucide-react`, imágenes con `next/image`.
- **No se usa axios ni React Query/SWR.** Las llamadas HTTP (cuando existen)
  pasan por un cliente propio basado en `fetch`: `apps/web/src/lib/api-client.ts`
  (`apiClient.get<T>(path)`, `apiClient.post<T>(path, data)`, usa
  `process.env.NEXT_PUBLIC_API_URL` como base y lanza `ApiError` si la
  respuesta no es `ok`).
- Organización por **features**: `apps/web/src/features/<Nombre>/` con
  subcarpetas `components/`, `hooks/`, `mocks/`, `types/`, `utils/`,
  `constats/` (sic, typo de "constants" usado en el repo).

## 2. Dónde vive el feature Feed

```
apps/web/src/features/Feed/
├── FeedPage.tsx                     # componente raíz del feature
├── FeedPage.module.css
├── components/
│   ├── Stories/                     # carrusel de historias (arriba del feed)
│   │   ├── Stories.tsx
│   │   └── StoryModal/StoryModal.tsx
│   ├── FreeList/FreeList.tsx        # variante/alternativa de listado de posts
│   ├── CreatePost/CreatePost.tsx    # formulario de creación de post (UI)
│   ├── Reactions/ReacTions.tsx
│   ├── Commets/Commets.tsx          # (sic, typo de "Comments")
│   ├── CenterPanel/                 # columna derecha visual del feed
│   │   ├── CenterPanel.tsx
│   │   ├── ServicesHighlight/
│   │   ├── PromoBanner/
│   │   └── NearOpportunities/
│   └── PostCard/                    # pieza central: una publicación
│       ├── PostCard.tsx             # orquestador, sin lógica de negocio propia
│       ├── Header/PostHeader.tsx
│       ├── Header/PostMenu.tsx
│       ├── Media/PostMedia.tsx
│       ├── Actions/PostActions.tsx
│       ├── Comments/CommentsPanel.tsx
│       ├── Share/SharePanel.tsx
│       ├── Reservation/ReservationModal.tsx
│       ├── Reservation/ReservationToast.tsx
│       └── hooks/
│           ├── useComments.ts
│           ├── useReservation.ts
│           └── useShare.ts
├── hooks/
│   └── usePostActions.ts            # like / save / follow (estado local)
├── mocks/
│   ├── mockPosts.ts                 # posts del feed (fuente de datos actual)
│   ├── mockStories.ts
│   ├── mockStatistics.ts
│   ├── mockRightPanel.ts
│   └── mockCenterPanel.ts
├── types/
│   ├── post.types.ts                # Post, PostComment
│   ├── user.types.ts                # User
│   ├── media.types.ts               # Media
│   ├── story.types.ts               # Story, StorySlide, StoryBadge
│   ├── centerPanel.types.ts         # ServiceItem, Opportunity
│   └── suggestion.types.ts          # Suggestion, AdBanner
├── constats/
│   ├── media.constants.ts
│   └── post.constants.ts
└── utils/
    ├── formatDate.ts
    └── formatDuration.ts
```

## 3. Puntos de entrada / routing

- **`/` (home)** → `apps/web/src/app/page.tsx`. Esta es la ruta que
  realmente se ve al levantar la app. Arma el layout así:
  ```tsx
  <MainLayout
    center={<FeedPage />}
    right={<RightPanel><MyAgenda .../><Statistics .../></RightPanel>}
  />
  ```
  `FeedPage` es el componente real del feature Feed.

- **`/feed`** → `apps/web/src/app/(cliente)/feed/page.tsx`. Está
  **completamente vacía / sin implementar**, solo:
  ```tsx
  export default function feed() {
    return <div><h1>feed</h1></div>;
  }
  ```
  No reutiliza `FeedPage`, no usa mocks ni API. Es un placeholder al que
  nadie conectó nada todavía.

**Conclusión:** ninguna de las dos rutas consume datos reales de la API.
La home usa mocks hardcodeados; `/feed` ni siquiera está implementada.

## 4. Flujo de datos actual (100% mock, sin red)

`FeedPage.tsx`:
```tsx
import { mockPosts } from "./mocks/mockPosts";
...
{mockPosts.map((post) => <PostCard key={post.id} post={post} />)}
```

No hay `useEffect`, `fetch` ni `apiClient` en ningún archivo del feature
Feed. `FreeList.tsx` (componente alternativo de listado) repite el mismo
patrón, importando `mockPosts` directo.

`CenterPanel.tsx` también se arma 100% con mocks propios
(`mockCenterPanel.ts`: `mockServices`, `mockOpportunities`).

`Stories.tsx` carga `mockStories` en `useState` inicial, pero sí tiene
algo de lógica real: persiste qué historias fueron vistas en
`localStorage` (`krona-seen-stories`) y permite agregar una "historia
local" (crea un object URL a partir de un archivo seleccionado, no sube
nada a ningún backend).

## 5. Modelo de datos del frontend (`types/`)

```ts
// post.types.ts
interface PostComment {
  id: string; username: string; avatar: string; text: string; createdAt: string;
}
interface Post {
  id: string;
  user: User;
  media: Media;
  likes: number;
  likedBy?: string;          // texto tipo "le gusta a X y otras personas"
  caption: string;
  commentsCount: number;
  comments?: PostComment[];  // comentarios PRE-CARGADOS embebidos en el post
  createdAt: string;
  isSuggestion?: boolean;    // marca posts "sugeridos" (feed algorítmico)
}

// user.types.ts
interface User {
  id?: string; username: string; avatar?: string; initials: string;
  verified?: boolean; isFollowing?: boolean;
}

// media.types.ts
interface Media {
  type: MediaType;   // "image" | "video" | "carrusel" (ver constats/media.constants.ts)
  urls: string[];
  duration?: string;
}
```

Otros tipos del feature (no van al backend todavía): `Story`/`StorySlide`
(historias), `ServiceItem`/`Opportunity` (panel central), `Suggestion`/
`AdBanner` (panel derecho/sugerencias).

## 6. Árbol de componentes y responsabilidades

```
FeedPage
├── Stories                 (historias, mock + localStorage, sin red)
├── posts.map(PostCard)     (uno por cada post del mock)
└── CenterPanel
    ├── ServicesHighlight
    ├── PromoBanner
    └── NearOpportunities
```

`PostCard.tsx` es **puramente un orquestador**: no tiene lógica propia,
delega todo a hooks y subcomponentes:

- `usePostActions(initialLiked, initialSaved, initialFollowing, initialLikes)`
  → estado local (no persistido) de like / guardado / follow. Todo en
  memoria del componente, se pierde al refrescar.
- `useComments(initialCount)` → abre/cierra el panel de comentarios,
  mantiene un **draft** de texto y un array de **strings** (no
  `PostComment[]`) con los comentarios que el usuario agrega en la sesión.
  `total = initialCount + comments.length`. No llama al backend.
- `useReservation()` → abre/cierra modal de reserva, al confirmar genera
  un mensaje de notificación temporal (`setTimeout` 4s). Todo mock, sin red.
- `useShare()` → abre/cierra panel de compartir, al elegir una opción solo
  setea un mensaje `"<opción>: opción seleccionada (mock)."`.

`CommentsPanel.tsx` renderiza dos listas distintas:
1. `initialComments` (tipo `PostComment[]`, vienen del mock del post, con
   avatar/username/id reales).
2. `comments` (tipo `string[]`, los que el usuario escribió en esta
   sesión, mostrados como "Tú: <texto>").

Esto es una **inconsistencia de tipos a tener en cuenta**: los comentarios
nuevos no tienen la forma `PostComment`, son solo texto plano in-memory.

## 7. Backend disponible (NestJS, módulo `feed`)

Controller: `apps/backend/src/modules/feed/presentation/feed.controller.ts`

| Método | Ruta | Uso |
|---|---|---|
| GET | `/feed` | lista el feed. Query: `cursor?`, `limit? (1-50)`, `userId?` (ver `ListFeedDto`). Devuelve `{ posts: [...], nextCursor }` |
| POST | `/feed/posts` | crea post. Body: `CreatePostDto` (`authorId`, `caption`, `mediaType: 'image'|'video'|'carrusel'`, `mediaUrls: string[]`, `duration?`) |
| POST | `/feed/posts/:id/like` | like (body: `userId`) |
| DELETE | `/feed/posts/:id/like` | unlike (query: `userId`) |
| GET | `/feed/posts/:id/comments` | lista comentarios (NO vienen embebidos en `/feed`) |
| POST | `/feed/posts/:id/comments` | crea comentario |

Forma real de cada post devuelto por `GET /feed` (función `toFeedResponse`):
```ts
{
  id,
  user: { id, username, initials },       // SIN avatar, verified, isFollowing
  media: { type, urls, duration },
  likes,
  likedByMe,                              // el front usa `likedBy?: string`, no boolean
  caption,
  commentsCount,                          // SIN comments embebidos
  createdAt,
}
```

Forma real de cada comentario (`toCommentResponse`):
```ts
{ id, username, text, createdAt }         // SIN avatar
```

## 8. Desajuste de tipos front vs backend (pendiente de resolver)

El tipo `Post` del frontend (`mockPosts.ts`) espera campos que el backend
**no** devuelve en `/feed`:
- `user.verified`, `user.isFollowing`, `user.avatar`
- `likedBy` (string) — el backend manda `likedByMe` (boolean)
- `comments` (array embebido) — el backend los sirve aparte, vía
  `GET /feed/posts/:id/comments`
- `isSuggestion`

Y el tipo `PostComment` del frontend espera `avatar`, que el backend no
devuelve en `toCommentResponse`.

Opciones para resolver (no decididas aún):
(a) un adapter/mapper backend→frontend que rellene defaults para lo que
    falte, o
(b) ajustar `Post`/`PostComment` para que esos campos sean opcionales y
    cargar lo que falte por separado (ej. comentarios vía lazy-load al
    abrir el post, en vez de venir precargados).

## 9. Qué falta para conectar el feed real (no implementado todavía)

1. En `FeedPage.tsx` y `FreeList.tsx`: reemplazar `import { mockPosts }`
   por una llamada real, ej. `apiClient.get<FeedResponse>("/feed")`
   (no existe hook `useFeed` ni similar todavía — no hay React Query/SWR
   en el proyecto, habría que decidir `useEffect` simple vs agregar una
   librería).
2. Mapear la respuesta del backend al tipo `Post` esperado por
   `PostCard`/`Stories`/etc. (ver punto 8).
3. Resolver la carga de comentarios por separado (lazy-load al abrir
   `CommentsPanel`, llamando a `GET /feed/posts/:id/comments`).
4. Los comentarios que el usuario escribe en `useComments` actualmente
   solo viven en memoria (array de `string`); habría que conectarlos a
   `POST /feed/posts/:id/comments` para que se persistan.
5. Like/save/follow (`usePostActions`) tampoco llaman a
   `POST /feed/posts/:id/like` ni a `DELETE /feed/posts/:id/like`: es
   estado 100% local y se pierde al refrescar.
6. Decidir qué hacer con la ruta `/feed` vacía: ¿eliminarla, redirigir a
   `/`, o implementarla como la página real del feed y mover ahí la
   lógica de `app/page.tsx`?
7. Verificar que `apps/web/.env.local` tenga
   `NEXT_PUBLIC_API_URL=http://localhost:3001` para que `api-client.ts`
   funcione.

## 10. Cómo levantar y debuggear

```bash
# todo el monorepo (turbo)
pnpm dev

# por separado
cd apps/backend && pnpm dev   # nest start --watch, puerto 3001
cd apps/web && pnpm dev       # next dev --turbopack, puerto 3000
```

Para ver qué devuelve el backend:
```bash
curl http://localhost:3001/feed | jq
```
o entrar directo a `http://localhost:3001/feed` en el navegador, o
revisar DevTools → Network una vez que el frontend llame a la API.

## 11. Notas / detalles menores encontrados en el código

- Hay typos consistentes en nombres de carpetas/archivos que no son
  errores de este documento sino del código real: `constats` (por
  "constants"), `Commets` (por "Comments"), `ReacTions.tsx`.
- `FreeList.tsx` parece ser una variante o versión anterior/alternativa
  de renderizado de posts que convive con `FeedPage.tsx` — ambas leen
  `mockPosts` directamente pero no está claro si `FreeList` se usa en
  algún lugar activo del árbol de rutas (no se verificó su uso en esta
  pasada).
- El panel derecho del home (`MyAgenda`, `Statistics`) no es parte del
  feature Feed, pero se renderiza junto a él en `app/page.tsx` y también
  usa datos mock (`mockAgenda`, `mockStatistics` de otros features).
