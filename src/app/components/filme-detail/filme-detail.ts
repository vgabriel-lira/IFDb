import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Database } from '../../services/database';
import { Filme } from '../../models/filme';

@Component({
  selector: 'app-filme-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './filme-detail.html'
})
export class FilmeDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public database = inject(Database);

  public filme = signal<Filme | undefined>(undefined);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const f = this.database.filmes().find((item) => item.id === id);
      this.filme.set(f);
    }
  }

  removerFilme(id: number): void {
    if (confirm('Deseja eliminar este filme do banco de dados no Supabase?')) {
      this.database.deleteFilmeSupabase(id);
      this.router.navigate(['/']);
    }
  }
}