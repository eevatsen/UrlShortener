import { Routes } from '@angular/router';
import { TableComponent } from './table/table';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { AboutComponent } from './about/about';

export const routes: Routes = [
    {
        path: '', component: TableComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'about', component: AboutComponent
    }
];
