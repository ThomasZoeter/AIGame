import { Component, input } from '@angular/core';
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<svg viewBox="0 0 24 24" aria-hidden="true">
    <path [attr.d]="paths[name()] || paths['message']" />
  </svg>`,
  styles: [':host { display: inline-flex; align-items: center; justify-content: center; }'],
})
export class Icon {
  name = input('message');
  paths: Record<string, string> = {
    message: 'M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 3V6a2 2 0 0 1 2-2Z M7 9h10 M7 13h6',
    grid: 'M3 3h7v7H3Z M14 3h7v7h-7Z M3 14h7v7H3Z M14 14h7v7h-7Z',
    search: 'M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15 M16 16l5 5',
    plus: 'M12 5v14 M5 12h14',
    arrow: 'M5 12h14 M14 7l5 5-5 5',
    chevron: 'm9 5 7 7-7 7',
    down: 'm7 10 5 5 5-5',
    edit: 'm15 4 5 5 M4 20l5-1L21 7a2 2 0 0 0-4-4L5 15Z',
    trash: 'M3 6h18 M9 6V3h6v3 M5 6l1 15h12l1-15 M10 10v7 M14 10v7',
    close: 'm6 6 12 12 M6 18 18 6',
    check: 'm5 12 4 4L19 6',
    help: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M9.5 9a2.5 2.5 0 1 1 3 2.5L12 14 M12 17h.01',
    book: 'M12 5v15 M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1Z',
    leaf: 'M5 19C0 10 8 3 21 3c0 13-7 21-16 16Z M5 19l10-10',
    clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18 M12 7v5l3 2',
    download: 'M12 3v12 m-5-5 5 5 5-5 M4 16v5h16v-5',
    bolt: 'm13 2-9 12h7l-1 8 10-12h-7Z',
    sort: 'M8 4v16 m-4-4 4 4 4-4 M16 20V4 m-4 4 4-4 4 4',
  };
}
