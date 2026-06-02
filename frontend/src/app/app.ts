import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component of the ReqTrace frontend application.
 * Provides the main application layout and routing outlet.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  /**
   * Application title displayed in the UI.
   * @readonly
   */
  protected readonly title = signal('reqtrace-frontend');
}
