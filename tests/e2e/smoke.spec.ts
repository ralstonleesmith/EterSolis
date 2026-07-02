import { expect, test } from '@playwright/test';
import { mkdirSync } from 'node:fs';

test.beforeAll(() => {
  mkdirSync('test-results/screenshots', { recursive: true });
});

test('homepage renders media hero and dark mode', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Waste, Resource Recovery and Carbon Operations with Commercial Control/i })).toBeVisible();
  await expect(page.getByAltText(/clean modern materials recovery facility/i).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /Every service request becomes a trackable operational case/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /EterSolis routes materials through the right operational pathway/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Start Service Intake/i }).first()).toHaveAttribute('href', '/get-started');
  await page.getByLabel(/Switch to dark mode/i).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.screenshot({ path: 'test-results/screenshots/home-desktop.png', fullPage: false });
});

test('customer portal and admin case previews expose the controlled commercial lifecycle', async ({ page }) => {
  await page.goto('/portal');
  await expect(page.getByRole('heading', { name: /Every EterSolis case has a commercial and operational history/i })).toBeVisible();
  await expect(page.getByText(/ES-CASE-DEMO-0001/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /Quotations/i }).first()).toHaveAttribute('href', '/portal/quotations');
  await page.goto('/portal/invoices');
  await expect(page.getByRole('heading', { name: /Invoices/i })).toBeVisible();
  await expect(page.getByText(/Payment reference/i)).toBeVisible();
  await page.goto('/admin/cases/ES-CASE-DEMO-0001');
  await expect(page.getByRole('heading', { name: /ES-CASE-DEMO-0001/i })).toBeVisible();
  await expect(page.getByText(/Quotation/i).first()).toBeVisible();
  await expect(page.getByText(/Payment/i).first()).toBeVisible();
  await expect(page.getByText(/Certificate/i).first()).toBeVisible();
});

test('public positioning presents full EterSolis scope before wastewater specifics', async ({ page }) => {
  for (const route of ['/', '/solutions', '/industries', '/get-started', '/contact']) {
    await page.goto(route);
    const h1 = await page.locator('h1').first().innerText();
    expect(h1.toLowerCase()).not.toContain('wastewater');
    await expect(page.getByText(/resource recovery|carbon|circular|service|material/i).first()).toBeVisible();
  }
});

test('header uses logo as home and avoids duplicate home navigation', async ({ page }) => {
  await page.goto('/solutions');
  const header = page.getByRole('banner');
  const logoHome = header.getByRole('link', { name: /EterSolis home/i });
  await expect(logoHome).toHaveAttribute('href', '/');
  await expect(header.getByRole('navigation', { name: /Primary navigation/i }).getByRole('link', { name: /^Home$/i })).toHaveCount(0);
  await expect(header.getByRole('link', { name: /^Get Started$/i }).first()).toHaveAttribute('href', '/get-started');
  await logoHome.click();
  await expect(page).toHaveURL(/\/$/);
});

test('homepage primary and footer links resolve', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /^Get Started$/i }).first()).toHaveAttribute('href', '/get-started');
  await page.goto('/sell-waste');
  await expect(page).toHaveURL(/\/get-started$/);
  await expect(page.locator('#service-request')).toBeVisible();

  await page.goto('/');
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Media Credits' })).toHaveAttribute('href', '/media-credits');
  await expect(page.getByRole('contentinfo').getByRole('link', { name: 'Technical Intelligence Brief' })).toHaveAttribute('href', '/insights/technical-intelligence-brief');
  await page.goto('/media-credits', { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveURL(/\/media-credits$/);
  await expect(page.getByRole('heading', { name: /Professional visual assets with documented sources/i })).toBeVisible();
});

test('mobile navigation opens primary routes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menuButton = page.getByRole('button', { name: /Open navigation menu/i });
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  const mobileNavigation = page.getByRole('navigation', { name: /Mobile navigation/i });
  await expect(mobileNavigation).toBeVisible();
  const industriesLink = mobileNavigation.getByRole('link', { name: 'Industries' });
  await expect(industriesLink).toBeVisible();
  await expect(industriesLink).toHaveAttribute('href', '/industries');
  await expect(mobileNavigation.getByRole('link', { name: /^Home$/i })).toHaveCount(0);
  await page.goto('/industries');
  await expect(page).toHaveURL(/\/industries$/);
  await page.screenshot({ path: 'test-results/screenshots/home-mobile-nav.png', fullPage: true });
});

test('Ask Helios popout stays compact and routes safely', async ({ page }) => {
  await page.goto('/contact');
  await page.waitForLoadState('networkidle');
  const launcher = page.getByRole('button', { name: /^Ask Helios$/i });
  await expect(launcher).toBeVisible();
  await expect(launcher).toHaveAttribute('data-ready', 'true');
  await launcher.click();
  await expect(launcher).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('heading', { name: /Guided next-step routing/i })).toBeVisible({ timeout: 10000 });
  await expect(page.getByRole('button', { name: 'EterSolis' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'KYMNIS' }).click();
  await expect(page.getByText(/KYMNIS mode/i)).toBeVisible();
  await expect(page.getByRole('link', { name: /Open full Helios/i })).toHaveAttribute('href', '/helios');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('heading', { name: /Guided next-step routing/i })).toHaveCount(0);
});

test('get started stepper advances through service intake flow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/get-started');
  await expect(page.getByRole('heading', { name: /Get Started with EterSolis/i }).first()).toBeVisible();
  await page.getByLabel(/Request assessment/i).check();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/Industrial by-products/i).check();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/Material description/i).fill('Clean recoverable cardboard and plastic packaging from a controlled test stream.');
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/Company name/i).fill('EterSolis Test Company');
  await page.getByLabel(/Contact name/i).fill('Test Reviewer');
  await page.getByLabel(/^Email$/i).fill('review@example.com');
  await page.getByLabel(/Country/i).fill('South Africa');
  await page.getByLabel(/Site address/i).fill('Test site address');
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await expect(page.getByLabel(/Confidentiality level/i)).toBeVisible();
  await page.screenshot({ path: 'test-results/screenshots/get-started-stepper.png', fullPage: true });
});

test('contact stepper and Helios wizard route users', async ({ page }) => {
  await page.goto('/contact?topic=Wastewater%20Treatment#contact-form');
  await expect(page.getByLabel(/Topic/i)).toHaveValue('Wastewater Treatment');
  await page.getByLabel(/Topic/i).selectOption('Wastewater Treatment');
  await page.getByRole('button', { name: /Continue/i }).click();
  await expect(page.getByLabel(/Name/i)).toBeVisible();

  await page.goto('/helios');
  await expect(page.getByRole('button', { name: 'EterSolis' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Water', exact: true }).click();
  await page.getByRole('button', { name: /Wastewater treatment/i }).click();
  await expect(page.getByText(/What to prepare/i)).toBeVisible();
  await expect(page.getByText(/Helios cannot decide/i)).toBeVisible();
  await expect(page.getByRole('heading', { name: /Wastewater treatment/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Request wastewater assessment/i })).toHaveAttribute('href', '/contact?topic=Wastewater%20Treatment#contact-form');
  await page.getByRole('button', { name: 'KYMNIS' }).click();
  await expect(page.getByRole('button', { name: 'Verification', exact: true })).toBeVisible();
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
  await page.getByLabel(/Message/i).fill('This is a non-confidential mocked partnership inquiry for operational intake acceptance testing.');
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

test('service request form submits through mocked operational intake route', async ({ page }) => {
  await page.route('**/api/service-requests/submit', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        ok: true,
        publicReference: 'ES-SR-20260702-TEST01',
        statusUrl: '/status/mock-token',
        departmentLabel: 'Industrial by-products & process residues',
        commercialPathway: 'customer_paid_assessment',
        paymentStatus: 'manual_invoice_sent',
        nextAction: 'EterSolis will confirm payment or service instructions before material movement.',
        message: 'Mock service request received.'
      })
    });
  });

  await page.goto('/get-started');
  await page.getByLabel(/Request assessment/i).check();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/Industrial by-products/i).check();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/Material description/i).fill('Clean recoverable cardboard and plastic packaging from a controlled test stream.');
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/Company name/i).fill('EterSolis Test Company');
  await page.getByLabel(/Contact name/i).fill('Service Reviewer');
  await page.getByLabel(/^Email$/i).fill('service-review@example.com');
  await page.getByLabel(/Country/i).fill('South Africa');
  await page.getByLabel(/Site address/i).fill('Test site address');
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByLabel(/I consent to EterSolis contacting me about this service request/i).check();
  await page.getByRole('button', { name: /Continue/i }).click();
  await page.getByRole('button', { name: /Continue/i }).click();
  const submitButton = page.getByRole('button', { name: /Submit Service Request/i });
  if (await submitButton.isVisible().catch(() => false)) await submitButton.click();
  await expect(page.getByRole('heading', { name: /ES-SR-20260702-TEST01/i })).toBeVisible();
  await expect(page.getByText(/Mock service request received/i)).toBeVisible();
});

test('KYMNIS public foundation and guided interest intake render', async ({ page }) => {
  await page.goto('/kymnis');
  await expect(page.getByRole('heading', { name: /Verified Truth\. Responsible Action\. Measurable Impact\./i })).toBeVisible();
  await expect(page.getByRole('navigation', { name: /KYMNIS page sections/i }).getByRole('link', { name: 'App Experience' })).toHaveAttribute('href', '#app-experience');
  await expect(page.getByRole('heading', { name: /The next step should be obvious/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Show the problem\. Track the path\. Understand the outcome\./i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Review verification/i }).first()).toHaveAttribute('href', '/kymnis/verification');
  await expect(page.getByRole('link', { name: /Register interest/i }).first()).toHaveAttribute('href', '/kymnis/contact');
  await page.goto('/kymnis/contact');
  await expect(page.getByRole('heading', { name: /Register non-confidential KYMNIS interest/i })).toBeVisible();
  await expect(page.getByLabel(/Topic/i)).toHaveValue('KYMNIS');
  await page.screenshot({ path: 'test-results/screenshots/kymnis-contact.png', fullPage: true });
});

test('insights prioritizes the technical brief with readable and print routes', async ({ page }) => {
  await page.goto('/insights');
  const briefHeading = page.getByRole('heading', { name: /^CEPA Technical Intelligence Brief$/i }).first();
  const newsletterHeading = page.getByRole('heading', { name: /Introducing EterSolis/i }).first();
  await expect(briefHeading).toBeVisible();
  await expect(page.getByRole('heading', { name: /Introducing EterSolis/i })).toBeVisible();
  const briefBox = await briefHeading.boundingBox();
  const newsletterBox = await newsletterHeading.boundingBox();
  expect(briefBox?.y ?? 0).toBeLessThan(newsletterBox?.y ?? 0);
  await expect(page.getByRole('link', { name: /^Read brief/i }).first()).toHaveAttribute('href', '/insights/technical-intelligence-brief');
  await expect(page.getByRole('link', { name: /^Print view/i }).first()).toHaveAttribute('href', '/insights/technical-intelligence-brief/print');
  await expect(page.getByRole('link', { name: /^Download PDF/i }).first()).toHaveAttribute('href', '/media/technical-intelligence-brief/cepa-technical-intelligence-brief-color-chemicals-issue-001-2026-07-05.pdf');
  await expect(page.locator('img[src*="cepa-horizontal-logo"]')).toHaveCount(0);
  await expect(page.locator('img[src*="cepa-technical-intelligence-brief-color-chemicals-issue-001-2026-07-05-cover.png"]').first()).toBeVisible();
  await expect(page.locator('img[src*="cepa-technical-intelligence-brief-main-hero-logo.png"]').first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Read the issue/i })).toHaveAttribute('href', '/insights/introducing-etersolis');
  await expect(page.getByText(/Flagship publication .* Color & Chemicals Industry Edition .* Issue 001/i)).toBeVisible();

  await page.goto('/insights/introducing-etersolis');
  await expect(page.getByRole('heading', { name: /Introducing EterSolis/i }).first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /The EterSolis Resource Hierarchy/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Download original PDF/i })).toHaveAttribute('href', '/media/newsletters/issue-001/etersolis-newsletter-issue-001.pdf');
  await expect(page.getByRole('link', { name: /Print view/i })).toHaveAttribute('href', '/insights/introducing-etersolis/print');
  await page.goto('/insights/technical-intelligence-brief');
  await expect(page.getByRole('heading', { name: /^CEPA Technical Intelligence Brief$/i })).toBeVisible();
  await expect(page.getByText('Color & Chemicals Industry Edition', { exact: true })).toBeVisible();
  await expect(page.getByText('CEPA-TIB-COLCHEM-001-20260705', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Read on this page/i })).toHaveAttribute('href', '#brief-reader');
  await expect(page.locator('object[aria-label="CEPA Technical Intelligence Brief PDF reader"]')).toHaveCount(0);
  await expect(page.getByRole('region', { name: /manual page reader/i })).toBeVisible();
  await expect(page.getByText(/Page 1 of 40/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /Next page/i })).toBeDisabled();
  await expect(page.getByRole('button', { name: /Previous page/i })).toBeDisabled();
  await expect(page.locator('img[src*="cepa-technical-intelligence-brief-color-chemicals-issue-001-2026-07-05.png"]').first()).toBeVisible();
  await expect(page.locator('section').first().locator('img[src*="cepa-stamp-logo"]')).toHaveCount(1);
  await expect(page.locator('section').first().locator('img[alt="CEPA logo mark"]')).toBeVisible();
  await expect(page.locator('img[src*="cepa-horizontal-logo"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /^Print view/i }).first()).toHaveAttribute('href', '/insights/technical-intelligence-brief/print');
  await expect(page.getByRole('link', { name: /^Download PDF/i }).first()).toHaveAttribute('href', '/media/technical-intelligence-brief/cepa-technical-intelligence-brief-color-chemicals-issue-001-2026-07-05.pdf');

  await page.goto('/insights/technical-intelligence-brief/print');
  await expect(page.getByRole('heading', { name: /^CEPA Technical Intelligence Brief$/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Print brief/i })).toBeVisible();
  await expect(page.locator('img[src*="cepa-technical-intelligence-brief-color-chemicals-issue-001-2026-07-05.png"]').first()).toBeVisible();
  await expect(page.locator('img[src*="cepa-horizontal-logo"]')).toHaveCount(0);
  await expect(page.locator('main').getByText(/PDF upload pending|SOP|developer|stored at|file path|draft/i)).toHaveCount(0);

  await page.goto('/media-credits');
  await expect(page.locator('img[src*="cepa-horizontal-logo"]')).toHaveCount(0);
});
