'use client';

import { RefObject, useCallback, useEffect, useState } from 'react';

type DraftSnapshot = Record<string, string | boolean>;
type DraftControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const excludedNames = new Set(['cf-turnstile-response', 'turnstileToken', 'consentToContact']);

function controlsFor(form: HTMLFormElement) {
  return Array.from(form.elements).filter((element): element is DraftControl => {
    return element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement;
  });
}

function readForm(form: HTMLFormElement) {
  return controlsFor(form).reduce<DraftSnapshot>((snapshot, control) => {
    if (!control.name || excludedNames.has(control.name)) return snapshot;
    if (control instanceof HTMLInputElement && control.type === 'checkbox') {
      snapshot[control.name] = control.checked;
    } else {
      snapshot[control.name] = control.value;
    }
    return snapshot;
  }, {});
}

function restoreForm(form: HTMLFormElement, snapshot: DraftSnapshot) {
  for (const control of controlsFor(form)) {
    if (!control.name || !(control.name in snapshot)) continue;
    const value = snapshot[control.name];
    if (control instanceof HTMLInputElement && control.type === 'checkbox') {
      control.checked = value === true;
    } else if (typeof value === 'string') {
      control.value = value;
    }
  }
}

export function useDraftedForm(storageKey: string, formRef: RefObject<HTMLFormElement>) {
  const [draft, setDraft] = useState<DraftSnapshot>({});

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    try {
      const stored = localStorage.getItem(storageKey);
      if (!stored) return;
      const snapshot = JSON.parse(stored) as DraftSnapshot;
      restoreForm(form, snapshot);
      setDraft(snapshot);
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, [formRef, storageKey]);

  const persistDraft = useCallback(() => {
    const form = formRef.current;
    if (!form) return;

    const snapshot = readForm(form);
    setDraft(snapshot);
    localStorage.setItem(storageKey, JSON.stringify(snapshot));
  }, [formRef, storageKey]);

  const clearDraft = useCallback(() => {
    setDraft({});
    localStorage.removeItem(storageKey);
  }, [storageKey]);

  const valueFor = useCallback((name: string) => {
    const value = draft[name];
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return value || 'Not provided';
  }, [draft]);

  return { clearDraft, draft, persistDraft, valueFor };
}
