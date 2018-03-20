import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PairService } from '../services/pair.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Pair } from '../shared/models/pair.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-pairs',
  templateUrl: './pair.component.html',
  styleUrls: ['./pair.component.css']
})
export class PairComponent implements OnInit {

  pair = new Pair();
  pairs: Pair[] = [];
  isLoading = true;
  isEditing = false;

  addPairForm: FormGroup;
  // user = new FormControl('');
  domainName = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  constructor(private pairService: PairService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              public auth: AuthService) { }

  ngOnInit() {
    this.getPairs();
    this.addPairForm = this.formBuilder.group({
      // user: this.auth.currentUser.username,
      domainName: this.domainName,
      username: this.username,
      password: this.password
    });
  }

  getPairs() {
    this.pairService.getPairs().subscribe(
      data => this.pairs = data,
      error => console.log(error),
      () => this.isLoading = false
    );

  }

  addPair() {
    this.pairService.addPair(this.addPairForm.value).subscribe(
      res => {
        this.pairs.push(res);
        this.addPairForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(pair: Pair) {
    this.isEditing = true;
    this.pair = pair;
  }

  cancelEditing() {
    this.isEditing = false;
    this.pair = new Pair();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the pairs to reset the editing
    this.getPairs();
  }

  editPair(pair: Pair) {
    this.pairService.editPair(pair).subscribe(
      () => {
        this.isEditing = false;
        this.pair = pair;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deletePair(pair: Pair) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.pairService.deletePair(pair).subscribe(
        () => {
          const pos = this.pairs.map(elem => elem._id).indexOf(pair._id);
          this.pairs.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
