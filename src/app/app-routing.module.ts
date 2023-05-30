import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzComponent } from './components/quizz/quizz.component';
import { QuizzListComponent } from './components/quizz-list/quizz-list.component';

const routes: Routes = [
  {
    path:'',
    component: QuizzListComponent
  },
  {
    path:'detail/:id',
    component: QuizzComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
