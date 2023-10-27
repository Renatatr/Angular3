import { Component, DoCheck, OnInit } from '@angular/core';
import { Item } from './interfaces/iItem';
import { ListaDeCompraService } from './service/lista-de-compra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {


  title = 'app-lista-de-compras';
  listaDeCompra!: Array<Item>;
  itemParaSerEditado!: Item;

  constructor(
    private listaSevice: ListaDeCompraService
    ) { }

  ngDoCheck(): void {
    console.log('do check');
    this.listaSevice.atualizarLocalStorage();
  }

  ngOnInit(): void {
    console.log(this.listaDeCompra);
    this.atualizarExibicaoDeLista();
  //  this.limparLista();
  }

  atualizarExibicaoDeLista(){
    this.listaDeCompra = this.listaSevice.getListaDeCompra();
  }

  editarItem(item: Item) {
    this.itemParaSerEditado = item;
    this.atualizarExibicaoDeLista();
  }

  deletarItem(id: number){
    const index = this.listaDeCompra.findIndex((item) => item.id == id)
    this.listaDeCompra.splice(index,1);
    this.atualizarExibicaoDeLista();
  }

  limparLista(){
    console.log('a');
    this.listaSevice.limparTodaLista();
    this.listaDeCompra = [];
    this.atualizarExibicaoDeLista();
  }
}
