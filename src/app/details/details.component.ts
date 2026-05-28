import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housing-location";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Photo of {{ housingLocation?.name }}"
      />
      <section class="listing-description">
        <h2>{{ housingLocation?.name }}</h2>
        <p>{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
        <section class="listing-features">
          <h2 class="section-heading">About this location</h2>
          <ul>
            <li>Units Available: {{ housingLocation?.availableUnits }}</li>
            <li>
              Does this location have Wifi?
              {{ housingLocation?.wifi ? "Yes" : "No" }}
            </li>
            <li>
              Does this location have Laundry?
              {{ housingLocation?.laundry ? "Yes" : "No" }}
            </li>
          </ul>
        </section>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <button class="primary">Apply Now</button>
      </section>
    </article>
  `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get("id"));
    this.housingLocation =
      this.housingService.getHousingLocationById(housingLocationId);
  }
}
