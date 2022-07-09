import { Routes } from "@angular/router";
import {
    CreateEventComponent,
    EventDetailsComponent,
    EventListResolver,
    EventResolver,
    EventsListComponent
} from './events/index'
import { Error404Component } from "./error/404.component";
import { CreateSessionComponent } from "./events/event-details/create-session.component";


export const appRoutes:Routes = [
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver } },
    { path: 'events/:id', component: EventDetailsComponent, resolve: { event: EventResolver } },
    { path: '404', component: Error404Component },
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: '', redirectTo:'/events', pathMatch: 'full' },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module')
            .then(m => m.UserModule)
    }
]