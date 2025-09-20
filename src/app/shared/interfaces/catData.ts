import { HttpErrorResponse } from "@angular/common/http";
import { Cat } from "./cat.interface";

export interface CatState {
    error?: HttpErrorResponse,
    data: Cat[],
    page: number,
    loadingInitial: boolean;
    loadingMore: boolean;
    hasInfiniteScroll: boolean;
}