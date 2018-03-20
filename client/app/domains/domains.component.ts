import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DomainService } from '../services/domain.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Domain } from '../shared/models/domain.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-domains',
  templateUrl: './domains.component.html',
  styleUrls: ['./domains.component.css']
})
export class DomainsComponent implements OnInit {

  domain = new Domain();
  domains: Domain[] = [];
  isLoading = true;
  isEditing = false;

  addDomainForm: FormGroup;
  user = new FormControl('');
  domainName = new FormControl('', Validators.required);

  constructor(private domainService: DomainService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent,
              public auth: AuthService) { }

  ngOnInit() {
    this.getDomains();
    this.addDomainForm = this.formBuilder.group({
      user: this.auth.currentUser.username,
      domainName: this.domainName
    });
  }

  getDomains() {
    this.domainService.getDomains().subscribe(
      data => this.domains = data,
      error => console.log(error),
      () => this.isLoading = false
    );

  }

  addDomain() {
    this.domainService.addDomain(this.addDomainForm.value).subscribe(
      res => {
        this.domains.push(res);
        this.addDomainForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  enableEditing(domain: Domain) {
    this.isEditing = true;
    this.domain = domain;
  }

  cancelEditing() {
    this.isEditing = false;
    this.domain = new Domain();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the domains to reset the editing
    this.getDomains();
  }

  editDomain(domain: Domain) {
    this.domainService.editDomain(domain).subscribe(
      () => {
        this.isEditing = false;
        this.domain = domain;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteDomain(domain: Domain) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
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

}
