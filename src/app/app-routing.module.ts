import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'members'
  },
  {
    path: 'members',
    pathMatch: 'full',
    component: MemberComponent
  },
  {
    path: 'member-form',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
    path: ':id/edit',
    pathMatch: 'full',
    component: MemberFormComponent
  },
  {
    path: '**',
    redirectTo: 'members'

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
