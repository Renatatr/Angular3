import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {

  @Input() itemQueVaiSerEditado!: Item;
  editando: boolean = false;
  textoBtn: string = 'Salvar item';
  valorItem!: string;

  constructor(
    private listaService: ListaDeCompraService
  ) { }

  editarItem(){
    this.listaService.editarItemDaLista(this.itemQueVaiSerEditado, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.textoBtn = 'Salvar item';
  }

  ngOnChanges(changes: SimpleChanges) {
   // console.log(changes['itemQueVaiSerEditado'].currentValue);
    if (!changes['itemQueVaiSerEditado'].firstChange) {
      this.editando = true;
      this.textoBtn = 'Editar item';
      this.valorItem = this.itemQueVaiSerEditado?.nome;
    }
  }

  ngOnInit(): void { }

  adicionarItem(){
    //console.log(this.valorItem);
    this.listaService.adicionarItemNalista(this.valorItem);
    this.limparCampo();
  }

  limparCampo(){
    this.valorItem = '';
  }
}
