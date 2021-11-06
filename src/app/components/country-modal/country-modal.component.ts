import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICountry } from './../../../shared/interfaces/i-country';

@Component({
  selector: 'country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.sass']
})
export class CountryModalComponent implements OnInit {
  countryModalFormGroup: FormGroup;
  modalData: any;
  action: string;
  country: ICountry | null;
  isRemove: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CountryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {
    this.modalData = data;
    this.action = this.modalData.action;
    this.country = this.modalData.country;
  }

  ngOnInit(): void {
    if(this.action == 'remove') {
      this.isRemove = true;
    }

    this.countryModalFormGroup = this.formBuilder.group({
      countryName: ['', Validators.required],
    });

    if (this.country != null) {
      this.countryModalFormGroup.controls.countryName.setValue(this.country.name)
    }
  }

  handleCloseCountryModal() {
    this.dialogRef.close({ event: 'close' });
  }

  handleCountryModalSubmit() {
    this.dialogRef.close({
      event: this.action,
      data: {
        countryName: this.countryModalFormGroup.controls.countryName.value
      }
    });
  }
}

