import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICity } from './../../../shared/interfaces/i-city';

@Component({
  selector: 'city-modal',
  templateUrl: './city-modal.component.html',
  styleUrls: ['./city-modal.component.sass']
})
export class CityModalComponent implements OnInit {
  cityModalFormGroup: FormGroup;
  modalData: any;
  action: string;
  city: ICity | null;
  isRemove: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CityModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {}
  ) {
    this.modalData = data;
    this.action = this.modalData.action;
    this.city = this.modalData.city;
  }

  ngOnInit(): void {
    if(this.action == 'remove') {
      this.isRemove = true;
    }

    this.cityModalFormGroup = this.formBuilder.group({
      cityName: ['', Validators.required],
    });

    if (this.city != null) {
      this.cityModalFormGroup.controls.cityName.setValue(this.city.name)
    }
  }

  handleCloseCityModal() {
    this.dialogRef.close({ event: 'close' });
  }

  handleCityModalSubmit() {
    this.dialogRef.close({
      event: this.action,
      data: {
        cityName: this.cityModalFormGroup.controls.cityName.value
      }
    });
  }
}
