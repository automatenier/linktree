const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    permissions: ['microphone'],
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 324.0.0.33.109'
  });
  const page = await context.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to https://jordanengo.com...');
  await page.goto('https://jordanengo.com', { waitUntil: 'networkidle' });

  console.log('Taking initial screenshot...');
  await page.screenshot({ path: 'screenshot_initial.png' });

  console.log('Looking for ElevenLabs convai widget or mic button...');
  const widget = await page.$('elevenlabs-convai');
  console.log('elevenlabs-convai element found:', !!widget);

  if (widget) {
    console.log('Clicking widget...');
    await widget.click().catch(e => console.log('Widget click error:', e.message));
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshot_after_click.png' });
  }

  await browser.close();
})();
