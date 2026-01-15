import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-league-filters',
  standalone: true,
  template: `
    <div class="filter-container">
      <div class="input-group">
        <input
          #searchBox
          type="text"
          [placeholder]="placeholder"
          (input)="onSearch(searchBox.value)"
        />
      </div>

      <div class="select-wrapper">
        <select #sportSelect (change)="onFilter(sportSelect.value)">
          <option value="All">All Sports</option>
          @for (sport of sports(); track sport) {
            <option [value]="sport">{{ sport }}</option>
          }
        </select>
      </div>
    </div>
  `,
  styles: [`
    .filter-container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 30px; display: flex; gap: 15px; align-items: center; flex-wrap: wrap; }
    .input-group { flex: 2; display: flex; align-items: center; border: 1px solid #ddd; border-radius: 6px; padding: 8px 12px; background: #f9f9f9; }
    .input-group input { border: none; background: transparent; outline: none; width: 100%; margin-left: 8px; font-size: 1rem; }
    .select-wrapper { flex: 1; min-width: 200px; }
    select { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ddd; font-size: 1rem; cursor: pointer; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueFiltersComponent {
  placeholder = 'Search for a league...';
  sports = input.required<string[]>();
  searchChange = output<string>();
  sportChange = output<string>();

  onSearch(val: string) { this.searchChange.emit(val); }
  onFilter(val: string) { this.sportChange.emit(val); }
}
