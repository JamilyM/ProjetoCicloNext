import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: Usuario = new Usuario()
  confirmarSenha: string
  tipoUsuario: string

  nome = environment.nome
  foto = environment.urlImagemPerfil
  token = environment.token
  idUser = environment.idUsuario
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private postagemService: PostagemService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }

    let idUser = this.route.snapshot.params['id']
    this.findByIdUser(idUser)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
    console.log(this.tipoUsuario)

  }

  atualizar() {
    
    this.user.categoria = this.tipoUsuario

    if (this.confirmarSenha != this.user.senha) {
      alert('As senhas estão incorretas.')
    } else {
      this.authService.alterar(this.user).subscribe((resp: Usuario) => {
        this.user = resp
        alert('Usuário atualizado com sucesso, faça o login novamente.')
        environment.token = ''
        environment.nome = ''
        environment.urlImagemPerfil = ''
        environment.idUsuario = 0
        this.router.navigate(['/entrar'])


      })
    }

  }

  findByIdUser(id: number){
    this.postagemService.procurarUsuario(id).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }


}