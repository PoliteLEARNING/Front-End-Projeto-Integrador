import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
      if(environment.token == ""){
          this.alertas.showAlertInfo("Infelizmente sua sessão expirou. :(")
          this.router.navigate(["/entrar"]) 
        }

        if(environment.tipo != 'adm'){
          this.alertas.showAlertInfo('Aqui não pode, fale com um professor!')
          this.router.navigate(['/inicio'])
        }
  
        this.findAllTemas()
    }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  cadastrarTema(){

    if(this.tema.imagem === '' || this.tema.imagem == null){
      this.tema.imagem = 'vazio'
    }

    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess("Tema cadastrado com sucesso!")
      this.findAllTemas()
      this.tema = new Tema()
    })

  }

}
