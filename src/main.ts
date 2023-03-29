import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <div>
      <h1>Administración de Artículos</h1>
      <table border="1" *ngIf="hayRegistros()">
      <tr>
        <td>Codigo</td><td>Descripción</td><td>Precio</td><td>Borrar</td><td>Seleccionar</td>
      </tr>
      <tr *ngFor="let art of Articulos; else sinarticulos">
        <td>{{ art.codigo }}</td>
        <td>{{ art.descripcion }}</td>
        <td>{{ art.precio }}</td>
        <td><button (click)="borrar(art.codigo)">Borrar</button></td>
        <td><button (click)="seleccionar(art)">Seleccionar</button></td>
      </tr>
      </table>

      <ng-template #sinarticulos><p>No Hay Artículos</p></ng-template>
      <div>
        <p>Código     :<input type="number" [(ngModel)]="art.codigo" /></p>
        <p>Descripción:<input type="text" [(ngModel)]="art.descripcion" /></p>
        <p>Precio     :<input type="number" [(ngModel)]="art.precio" /></p>
        <p><button (click)="agregar()">Agregar</button>
           <button (click)="modificar()">Modificar</button>
           <button (click)="limpiar()">Limpiar</button>
           
        </p>

    </div>
  `,
})
export class App {
  name = 'Angular';
  apellido = '';
  nombre = '';
  art={
    codigo:0,
    descripcion:"",
    precio:0
  };

  Articulos=[{codigo:100,descripcion:"papelería cuaderno forma francesa raya",precio:100},
             {codigo:110,descripcion:"papelería cuaderno forma italiana raya",precio:110},
             {codigo:120,descripcion:"papelería cuaderno profesional 200 hojas",precio:150},
             {codigo:200,descripcion:"papelería pluma color negro",precio:5},
             {codigo:210,descripcion:"papelería pluma color azul",precio:5},
             {codigo:220,descripcion:"papelería pluma color rojo",precio:5},
             {codigo:500,descripcion:"papelería pegamento prit chico",precio:25},
             {codigo:520,descripcion:"papelería pegamento prit mediano",precio:30},
             {codigo:530,descripcion:"papelería pegamento prit grande",precio:35}
            ];
  hayRegistros(){
    return this.Articulos.length>0;
  };

  borrar(codigo:number){
    for(let x=0; x<this.Articulos.length;x++){
      if(this.Articulos[x].codigo==codigo){
        this.Articulos.splice(x,1);
      }
    }
  };

  seleccionar(art:{codigo:number; descripcion:string; precio:number;}){
    this.art.codigo=art.codigo;
    this.art.descripcion=art.descripcion;
    this.art.precio=art.precio;
  };

  agregar(){
    if(this.art.codigo==0){
      alert('Debe Generar un código de artículo distinto de 0');
      return;
    }
    for(let i=0;i<this.Articulos.length;i++){
      if(this.Articulos[i].codigo == this.art.codigo){
        alert('Ya existe Artículo con código '+this.art.codigo);
        return;
      }
    };
    this.Articulos.push({codigo:this.art.codigo, descripcion:this.art.descripcion,precio:this.art.precio});
    this.art.codigo=0;
    this.art.descripcion="";
    this.art.precio=0;
  };

  modificar(){
    for(let i=0;i<this.Articulos.length;i++){
      if(this.Articulos[i].codigo == this.art.codigo){
        this.Articulos[i].descripcion = this.art.descripcion;
        this.Articulos[i].precio= this.art.precio;
        this.limpiar();
        return;
      }
    };
    alert('No existe el código de artículo '+this.art.codigo);
  };

  limpiar(){
    this.art.codigo=0;
    this.art.descripcion="";
    this.art.precio=0;
  }
};


bootstrapApplication(App);
