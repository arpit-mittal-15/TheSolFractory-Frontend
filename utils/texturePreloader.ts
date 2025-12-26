import * as THREE from "three";

const textureCache = new Map<string, THREE.Texture>();
const texturePromises = new Map<string, Promise<THREE.Texture>>();

export function preloadTexture(url?: string | null) {
  if (!url) return;

  if (textureCache.has(url)) return;
  if (texturePromises.has(url)) return;

  const loader = new THREE.TextureLoader();

  const promise = new Promise<THREE.Texture>((resolve, reject) => {
    loader.load(
      url,
      (tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(1, 1);
        tex.needsUpdate = true;
        textureCache.set(url, tex);
        resolve(tex);
      },
      undefined,
      reject
    );
  });

  texturePromises.set(url, promise);

  promise.finally(() => {
    texturePromises.delete(url);
  });
}

export function getCachedTexture(url?: string | null) {
  if (!url) return null;
  return textureCache.get(url) ?? null;
}
