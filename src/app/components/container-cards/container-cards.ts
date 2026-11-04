import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Database } from '../../services/database';

@Component({
  selector: 'app-container-cards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './container-cards.html'
})
export class ContainerCards {
  public database = inject(Database);

  // Controle do Menu Sanduíche Overlay
  public menuAberto = signal<boolean>(false);

  // Hero Principal
  public heroAtual = {
    titulo: "'Dune: Part Three'",
    subtitulo: "Watch the Final Trailer",
    tempo: "2:40",
    likes: 187,
    coracoes: 182,
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
    thumbPoster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80"
  };

  public aSeguir = [
    { titulo: "'Jumanji: Open World'", sub: "Watch the Trailer", tempo: "2:50", likes: 105, coracoes: 86, thumb: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=300&q=80" },
    { titulo: "Who Does Horror Quite Like Mike Flanagan?", sub: "Watch How, Watch Now", tempo: "1:34", likes: 88, coracoes: 64, thumb: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=300&q=80" },
    { titulo: "Sauron Is Coming", sub: "Watch 'LOTR: The Rings of Power'", tempo: "2:02", likes: 414, coracoes: 226, thumb: "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=300&q=80" }
  ];

  // Seção "Em Destaque Hoje"
  public emDestaque = [
    { tipo: 'Fotos', titulo: 'Remembering Patrick Stewart (1940-2026)', sub: 'See the gallery', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' },
    { tipo: 'Lista', titulo: 'Halloween Horrors to Stream Tonight', sub: 'Get your treat', img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80' }
  ];

  // Top 10 no IMDb esta semana
  public top10 = [
    { rank: '#1', titulo: 'Tudo Pode Ser Visto', nota: '9,2', desc: 'Trinta e quatro dias antes de ser presa, Elizabeth Holmes...', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { rank: '#2', titulo: 'Cara-de-Barro', nota: '7,5', desc: 'Estrela de Hollywood em ascensão transforma-se em uma criatura...', img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80' },
    { rank: '#3', titulo: 'Carrie: A Estranha', nota: '7,9', desc: 'Uma garota protegida com poderes telecinéticos sofre bullying...', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
    { rank: '#4', titulo: 'Crystal Lake', nota: '8,1', desc: 'Nova série de terror original.', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80' },
    { rank: '#5', titulo: 'VisionQuest', nota: '7,4', desc: 'Série do universo Marvel.', img: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=400&q=80' },
    { rank: '#6', titulo: 'O Bosque Selvagem', nota: '8,7', desc: 'Aventura épica na floresta.', img: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=400&q=80' }
  ];

  // Bilheterias
  public bilheterias = [
    { titulo: 'Cara-de-Barro', valor: '$24 mi', pct: '100%' },
    { titulo: 'Tudo Pode Ser Visto', valor: '$19,5 mi', pct: '81%' },
    { titulo: 'O Bosque Selvagem', valor: '$12,3 mi', pct: '51%' },
    { titulo: 'Street Fighter', valor: '$8,6 mi', pct: '35%' },
    { titulo: 'A Pescadora Solitária', valor: '$5,7 mi', pct: '23%' }
  ];

  public atores = [
    { nome: 'Bahar Soomekh', pos: 46, delta: 11947, foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    { nome: 'Richard Riehle', pos: 5, delta: 4952, foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
    { nome: 'Tom Skerritt', pos: 1, delta: 1459, foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
    { nome: 'Summer H. Howell', pos: 2, delta: 0, foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
    { nome: 'Linda Cardellini', pos: 3, delta: 10, foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80' },
    { nome: 'Nathan Fielder', pos: 4, delta: 25, foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' }
  ];

  toggleMenu(): void {
    this.menuAberto.update((val) => !val);
  }

  removerFilme(id: number): void {
    if (confirm('Deseja eliminar este filme do banco de dados no Supabase?')) {
      this.database.deleteFilmeSupabase(id);
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}