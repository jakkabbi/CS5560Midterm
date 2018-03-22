import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DomainService } from '../services/domain.service';
import { Domain } from '../shared/models/domain.model';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { PairService } from '../services/pair.service';
import { Pair } from '../shared/models/pair.model';

import * as $ from "jquery";

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  domain = new Domain();
  domains: Domain[] = [];
  pair = new Pair();
  pairs: Pair[] = [];
  isLoading = true;
  viewing = false;
  $scope:any;
  addDomainForm: FormGroup;
  addPairForm: FormGroup;
  currentUser = this.auth.currentUser.username;
  user = new FormControl(this.auth.currentUser.username);
  domainName = new FormControl('', Validators.required);
  domainID = new FormControl('');
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  hidden = true;

  static $inject = ['$scope'];
  constructor(private domainService: DomainService,
              private pairService: PairService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              public auth: AuthService) { }

  ngOnInit() {
    this.viewing = false;
    this.getDomains();
    this.resetDomainForm();
  }

  getDomains() {
    this.domainService.getDomains().subscribe(
      data => {
          this.domains = data;
          console.log(data);
      },
      error => console.log(error),
      () => this.isLoading = false
    );

  }

  resetDomainForm(){
    this.domainName = new FormControl('', Validators.required);
    this.user = new FormControl(this.auth.currentUser.username);
    
    this.addDomainForm = this.formBuilder.group({
      user: this.user,
      domainName: this.domainName
    });
  }

  resetPairForm() {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);

    this.addPairForm = this.formBuilder.group({
      domainID: this.domain._id,
      username: this.username,
      password: this.password
    });
    console.log(this.addPairForm.value);
  }

  addDomain() {
    this.domainService.addDomain(this.addDomainForm.value).subscribe(
      res => {
        this.domains.push(res);
        this.resetDomainForm();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
    console.log(this.addDomainForm.value);
    this.getDomains();
  }

  addPair() {
    this.pairService.addPair(this.addPairForm.value).subscribe(
      res => {
        this.viewing = true;
        console.log(this.addPairForm.value);
        this.pairs.push(res);
        this.resetPairForm();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
    console.log(this.addPairForm.value);
    this.getPairs();
  }

  viewPairs(domain: Domain) {
    this.viewing = true;
    this.domain = domain;
    this.getPairs();
    this.resetPairForm();
  }

  cancelEditing() {
    this.viewing = false;
    this.domain = new Domain();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the domains to reset the editing
    this.ngOnInit();
  }

  browseDomain(domain: Domain) {
    this.getPairs();
    this.domainService.getDomain(domain).subscribe(
      () => {
        this.viewing = true;
        this.domain = domain;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteDomain(domain: Domain) {
    if (window.confirm('Are you sure you want to permanently delete this item and its user pairs?')) {
      this.domainService.deleteDomain(domain).subscribe(
        () => {
          const pos = this.domains.map(elem => elem._id).indexOf(domain._id);
          this.domains.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

  getPairs() {
    this.pairService.getPairs().subscribe(
      data => this.pairs = data,
      error => console.log(error),
      () => this.isLoading = false
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

  showPassword(){
    if(this.hidden)
      this.hidden = false;
    else
      this.hidden = true;
  }

}
