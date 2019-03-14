import { Store } from "@ngrx/store";
import { AppState } from "src/app/appstate";
import { debounceTime, tap, map,take } from 'rxjs/operators';

export function getState(store: Store<AppState>): AppState {
    let state: AppState;

    store.pipe(take(1)).subscribe(s => state = s);

    return state;
}