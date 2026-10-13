import '@angular/compiler';
import { ElementRef } from '@angular/core';
import { of, throwError } from 'rxjs';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { MessageListComponent } from './msg-list-component';

describe('message workspace', () => {
  let app: MessageListComponent;
  let service: any;
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    service = {
      findAll: vi.fn(() =>
        of([
          { id: 1, message: 'First thought' },
          { id: 2, message: 'Another idea' },
        ]),
      ),
      save: vi.fn(() => of(null)),
      updateMessage: vi.fn(() => of(null)),
      deleteMessage: vi.fn(() => of(null)),
    };
    const route: any = {
      snapshot: { routeConfig: { path: 'showall' }, paramMap: { get: () => null } },
    };
    app = new MessageListComponent(
      service,
      route,
      { navigate: vi.fn() } as any,
      new ElementRef(document.createElement('div')),
    );
  });
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('loads server messages and searches by content or ID', () => {
    app.ngOnInit();
    expect(app.local()).toBe(false);
    app.search('IDEA');
    expect(app.filtered().map((m) => m.id)).toEqual([2]);
    app.search('1');
    expect(app.filtered().map((m) => m.id)).toEqual([1]);
    app.search('missing');
    expect(app.filtered()).toEqual([]);
    expect(app.start()).toBe(0);
  });
  it('creates, edits and deletes local messages and persists changes', async () => {
    service.findAll.mockReturnValue(throwError(() => new Error('offline')));
    app.ngOnInit();
    expect(app.local()).toBe(true);
    app.openCreate();
    app.draft = '  A test thought  ';
    app.save();
    const created = app.messages().find((m) => m.message === 'A test thought')!;
    expect(created).toBeDefined();
    expect(app.dialog()).toBe(null);
    app.openEdit(created);
    app.draft = 'A refined thought';
    app.save();
    expect(app.messages().find((m) => m.id === created.id)?.message).toBe('A refined thought');
    app.openDelete([created.id]);
    await app.remove();
    expect(app.messages().some((m) => m.id === created.id)).toBe(false);
    expect(JSON.parse(localStorage.getItem('dispatch-local-messages-v1')!)).toEqual(app.messages());
  });
  it('uses server endpoints and retains the draft on failed writes', () => {
    app.ngOnInit();
    app.openCreate();
    app.draft = 'Server thought';
    app.save();
    expect(service.save).toHaveBeenCalledWith({ message: 'Server thought' });
    const original = app.messages()[0];
    app.openEdit(original);
    app.draft = 'Changed';
    service.updateMessage.mockReturnValue(throwError(() => new Error('unavailable')));
    app.save();
    expect(app.dialog()).toBe('edit');
    expect(app.draft).toBe('Changed');
    expect(app.busy()).toBe(false);
    expect(app.error()).toContain('Could not save');
    expect(app.messages()[0].message).toBe(original.message);
  });
  it('keeps server data after a failed refresh rather than switching to samples', () => {
    app.ngOnInit();
    service.findAll.mockReturnValue(throwError(() => new Error('offline')));
    app.load();
    expect(app.local()).toBe(false);
    expect(app.messages()).toHaveLength(2);
    expect(app.notice()).toContain('Could not refresh');
  });
  it('selects only visible messages and resets pagination when filtering', () => {
    app.messages.set(
      Array.from({ length: 8 }, (_, i) => ({ id: i + 1, message: `Message ${i + 1}` })),
    );
    app.toggleAll();
    expect(app.selected()).toHaveLength(6);
    expect(app.allSelected()).toBe(true);
    app.toggleAll();
    expect(app.selected()).toEqual([]);
    app.page.set(2);
    expect(app.visible()).toHaveLength(2);
    app.search('Message 1');
    expect(app.page()).toBe(1);
    expect(app.visible()).toHaveLength(1);
    app.search('');
    app.changeSort('oldest');
    expect(app.visible()[0].id).toBe(1);
  });
});
