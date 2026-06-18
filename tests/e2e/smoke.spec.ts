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
  await page.getByLabel(/Toggle light and dark mode/i).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.screenshot({ path: 'test-results/screenshots/home-desktop.png', fullPage: false });
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
  await page.goto('/contact');
  await page.getByLabel(/Topic/i).selectOption('Wastewater Treatment');
  await page.getByRole('button', { name: /Continue/i }).click();
  await expect(page.getByLabel(/Name/i)).toBeVisible();

  await page.goto('/helios');
  await page.getByRole('button', { name: /Wastewater treatment/i }).click();
  await expect(page.getByRole('heading', { name: /Wastewater treatment/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Request wastewater assessment/i })).toHaveAttribute('href', '/contact#contact-form');
  await page.screenshot({ path: 'test-results/screenshots/helios-wizard.png', fullPage: true });
});

test('insights publishes newsletter issue 001 with PDF and print routes', async ({ page }) => {
  await page.goto('/insights');
  await expect(page.getByRole('heading', { name: /Introducing EterSolis/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Read the issue/i })).toHaveAttribute('href', '/insights/introducing-etersolis');
  await page.goto('/insights/introducing-etersolis');
  await expect(page.getByRole('heading', { name: /Introducing EterSolis/i }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /The EterSolis Resource Hierarchy/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Download original PDF/i })).toHaveAttribute('href', '/media/newsletters/issue-001/etersolis-newsletter-issue-001.pdf');
  await expect(page.getByRole('link', { name: /Print view/i })).toHaveAttribute('href', '/insights/introducing-etersolis/print');
});
