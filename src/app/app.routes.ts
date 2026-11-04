import { Routes } from '@angular/router';
import { ContainerCards } from './components/container-cards/container-cards';
import { Login } from './components/login/login';
import { FilmeForm } from './components/filme-form/filme-form';
import { FilmeDetail } from './components/filme-detail/filme-detail';

export const routes: Routes = [
  { path: '', component: ContainerCards },
  { path: 'login', component: Login },
  { path: 'novo-filme', component: FilmeForm },
  { path: 'filme/:id', component: FilmeDetail },
  { path: '**', redirectTo: '' }
];