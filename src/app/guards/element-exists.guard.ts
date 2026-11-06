import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { WorldStateService } from '../services/world-state.service';
import { findMapSelection, Province } from '../shared/map';
import _ from 'lodash';

export const elementExistsGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> => {
  const router: Router = inject(Router);
  const worldStateService: WorldStateService = inject(WorldStateService);
  const regionId: string | undefined = route.paramMap.get('regionId') ?? undefined;
  const placeId: string | undefined = route.paramMap.get('placeId') ?? undefined;
  return worldStateService.provinces$.pipe(
    map((provinces: Array<Province>): boolean | UrlTree =>
      !_.isNil(findMapSelection(provinces, regionId, placeId)) ? true : router.createUrlTree(['/details']))
  );
};
