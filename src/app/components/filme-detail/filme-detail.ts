import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  public database = inject(Database);

  public filme = signal<Filme | null>(null);

  // Mapeamento de itens estáticos da Home para exibição dinâmica
  private itensEstaticos: Record<number, Filme> = {
    100: {
      id: 100,
      titulo: 'O Conde de Monte Cristo',
      descricao: 'Edmond Dantès é vítima de uma conspiração e passa anos preso no Château d If. Após escapar, ele assume a identidade do Conde de Monte Cristo para se vingar daqueles que o traíram.',
      ano: 2024,
      categoria: 'Aventura / Drama',
      imagemUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    },
    101: {
      id: 101,
      titulo: 'Dune: Part Three',
      descricao: 'Paul Atreides une-se a Chani e aos Fremen enquanto busca vingança contra os conspiradores que destruíram sua família.',
      ano: 2026,
      categoria: 'Ficção Científica',
      imagemUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    },
    102: {
      id: 102,
      titulo: 'Jumanji: Open World',
      descricao: 'Quatro adolescentes são sugados para um videogame mágico, e a única maneira de escapar é trabalhando juntos para terminar o jogo.',
      ano: 2025,
      categoria: 'Ação / Aventura',
      imagemUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    },
    103: {
      id: 103,
      titulo: 'Who Does Horror Quite Like Mike Flanagan?',
      descricao: 'Especial documental explorando as técnicas de terror psicológico e storytelling do renomado diretor Mike Flanagan.',
      ano: 2025,
      categoria: 'Documentário / Terror',
      imagemUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    },
    104: {
      id: 104,
      titulo: 'Sauron Is Coming (LOTR: The Rings of Power)',
      descricao: 'A comovente saga do renascimento de Sauron e a criação dos Anéis de Poder na Segunda Era da Terra-média.',
      ano: 2024,
      categoria: 'Fantasia',
      imagemUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80'
    },
    105: {
      id: 105,
      titulo: 'Remembering Patrick Stewart (1940-2026)',
      descricao: 'Uma retrospectiva completa sobre a carreira e as atuações inesquecíveis do lendário ator Sir Patrick Stewart.',
      ano: 2026,
      categoria: 'Biografia',
      imagemUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
    },
    106: {
      id: 106,
      titulo: 'Halloween Horrors to Stream Tonight',
      descricao: 'Uma seleção com os filmes de terror mais aterrorizantes selecionados pelos críticos do IFDb.',
      ano: 2025,
      categoria: 'Terror',
      imagemUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    },
    201: {
      id: 201,
      titulo: 'Tudo Pode Ser Visto',
      descricao: 'Trinta e quatro dias antes de ser presa, Elizabeth Holmes enfrenta o colapso do seu império de biotecnologia em uma trama envolvente.',
      ano: 2025,
      categoria: 'Drama / Suspense',
      imagemUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    },
    202: {
      id: 202,
      titulo: 'Cara-de-Barro',
      descricao: 'Estrela de Hollywood em ascensão transforma-se em uma criatura monstruosa após um acidente com substâncias desconhecidas.',
      ano: 2025,
      categoria: 'Ação / Sci-Fi',
      imagemUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    },
    203: {
      id: 203,
      titulo: 'Carrie: A Estranha',
      descricao: 'Uma garota protegida com poderes telecinéticos sofre bullying de seus colegas de classe e desencadeia o caos na noite do baile.',
      ano: 2024,
      categoria: 'Terror',
      imagemUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    },
    204: {
      id: 204,
      titulo: 'Crystal Lake',
      descricao: 'Série prequel que explora as origens e os mistérios obscuros do acampamento Crystal Lake.',
      ano: 2025,
      categoria: 'Terror / Mistério',
      imagemUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    },
    205: {
      id: 205,
      titulo: 'VisionQuest',
      descricao: 'Visão tenta recuperar suas memórias e sua humanidade enquanto navega por um universo cheio de ameaças.',
      ano: 2026,
      categoria: 'Ação / Marvel',
      imagemUrl: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=800&q=80'
    },
    206: {
      id: 206,
      titulo: 'O Bosque Selvagem',
      descricao: 'Aventura épica de sobrevivência e descoberta nas profundezas de uma floresta inexplorada.',
      ano: 2024,
      categoria: 'Aventura',
      imagemUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80'
    }
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        const id = Number(idParam);
        
        const filmeSupabase = this.database.filmes().find(f => f.id === id);

        if (filmeSupabase) {
          this.filme.set(filmeSupabase);
        } else if (this.itensEstaticos[id]) {
          this.filme.set(this.itensEstaticos[id]);
        } else {
          this.filme.set({
            id: id,
            titulo: `Filme #${id}`,
            descricao: `Detalhes e sinopse do título com ID #${id}.`,
            ano: 2026,
            categoria: 'Filme',
            imagemUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80'
          });
        }
      }
    });
  }

  removerFilme(id: number): void {
    if (confirm('Deseja eliminar este filme do banco de dados no Supabase?')) {
      this.database.deleteFilmeSupabase(id);
    }
  }
}