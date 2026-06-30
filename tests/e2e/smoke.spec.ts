import { expect, test } from '@playwright/test';
import { mkdirSync } from 'node:fs';

test.beforeAll(() => {
  mkdirSync('test-results/screenshots', { recursive: true });
});

test('homepage renders media hero and dark mode', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Waste Is Value Waiting To Be Recovered/i })).toBeVisible();
  await expect(page.getByAltText(/clean modern materials recovery facility/i).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /Wastewater treatment is a resource/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Request Wastewater Assessment/i }).first()).toHaveAttribute('href', '/contact#contact-form');
  await page.getByLabel(/Switch to dark mode/i).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.screenshot({ path: 'test-results/screenshots/home-desktop.png', fullPage: false });
});

test('header uses logo as home and avoids duplicate home navigation', async ({ page }) => {
  await page.goto('/solutions');
  const header = page.getByRole('banner');
  const logoHome = header.getByRole('link', { name: /EterSolis home/i });
  await expect(logoHome).toHaveAttribute('href', '/');
  await expect(header.getByRole('navigation', { name: /Primary navigation/i }).getByRole('link', { name: /^Home$/i })).toHaveCount(0);
  await expect(header.getByRole('link', { name: /^Sell Waste$/i })).toHaveAttribute('href', '/sell-waste#waste-form');
  await logoHome.click();
  await expect(page).toHaveURL(/\/$/);
});

test('homepage primary and footer links resolve', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /Sell Waste To EterSolis/i }).first()).toHaveAttribute('href', '/sell-waste#waste-form');
  await page.goto('/sell-waste#waste-form');
  await expect(page).toHaveURL(/\/sell-waste#waste-form$/);
  await expect(page.locator('#waste-form')).toBeVisible();

  await page.goto('/');
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Media Credits' })).toHaveAttribute('href', '/media-credits');
  await page.goto('/media-credits', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/media-credits$/);
  await expect(page.getByRole('heading', { name: /Professional visual assets with documented sources/i })).toBeVisible();
});

test('mobile navigation opens primary routes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByLabel(/Open navigation menu/i).click();
  const industriesLink = page.getByRole('navigation', { name: /Mobile navigation/i }).getByRole('link', { name: 'Industries' });
  await expect(industriesLink).toBeVisible();
  await expect(industriesLink).toHaveAttribute('href', '/industries');
  await expect(page.getByRole('navigation', { name: /Mobile navigation/i }).getByRole('link', { name: /^Home$/i })).toHaveCount(0);
  await page.goto('/industries');
  await expect(page).toHaveURL(/\/industries$/);
  await page.screenshot({ path: 'test-results/screenshots/home-mobile-nav.png', fullPage: true });
});

test('sell waste stepper advances through intake flow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/sell-waste');
  await expect(page.getByRole('link', { name: /^Start Waste Review$/i }).first()).toBeVisible();
  await page.getByLabel(/Company name/i).fill('EterSolis Test Company');
  await page.getByLabel(/Contact name/i).fill('Test Reviewer');
  await page.getByLabel(/^Email$/i).fill('review@example.com');
  await page.getByLabel(/Country/i).fill('South Africa');
  await page.getByRole('button', { name: /Continue/i }).click();
  await expect(page.getByLabel(/Material description/i)).toBeVisible();
  await page.getByLabel(/Material description/i).fill('Clean recoverable cardboard and plastic packaging from a controlled test stream.');
  await page.getByRole('button', { name: /Continue/i }).click();
  await expect(page.getByLabel(/Confidentiality level/i)).toBeVisible();
  await page.screenshot({ path: 'test-results/screenshots/sell-waste-stepper.png', fullPage: true });
});

test('contact stepper and Helios wizard route users', async ({ page }) => {
  await page.goto('/contact?topic=Wastewater%20Treatment#contact-form');
  await expect(page.getByLabel(/Topic/i)).toHaveValue('Wastewater Treatment');
  await page.getByLabel(/Topic/i).selectOption('Wastewater Treatment');
  await page.getByRole('button', { name: /Continue/i }).click();
  await expect(page.getByLabel(/Name/i)).toBeVisible();

  await page.goto('/helios');
  await page.getByRole('button', { name: /Wastewater treatment/i }).click();
  await expect(page.getByRole('heading', { name: /Wastewater treatment/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Request wastewater assessment/i })).toHaveAttribute('href', '/contact?topic=Wastewater%20Treatment#contact-form');
  await page.screenshot({ path: 'test-results/screenshots/helios-wizard.png', fullPage: true });
});

test('lead forms show success and error states with mocked API responses', async ({ page }) => {
  await page.route('**/api/leads', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, submissionId: 'lead-test-001', message: 'Mock inquiry received.' })
    });
  });

  await page.goto('/contact?topic=Partnership#contact-form');
  await expect(page.getByLabel(/Topic/i)).toHaveValue('Partnership');
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/Name/i).fill('Lead Capture Reviewer');
  await page.getByLabel(/Company/i).fill('EterSolis QA');
  await page.getByLabel(/^Email$/i).fill('review@example.com');
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/Message/i).fill('This is a non-confidential mocked partnership inquiry for lead capture acceptance testing.');
  await page.getByLabel(/I consent to EterSolis contacting me/i).check();
  await page.getByRole('button', { name: /Submit Inquiry/i }).click();
  await expect(page.getByRole('heading', { name: /Your inquiry has been routed for review/i })).toBeVisible();
  await expect(page.getByText(/Mock inquiry received/i)).toBeVisible();

  await page.unroute('**/api/leads');
  await page.route('**/api/leads', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Mock delivery failure.' })
    });
  });

  await page.goto('/contact#contact-form');
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/Name/i).fill('Lead Capture Reviewer');
  await page.getByLabel(/^Email$/i).fill('review@example.com');
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/Message/i).fill('This mocked inquiry verifies visible API failure handling.');
  await page.getByLabel(/I consent to EterSolis contacting me/i).check();
  await page.getByRole('button', { name: /Submit Inquiry/i }).click();
  await expect(page.getByText(/Mock delivery failure/i)).toBeVisible();
});

test('waste opportunity form submits through mocked lead capture route', async ({ page }) => {
  await page.route('**/api/waste', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, submissionId: 'waste-test-001', message: 'Mock waste opportunity received.' })
    });
  });

  await page.goto('/sell-waste#waste-form');
  await page.getByLabel(/Company name/i).fill('EterSolis Test Company');
  await page.getByLabel(/Contact name/i).fill('Waste Reviewer');
  await page.getByLabel(/^Email$/i).fill('waste-review@example.com');
  await page.getByLabel(/Country/i).fill('South Africa');
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/Material description/i).fill('Clean recoverable cardboard and plastic packaging from a controlled test stream.');
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/I consent to EterSolis contacting me about this submission/i).check();
  await page.getByRole('button', { name: /Submit Waste Opportunity/i }).click();
  await expect(page.getByRole('heading', { name: /Your opportunity is queued for controlled review/i })).toBeVisible();
  await expect(page.getByText(/Mock waste opportunity received/i)).toBeVisible();
});

test('KYMNIS public foundation and guided interest intake render', async ({ page }) => {
  await page.goto('/kymnis');
  await expect(page.getByRole('heading', { name: /Verified Truth\. Responsible Action\. Measurable Impact\./i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Register interest/i }).first()).toHaveAttribute('href', '/kymnis/contact');
  await page.goto('/kymnis/contact');
  await expect(page.getByRole('heading', { name: /Register non-confidential KYMNIS interest/i })).toBeVisible();
  await expect(page.getByLabel(/Topic/i)).toHaveValue('KYMNIS');
  await page.screenshot({ path: 'test-results/screenshots/kymnis-contact.png', fullPage: true });
});

test('insights publishes newsletter issue 001 with PDF and print routes', async ({ page }) => {
  await page.goto('/insights');
  await expect(page.getByRole('heading', { name: /Introducing EterSolis/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Read the issue/i })).toHaveAttribute('href', '/insights/introducing-etersolis');
  await expect(page.getByRole('link', { name: /View publication path/i })).toHaveAttribute('href', '/insights/technical-intelligence-brief');
  await page.goto('/insights/introducing-etersolis');
  await expect(page.getByRole('heading', { name: /Introducing EterSolis/i }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /The EterSolis Resource Hierarchy/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Download original PDF/i })).toHaveAttribute('href', '/media/newsletters/issue-001/etersolis-newsletter-issue-001.pdf');
  await expect(page.getByRole('link', { name: /Print view/i })).toHaveAttribute('href', '/insights/introducing-etersolis/print');
  await page.goto('/insights/technical-intelligence-brief');
  await expect(page.getByRole('heading', { name: /^Technical Intelligence Brief$/i })).toBeVisible();
  await expect(page.getByText(/PDF upload pending/i)).toBeVisible();
  await expect(page.getByText(/public\/media\/technical-intelligence-brief\/technical-intelligence-brief-001\.pdf/i)).toBeVisible();
});
