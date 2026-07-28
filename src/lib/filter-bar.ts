/**
 * Client-side wiring for <FilterBar />.
 *
 * Two shapes are needed across the site, so the caller supplies the predicate:
 * the detection library is single-select, the category index is multi-select
 * (platforms OR together, then AND with the has-code / has-detections flags).
 */

export interface FilterBarOptions {
  /** the `name` given to <FilterBar /> */
  name: string;
  /** selector for the items this bar filters */
  itemSelector: string;
  /** true when the item should stay visible for the given active filter ids */
  match: (item: HTMLElement, active: Set<string>) => boolean;
  /** false for single-select bars, where clicking a pill replaces the selection */
  multi?: boolean;
  /** builds the count label, e.g. n => `${n} rules` */
  countLabel: (shown: number) => string;
  /** optional element to reveal when nothing matches */
  emptySelector?: string;
}

export function initFilterBar(options: FilterBarOptions): void {
  const bar = document.querySelector<HTMLElement>(`[data-filter-bar="${options.name}"]`);
  if (!bar) return;

  const items = [...document.querySelectorAll<HTMLElement>(options.itemSelector)];
  const buttons = [...bar.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const count = bar.querySelector<HTMLElement>('[data-filter-count]');
  const empty = options.emptySelector
    ? document.querySelector<HTMLElement>(options.emptySelector)
    : null;

  const active = new Set<string>(['all']);

  const apply = () => {
    let shown = 0;
    items.forEach((item) => {
      const ok = active.has('all') || options.match(item, active);
      item.hidden = !ok;
      if (ok) shown++;
    });

    buttons.forEach((b) => b.setAttribute('aria-pressed', String(active.has(b.dataset.filter!))));
    if (count) count.textContent = options.countLabel(shown);
    if (empty) empty.hidden = shown !== 0 || items.length === 0;
  };

  bar.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]');
    if (!btn) return;
    const id = btn.dataset.filter!;

    if (id === 'all' || !options.multi) {
      active.clear();
      active.add(id);
    } else {
      active.delete('all');
      if (active.has(id)) active.delete(id);
      else active.add(id);
      if (active.size === 0) active.add('all');
    }
    apply();
  });

  apply();
}
