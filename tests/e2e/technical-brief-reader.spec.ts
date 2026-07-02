import { expect, test } from '@playwright/test';

test('technical brief reader is manual and does not auto-advance', async ({ page }) => {
  await page.goto('/insights/technical-intelligence-brief#brief-reader');
  const reader = page.getByRole('region', { name: /manual page reader/i });
  await expect(reader).toBeVisible();
  await expect(page.getByText(/Page 1 of 40/i)).toBeVisible();
  await expect(page.getByLabel(/Current page/i)).toHaveValue('1');
  await page.waitForTimeout(1200);
  await expect(page.getByLabel(/Current page/i)).toHaveValue('1');
});

test('technical brief reader exposes arrow and keyboard controls', async ({ page }) => {
  await page.goto('/insights/technical-intelligence-brief#brief-reader');
  const reader = page.getByRole('region', { name: /manual page reader/i });
  await reader.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByLabel(/Current page/i)).toHaveValue('1');
  await expect(page.getByRole('button', { name: /Previous page/i })).toBeDisabled();
  await expect(page.getByRole('button', { name: /Next page/i })).toBeDisabled();
});
