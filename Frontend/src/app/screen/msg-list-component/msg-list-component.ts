import { Component, ElementRef, HostListener, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../../backend/message';
import { MessageService } from '../../backend/MessageService';
import { Icon } from '../../icon';
import { DialogAccessibility } from '../../dialog-accessibility';
@Component({
  selector: 'message-list',
  standalone: true,
  imports: [FormsModule, Icon, DialogAccessibility],
  templateUrl: './msg-list-component.html',
  styleUrls: ['./msg-list-component.css'],
})
export class MessageListComponent implements OnInit {
  messages = signal<Message[]>([]);
  query = signal('');
  sort = signal('newest');
  page = signal(1);
  selected = signal<number[]>([]);
  loading = signal(true);
  busy = signal(false);
  local = signal(false);
  notice = signal('');
  error = signal('');
  dialog = signal<'create' | 'edit' | 'delete' | 'help' | null>(null);
  current: Message | null = null;
  draft = '';
  deleteIds: number[] = [];
  pageSize = 6;
  filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    return [...this.messages()]
      .filter((m) => m.message.toLowerCase().includes(q) || String(m.id).includes(q))
      .sort((a, b) =>
        this.sort() === 'oldest'
          ? a.id - b.id
          : this.sort() === 'alphabetical'
            ? a.message.localeCompare(b.message)
            : b.id - a.id,
      );
  });
  pageCount = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));
  visible = computed(() =>
    this.filtered().slice((this.page() - 1) * this.pageSize, this.page() * this.pageSize),
  );
  allSelected = computed(
    () => this.visible().length > 0 && this.visible().every((m) => this.selected().includes(m.id)),
  );
  characters = computed(() => this.messages().reduce((sum, m) => sum + m.message.length, 0));
  private storageKey = 'dispatch-local-messages-v1';
  constructor(
    private service: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private element: ElementRef<HTMLElement>,
  ) {}
  ngOnInit() {
    this.load(true);
  }
  @HostListener('document:keydown', ['$event'])
  searchShortcut(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    if (
      event.key === '/' &&
      !this.dialog() &&
      !['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
    ) {
      event.preventDefault();
      this.element.nativeElement.querySelector<HTMLInputElement>('.search input')?.focus();
    }
  }
  load(initial = false) {
    this.loading.set(true);
    this.service.findAll().subscribe({
      next: (data) => {
        this.messages.set(data);
        this.selected.update((ids) => ids.filter((id) => data.some((m) => m.id === id)));
        this.loading.set(false);
        this.page.set(Math.min(this.page(), this.pageCount()));
        if (initial) this.openRoute();
      },
      error: () => {
        if (!initial) {
          this.loading.set(false);
          this.toast('Could not refresh messages. Please reload to try again.');
          return;
        }
        this.local.set(true);
        try {
          const saved = localStorage.getItem(this.storageKey);
          const data = saved ? JSON.parse(saved) : this.examples();
          this.messages.set(
            Array.isArray(data) &&
              data.every((m) => typeof m.id === 'number' && typeof m.message === 'string')
              ? data
              : this.examples(),
          );
        } catch {
          this.messages.set(this.examples());
        }
        this.loading.set(false);
        this.openRoute();
      },
    });
  }
  private examples(): Message[] {
    return [
      {
        id: 1001,
        message: 'Welcome to your message workspace. A little space for your big ideas.',
      },
      { id: 1002, message: 'Keep it simple. Keep it thoughtful. Make every message count.' },
      { id: 1003, message: 'A quick reminder: good things start with a conversation.' },
      {
        id: 1004,
        message: 'The first draft is just the beginning. You can always come back and edit.',
      },
      {
        id: 1005,
        message: 'Your next great idea belongs here. Write it down before it slips away.',
      },
      { id: 1006, message: 'Small updates, big progress. One message at a time.' },
      { id: 1007, message: 'Here’s to a fresh start and a clearer workspace.' },
      { id: 1008, message: 'Hello, world! This is the start of something good.' },
    ];
  }
  private openRoute() {
    if (this.route.snapshot.routeConfig?.path === 'add-message') this.openCreate();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const m = this.messages().find((m) => m.id === id);
      if (m) this.openEdit(m);
      else this.toast('This message could not be found.');
    }
  }
  search(value: string) {
    this.query.set(value);
    this.page.set(1);
  }
  changeSort(value: string) {
    this.sort.set(value);
    this.page.set(1);
  }
  toggle(id: number) {
    this.selected.update((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }
  toggleAll() {
    const ids = this.visible().map((m) => m.id);
    const all = this.allSelected();
    this.selected.update((current) =>
      all ? current.filter((id) => !ids.includes(id)) : [...new Set([...current, ...ids])],
    );
  }
  openCreate() {
    this.current = null;
    this.draft = '';
    this.error.set('');
    this.dialog.set('create');
  }
  openEdit(m: Message) {
    this.current = m;
    this.draft = m.message;
    this.error.set('');
    this.dialog.set('edit');
  }
  openDelete(ids: number[]) {
    this.deleteIds = ids;
    this.error.set('');
    this.dialog.set('delete');
  }
  close() {
    if (this.busy()) return;
    this.dialog.set(null);
    this.error.set('');
    if (this.route.snapshot.routeConfig?.path !== 'showall') this.router.navigate(['/showall']);
  }
  save() {
    const content = this.draft.trim();
    if (!content || content.length > 4000 || this.busy()) return;
    this.busy.set(true);
    const editing = this.dialog() === 'edit';
    if (this.local()) {
      if (editing)
        this.messages.update((ms) =>
          ms.map((m) => (m.id === this.current?.id ? { ...m, message: content } : m)),
        );
      else
        this.messages.update((ms) => [
          ...ms,
          { id: Math.max(1000, ...ms.map((m) => m.id)) + 1, message: content },
        ]);
      const persisted = this.persist();
      this.finish(
        persisted
          ? editing
            ? 'Message updated'
            : 'Message created'
          : 'Saved for this session; browser storage is unavailable.',
      );
      return;
    }
    const request = editing
      ? this.service.updateMessage(this.current!.id, { ...this.current!, message: content })
      : this.service.save({ message: content } as Message);
    request.subscribe({
      next: () => {
        this.finish(editing ? 'Message updated' : 'Message created');
        this.load();
      },
      error: () => {
        this.busy.set(false);
        this.error.set('Could not save your message. Please try again.');
      },
    });
  }
  async remove() {
    if (this.busy()) return;
    this.busy.set(true);
    if (this.local()) {
      this.messages.update((ms) => ms.filter((m) => !this.deleteIds.includes(m.id)));
      this.persist();
      this.afterDelete();
      return;
    }
    try {
      for (const id of this.deleteIds)
        await new Promise<void>((resolve, reject) =>
          this.service.deleteMessage(id).subscribe({ next: () => resolve(), error: reject }),
        );
      this.afterDelete();
      this.load();
    } catch {
      this.busy.set(false);
      this.error.set('Some messages could not be deleted. Please try again.');
      this.load();
    }
  }
  private afterDelete() {
    this.selected.set([]);
    this.page.set(1);
    this.finish(this.deleteIds.length === 1 ? 'Message deleted' : 'Messages deleted');
  }
  private persist() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.messages()));
      return true;
    } catch {
      return false;
    }
  }
  private finish(message: string) {
    this.busy.set(false);
    this.close();
    this.page.set(1);
    this.toast(message);
  }
  toast(message: string) {
    this.notice.set(message);
    setTimeout(() => this.notice.set(''), 4500);
  }
  exportMessages() {
    const blob = new Blob([JSON.stringify(this.messages(), null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dispatch-messages.json';
    a.click();
    URL.revokeObjectURL(url);
    this.toast('Messages exported');
  }
  start() {
    return this.filtered().length ? (this.page() - 1) * this.pageSize + 1 : 0;
  }
  end() {
    return Math.min(this.page() * this.pageSize, this.filtered().length);
  }
}
