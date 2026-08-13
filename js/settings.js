
const DEFAULT_SETTINGS = {
  texts: {
    startButton: 'Explore',
    loaderLoading: 'Loading universe...',
    loaderReady: 'Universe Ready',
    introTitle: 'Galaxy of Memories',
    introSubtitle: '',
    milestoneTitle: 'A milestone worth remembering',
    milestoneSubtitle: 'A journey full of light.',
    turningPointTitle: 'Every journey has a turning point.',
    turningPointSubtitle: 'And here we are.',
    revealTitle: 'And here it is...',
    revealSubtitle: 'Your galaxy of memories',
    photoIndex: 'Photo',
    finalTitle: 'HAPPY BIRTHDAY!',
    finalSubtitle: 'To many more light-years together',
    endTitle: 'MADE WITH LOVE',
    webglFallback: 'Hardware rendering is unsupported.'
  },
  audio: {
    ambient: { m4a: 'music/galaxi.m4a', ogg: 'music/galaxi.ogg' },
    event: { m4a: 'music/happy.m4a', ogg: 'music/happy.ogg' }
  },
  photos: {
    special: [
      { path: 'photos/photo_1.webp', caption: 'Memory #1' },
      { path: 'photos/photo_2.webp', caption: 'Memory #2' }
    ],
    gallery: [
      { path: 'photos/photo_3.webp', caption: 'Favorite Moments' },
      { path: 'photos/photo_4.webp', caption: 'Unforgettable Days' },
      { path: 'photos/photo_5.webp', caption: 'Beautiful Times' },
      { path: 'photos/photo_6.webp', caption: 'To many more light-years' }
    ]
  }
};

function deepMerge(base, override) {
  // Los textos, fotos y musica los saco del settings.json para que el que  reciba el regalo pueda cambiar todo sin tocar codigo Esto me copia los defaults y solo pisa lo que venga en el json, Lo hago con recursion porque hay objetos anidados (texts y photos).
  const clone = JSON.parse(JSON.stringify(base));
  if (!override) return clone;

  for (const key in override) {
    if (clone[key] && typeof clone[key] === 'object' && !Array.isArray(clone[key])) {
      clone[key] = deepMerge(clone[key], override[key]);
    } else {
      clone[key] = override[key];
    }
  }
  return clone;
}

export async function getSettings() {
  try {
    const res = await fetch('settings.json');
    if (!res.ok) throw new Error(`settings.json returned ${res.status}`);
    const raw = await res.json();
    return deepMerge(DEFAULT_SETTINGS, raw);
  } catch (err) {
    console.warn('settings.json could not be loaded, using defaults.', err);
    return deepMerge(DEFAULT_SETTINGS, {});
  }
}
