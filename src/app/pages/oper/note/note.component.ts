import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Note } from '../../param/type-evaluation/type-evaluation.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContexteService } from '../../../../services/contexte.service';
import { NoteFormComponent } from './note-form/note-form.component';
import { EvalService } from '../../../../services/eval.service';

@Component({
  selector: 'app-note',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzCardModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
    NzModalModule,
    NzDrawerModule,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent implements OnInit {
  searchInput: string = '';
  datas: Note[] = [];
  displayed: Note[] = [];

  constructor(
    private service: EvalService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getListNote().subscribe((res) => {
      this.datas = res;
      this.displayed = this.datas;
      console.log(this.displayed);
    });
  }

  create() {
    this.drawer
      .create<NoteFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une cannee scolaire',
        nzContent: NoteFormComponent,
        nzWidth: 500,
        nzData: {
          valueIn: {
            id: null,
            code: '',
            libelle: '',
            dateDeb: new Date(),
            dateFin: new Date(),
          },
        },
      })
      .afterClose.subscribe((data) => {
        if (data) {
          this.datas.push(data);
          this.displayed = [...this.datas];
        }
      });
  }

  search() {
    this.displayed = this.datas.filter((d) => {
      return (
        d.affectationEleve.eleve.nom.includes(this.searchInput) ||
        d.matiere.libMatiere.includes(this.searchInput) ||
        d.note.toString().includes(this.searchInput)
      );
    });
  }

  edit(_t52: Note) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<NoteFormComponent, { valueIn: Note }>({
        nzTitle: 'Modifier la note',
        nzContent: NoteFormComponent,
        nzWidth: 500,
        nzData: {
          valueIn: _t52,
        },
      })
      .afterClose.subscribe((data) => {
        if (data) {
          this.datas[ind] = data;
          this.displayed[ind] = data;
          this.displayed = [...this.displayed];
        }
      });
  }

  confirmDeleting(_t72: Note) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' + _t72.affectationEleve + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: Note) {
    this.service.delete(_t72.id).subscribe((res) => {
      console.log(res);
      if (res)
        this.datas.splice(
          this.datas.findIndex((d) => d.id == _t72.id),
          1,
        );
      this.displayed.splice(
        this.displayed.findIndex((d) => d.id == _t72.id),
        1,
      );
      this.displayed = [...this.displayed];
    });
  }
}
