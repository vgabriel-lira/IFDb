import { Component, input, numberAttribute, output } from '@angular/core';

@Component({
  selector: 'app-filme-card',
  standalone: true,
  imports: [],
  templateUrl: './filme-card.html',
  styles: []
})
export class FilmeCard {
  titulo = input.required<string>();
  genero = input('');
  ano = input(2026, { transform: numberAttribute });
  imagemUrl = input('');
  sinopse = input('');

  selected = output<void>();
  deleteRequested = output<void>();
}