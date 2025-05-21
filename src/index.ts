import { Manager, MCEvent } from '@managed-components/types'

export async function addPixel(event: MCEvent) {
  const { client, payload } = event
  if (!payload.imgSrc) {
    console.error('No imgSrc provided in payload')
    return
  }

  const imgSrc: string = payload.imgSrc

  client.execute(`
    (function() {
      const safeImgSrc = "${imgSrc.replace(/"/g, '\\"')}";

      function safeAppend(element) {
        if (document.body) {
          document.body.appendChild(element);
        } else {
          document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(element);
          });
        }
      }

      function addPixel() {
        const img = new Image(1, 1);
        img.style.display = 'none';
        img.referrerPolicy = 'no-referrer';
        img.decoding = 'async';

        let cleaned = false;
        const cleanup = () => {
          if (!cleaned) {
            cleaned = true;
            try {
              document.body.removeChild(img);
            } catch (_) {}
          }
        };

        img.onload = img.onerror = cleanup;
        setTimeout(cleanup, 10000);

        img.src = safeImgSrc;
        safeAppend(img);
      }

      function sendPixel() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        fetch(safeImgSrc, {
          method: 'GET',
          mode: 'no-cors',
          credentials: 'include',
          signal: controller.signal
        })
        .then((response) => {
          if (response.ok) addPixel();
        })
        .catch(addPixel)
        .finally(() => clearTimeout(timeoutId));
      }

      function start() {
        if (window.requestIdleCallback) {
          window.requestIdleCallback(sendPixel, { timeout: 3000 });
        } else {
          setTimeout(sendPixel, 300);
        }
      }

      if (document.readyState === 'complete') {
        start();
      } else {
        window.addEventListener('load', start);
      }
    })();  
  `)
}

export default async function (manager: Manager) {
  manager.addEventListener('event', addPixel)
}
