/*import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` Welcome to Angular! `,
})
export class App {}*/

/*

import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` Hello `,
  styles: `
    :host {
      color: blue;
    }
  `,
})
export class App {} */



/**import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` Hello `,
})
export class App {} */


/** import {Component} from '@angular/core';

@Component({
  selector: 'app-user',
  template: ` Username: {{ username }} `,
})
export class User {
  username = 'youngTech';
}

@Component({
  selector: 'app-root',
  template: ``,
  imports: [],
})
export class App {}*/

/**import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <span>Yes, the server is running</span> `,
})
export class App {
}
 */

/**import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: ``,
})
export class App {}
 */


/**import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.css'],
  template: ` <div contentEditable="false"></div> `,
})
export class App {} */


/**import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <section>
      There's a secret message for you, hover to reveal 👀
      {{ message }}
    </section>
  `,
})
export class App {
  message = '';

  showSecretMessage() {}
} */


/** import {Component} from '@angular/core';
import {User} from './user';

@Component({
  selector: 'app-root',
  template: ` <app-user /> `,
  imports: [User],
})
export class App {}*/


/**import {Component} from '@angular/core';
import {Child} from './child';

@Component({
  selector: 'app-root',
  template: `
    <app-child />
    <p>🐢 all the way down {{ items.length }}</p>
  `,
  imports: [Child],
})
export class App {
  items = new Array();

  addItem(item: string) {
    this.items.push(item);
  }
} */


/**import {Component} from '@angular/core';
import {Comments} from './comments';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>How I feel about Angular</h1>
      <article></article>
      <comments />
    </div>
  `,
  imports: [Comments],
})
export class App {}*/


/**import {Component} from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <p>Username: {{ username }}</p>
    <p>Preferred Framework:</p>
    <ul>
      <li>
        Static Image:
        <img src="/logo.svg" alt="Angular logo" />
      </li>
      <li>
        Dynamic Image:
        <img [src]="logoUrl" [alt]="logoAlt" />
      </li>
    </ul>
  `,
  imports: [],
})
export class User {
  logoUrl = '/logo.svg';
  logoAlt = 'Angular logo';
  username = 'youngTech';
}*/


/**import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a href="/">Home</a>
      |
      <a href="/user">User</a>
    </nav>
    <router-outlet />
  `,
  imports: [RouterOutlet],
})
export class App {}*/


/**import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form>
      <label>
        Name
        <input type="text" formControlName="name" />
      </label>
      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [],
})
export class App {}*/


/**import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="profileForm">
      <input type="text" formControlName="name" name="name" />
      <input type="email" formControlName="email" name="email" />
      <button type="submit">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class App {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });
}*/


/**import {Component} from '@angular/core';
import {DecimalPipe, DatePipe, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li>Number with "decimal" {{ num }}</li>
      <li>Date with "date" {{ birthday }}</li>
      <li>Currency with "currency" {{ cost }}</li>
    </ul>
  `,
  imports: [DecimalPipe, DatePipe, CurrencyPipe],
})
export class App {
  num = 103.1234;
  birthday = new Date(2023, 3, 2);
  cost = 4560.34;
}*/


//Learn signals
/**import {Component, signal, computed} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  count = signal(0);

  isEven = computed(() => this.count() % 2 === 0);

  increment() {
    this.count.set(this.count() + 1);
  }

  decrement() {
    this.count.set(this.count() - 1);
  }
}*/





/**import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="user-profile">
      <h1>User Dashboard</h1>
      <!-- TODO: Update class binding and display userStatus() -->
      <div class="status-indicator offline">
        <span class="status-dot"></span>
        Status: ???
      </div>

      <div class="status-controls">
        <!-- TODO: Add (click) and [disabled] bindings -->
        <button>Go Online</button>
        <button>Go Offline</button>
        <button class="toggle-btn">Toggle Status</button>
      </div>
    </div>
  `,
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // TODO: Create a userStatus signal with type 'online' | 'offline' and the initial value of 'offline'
  // TODO: Add goOnline() method using set()
  // TODO: Add goOffline() method using set()
  // TODO: Add toggleStatus() method using update()
}*/



/* TODO: Import effect from @angular/core
import {Component, signal, computed, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div [class]="themeClass()">
      <h2>Theme Manager with Effects</h2>

      <div class="controls">
        <button (click)="toggleTheme()">
          Switch to
          @if (theme() === 'light') {
            Dark
          } @else {
            Light
          }
          Theme
        </button>

        @if (!isLoggedIn()) {
          <button (click)="login()">Login</button>
        } @else {
          <button (click)="logout()">Logout</button>
        }
      </div>

      <div class="info">
        <p>Current theme: {{ theme() }}</p>
        <p>User: {{ username() }}</p>
        <p>
          Status:
          @if (isLoggedIn()) {
            Logged in
          } @else {
            Logged out
          }
        </p>
      </div>

      <div class="demo">
        <p>Open the browser console to see the effects in action!</p>
        <p>Effects will automatically:</p>
        <ul>
          <li>Save theme to localStorage</li>
          <li>Log user activity changes</li>
          <li>Run a timer every 5 seconds</li>
        </ul>
      </div>
    </div>
  `,
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  theme = signal<'light' | 'dark'>('light');
  username = signal('Guest');
  isLoggedIn = signal(false);

  themeClass = computed(() => `theme-${this.theme()}`);

  constructor() {
    
  }

  toggleTheme() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
  }

  login() {
    this.username.set('John Doe');
    this.isLoggedIn.set(true);
  }

  logout() {
    this.username.set('Guest');
    this.isLoggedIn.set(false);
  }
} */



 /**import {Component, signal, computed, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div [class]="themeClass()">
      <h2>Theme Manager with Effects</h2>

      <div class="controls">
        <button (click)="toggleTheme()">
          Switch to
          @if (theme() === 'light') {
            Dark
          } @else {
            Light
          }
          Theme
        </button>

        @if (!isLoggedIn()) {
          <button (click)="login()">Login</button>
        } @else {
          <button (click)="logout()">Logout</button>
        }
      </div>

      <div class="info">
        <p>Current theme: {{ theme() }}</p>
        <p>User: {{ username() }}</p>
        <p>
          Status:
          @if (isLoggedIn()) {
            Logged in
          } @else {
            Logged out
          }
        </p>
      </div>

      <div class="demo">
        <p>Open the browser console to see the effects in action!</p>
        <p>Effects will automatically:</p>
        <ul>
          <li>Save theme to localStorage</li>
          <li>Log user activity changes</li>
          <li>Run a timer every 5 seconds</li>
        </ul>
      </div>
    </div>
  `,
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  theme = signal<'light' | 'dark'>('light');
  username = signal('Guest');
  isLoggedIn = signal(false);

  themeClass = computed(() => `theme-${this.theme()}`);

  constructor() {
    // TODO: Create effect to save theme to localStorage
    // Use localStorage.setItem('theme', this.theme()) and console.log
    // TODO: Create effect to log user activity changes
    // Read both isLoggedIn() and username() signals and console.log the status
    // TODO: Create effect with cleanup for timer
    // Use setInterval to log every 5 seconds, and onCleanup to clear the interval
  }

  toggleTheme() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
  }

  login() {
    this.username.set('John Doe');
    this.isLoggedIn.set(true);
  }

  logout() {
    this.username.set('Guest');
    this.isLoggedIn.set(false);
  }
} */ 


/**import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` Welcome to Angular! `,
})
export class App {} */


/**import {Component} from '@angular/core';
import {ArticleComments} from './article-comments';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>How I feel about Angular</h1>
      <article>
        <p>
          Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
          feature that makes defer loading content the easiest and most ergonomic it could possibly
          be.
        </p>
      </article>

      <article-comments />
    </div>
  `,
  imports: [ArticleComments],
})
export class App {} */


/**import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
// TODO: Import FormField directive from @angular/forms/signals
import {form} from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  // TODO: Add FormField to imports array
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  loginForm = form(this.loginModel);
}
*/


/**import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {email, form, FormField, required} from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, {message: 'Email is required'});
    email(fieldPath.email, {message: 'Enter a valid email address'});
    required(fieldPath.password, {message: 'Password is required'});
  });
}
*/



/**import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
// TODO: Import submit function
import {email, form, FormField, required} from '@angular/forms/signals';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  loginModel = signal<LoginData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, {message: 'Email is required'});
    email(fieldPath.email, {message: 'Enter a valid email address'});
    required(fieldPath.password, {message: 'Password is required'});
  });

  // TODO: Add onSubmit method
  // TODO: Use event.preventDefault()
  // TODO: Call submit() with loginForm and async callback
  // TODO: Access form values with this.loginModel()
}
 */