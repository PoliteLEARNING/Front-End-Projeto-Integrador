import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
<<<<<<< HEAD
=======
import { AlertasService } from '../service/alertas.service';
>>>>>>> 0dad19c2bc8e38d0a2b80db275efc90b78751450
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    this.user.tipo = this.tipoUsuario

    if(this.user.senha != this.confirmarSenha){
      this.alertas.showAlertDanger('A senha está correta!')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
      }, erro => {
        if (erro.status == 400) {
          this.alertas.showAlertDanger("Usuário já cadastrado!")
        }
      })
    }
  
  }

}
