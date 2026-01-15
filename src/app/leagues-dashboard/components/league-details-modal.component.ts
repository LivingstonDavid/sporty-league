import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { League, BadgeState } from '../../core/models/league.model';

@Component({
    selector: 'app-league-details-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="overlay" (click)="closeModal.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">

        <div class="modal-header">
          <h2>{{ league().strLeague }}</h2>
          <button class="close-btn" type="button" (click)="closeModal.emit()">×</button>
        </div>

        <div class="modal-body">
          <div class="image-wrapper">

            @if (badgeState(); as state) {
              @switch (state.status) {
                @case ('LOADING') {
                  <div class="status-msg">
                    <div class="spinner"></div>
                    Loading Season Data...
                  </div>
                }

                @case ('ERROR') {
                  <div class="status-msg error">
                    ⚠️ <br /> Image Not Available
                  </div>
                }

                @case ('SUCCESS') {
                  <img
                    [src]="state.data.strBadge"
                    alt="League Badge"
                    class="badge-img fade-in">
                }
              }
            } @else {
              <div class="status-msg">
                Select a league to view details.
              </div>
            }

          </div>

          <div class="info-container">
            <span class="tag">{{ league().strSport }}</span>

            @if (badgeState(); as state) {
              @if (state.status === 'SUCCESS') {
                <p class="season-info"><strong>Season:</strong> {{ state.data.strSeason }}</p>
              }
            }
          </div>
        </div>

      </div>
    </div>
  `,
    styles: [`
    .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; animation: fadeIn 0.2s; }
    .modal-content { background: white; width: 90%; max-width: 450px; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.2); animation: slideUp 0.3s; }
    .modal-header { background: var(--secondary-dark, #1d2d3d); color: white; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
    .modal-header h2 { margin: 0; font-size: 1.4rem; }
    .close-btn { background: none; border: none; color: white; font-size: 2rem; cursor: pointer; }
    .modal-body { padding: 30px; text-align: center; }
    .image-wrapper { height: 200px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 8px; margin-bottom: 20px; }
    .badge-img { max-height: 180px; max-width: 100%; object-fit: contain; }
    .status-msg { color: #666; font-weight: 500; }
    .status-msg.error { color: #d9534f; }
    .tag { background: var(--accent-color, #00d4ff); color: #000; padding: 5px 15px; border-radius: 15px; font-weight: bold; }
    .season-info { margin-top: 15px; font-size: 1.1rem; color: #444; }
    .spinner { border: 4px solid #f3f3f3; border-top: 4px solid var(--accent-color); border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto 10px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes slideUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .fade-in { animation: fadeIn 0.5s ease-in; }
  `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueDetailsModalComponent {
    league = input.required<League>();
    badgeState = input.required<BadgeState | null>();
    closeModal = output<void>();
}
