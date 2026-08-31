const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream']
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('ERROR:', err.message));

  console.log('Loading jordanengo.com...');
  await page.goto('https://jordanengo.com', { waitUntil: 'networkidle2' });

  await page.screenshot({ path: 'site_loaded.png' });
  console.log('Screenshot saved: site_loaded.png');

  // Check custom element shadow root or click
  const widget = await page.$('elevenlabs-convai');
  console.log('Widget present:', !!widget);

  await browser.close();
})();
