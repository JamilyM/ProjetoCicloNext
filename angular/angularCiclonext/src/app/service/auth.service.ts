import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient

  ) { }

entrar(usuarioLoginDTO: UsuarioLoginDTO ): Observable<UsuarioLoginDTO>{
  return this.http.post<UsuarioLoginDTO>('http://localhost:8080/api/v1/usuario/logar', usuarioLoginDTO)

}

cadastrar(usuario: Usuario): Observable<Usuario>{
  return this.http.post<Usuario>('http://localhost:8080/api/v1/usuario/cadastrar', usuario)

}

logado(){
  let ok:boolean = false
  if (environment.token != '') {
    ok = true
  }
  return ok
}

naoLogado(){
  let ok:boolean = false
  if (environment.token == '') {
    ok = true
  }
  return ok
}

}

