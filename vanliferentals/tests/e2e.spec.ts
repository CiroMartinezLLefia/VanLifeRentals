import { test, expect } from '@playwright/test';

test.describe('IA6 Smoke / UC tests (API-level)', () => {
  test('UC-01 - Listar models (GET /api/models)', async ({ request }) => {
    const res = await request.get('/api/models');
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });

  test('UC-02 - Detall model i comentaris (GET /api/models/:id, /comments)', async ({ request }) => {
    const res = await request.get('/api/models');
    expect(res.ok()).toBeTruthy();
    const models = await res.json();
    const first = models[0];
    expect(first).toBeTruthy();
    const idOrSlug = first.slug || first.id;

    const detail = await request.get(`/api/models/${idOrSlug}`);
    expect(detail.ok()).toBeTruthy();

    const comments = await request.get(`/api/models/${idOrSlug}/comments`);
    expect(comments.ok()).toBeTruthy();
    const c = await comments.json();
    expect(Array.isArray(c)).toBeTruthy();
  });

  test('UC-03 - Enviar formulari de contacte (POST /api/contact)', async ({ request }) => {
    const payload = {
      fullName: 'Playwright Test',
      email: 'playwright@example.test',
      message: 'Solicitud de información de prueba desde E2E',
    };
    const res = await request.post('/api/contact', { data: payload });
    expect(res.status()).toBeGreaterThanOrEqual(200);
    expect(res.status()).toBeLessThan(300);
  });

  test('UC-07 - Bloqueig publicació comentari sense autenticar (POST /api/models/:id/comments)', async ({ request }) => {
    const res = await request.get('/api/models');
    expect(res.ok()).toBeTruthy();
    const models = await res.json();
    const idOrSlug = models[0].slug || models[0].id;

    const post = await request.post(`/api/models/${idOrSlug}/comments`, { data: { content: 'Prova no autenticada' } });
    // Esperem error d'autenticació o accés denegat
    expect(post.status()).toBeGreaterThanOrEqual(400);
  });
});
