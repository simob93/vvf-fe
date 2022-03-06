import { Injectable } from '@angular/core';
import {
    HttpClient
} from '@angular/common/http';
import { JsonResponse, Deposito, Articolo, Categoria, ArticoloCategoria, ArticoloDeposito } from '../model';
import 'moment/locale/it';
import { ArticoliScadenzaList } from '../model/articoliScadenzaList';

@Injectable({
    providedIn: 'root'
})
export class MagazzinoService {

    constructor(
        private http: HttpClient, ) { }

    /**
     * 
     * @param attivi 
     */
    listDepositi(attivi: boolean = false) {

        let params = {};
        if (attivi) {
            Object.assign(params, {
                attivi
            })
        }
        return this.http.get<JsonResponse<Deposito[]>>('/vvf/mag/deposito/list', {
            params
        });
    }

    /**
     * 
     * @param attivi 
     */
    listArticoli(descrizione='', depositoId = null, categoriaId=null, conGestScadenza = false) {

        let params = {};
        if (descrizione) {
            Object.assign(params, {descrizione})
        }
        if (depositoId) {
            Object.assign(params, {depositoId})
        }
        if (categoriaId) {
            Object.assign(params, {
                categoriaId
            })
        }
        Object.assign(params, {
            conGestScadenza
        })

        return this.http.get<JsonResponse<Articolo[]>>('/vvf/mag/articoli/list', {
            params
        });
    }

    /**
     * 
     * @param deposito 
     */
    saveArticolo(deposito: Deposito) {
        return this.http.post<JsonResponse<Articolo>>('/vvf/mag/articoli/new', deposito);
    }
    /**
     * 
     * @param deposito 
     */
    updateArticolo(deposito: Deposito) {
        return this.http.post<JsonResponse<Articolo>>('/vvf/mag/articoli/update', deposito);
    }
    /**
     * 
     * @param id 
     */
    deleteArticolo(id) {
        return this.http.get<JsonResponse<Articolo>>('/vvf/mag/articoli/delete', {
            params: {
                id
            }
        });
    }
    /**
     * 
     * @param id 
     */
    getArticolo(id) {
        return this.http.get<JsonResponse<Articolo>>('/vvf/mag/articoli/get', {
            params: {
                id
            }
        });
    }

    /**
     * 
     * @param deposito 
     */
    saveDepositi(deposito: Deposito) {
        return this.http.post<JsonResponse<Deposito>>('/vvf/mag/deposito/new', deposito);
    }
    /**
     * 
     * @param deposito 
     */
    updateDepositi(deposito: Deposito) {
        return this.http.post<JsonResponse<Deposito>>('/vvf/mag/deposito/update', deposito);
    }
    /**
     * 
     * @param id 
     */
    deleteDeposito(id) {
        return this.http.get<JsonResponse<Deposito>>('/vvf/mag/deposito/delete', {
            params: {
                id
            }
        });
    }
    /**
     * 
     * @param id 
     */
    getDeposito(id) {
        return this.http.get<JsonResponse<Deposito>>('/vvf/mag/deposito/get', {
            params: {
                id
            }
        });
    }

    /**
     * 
     */
    listCategorie() {
        return this.http.get<JsonResponse<Categoria[]>>('/vvf/mag/categorie/list');
    }
    /**
     * 
     * @param id 
     */
    getCategoria(id) {
        return this.http.get<JsonResponse<Categoria>>('/vvf/mag/categorie/get', {
            params: {
                id
            }
        });
    }

    /**
     * 
     * @param categoria 
     */
    saveCategoria(categoria: Categoria) {
        return this.http.post<JsonResponse<Categoria>>('/vvf/mag/categorie/new', categoria);
    }
    /**
     * 
     * @param categoria 
     */
    updateCategoria(categoria: Categoria) {
        return this.http.post<JsonResponse<Categoria>>('/vvf/mag/categorie/update', categoria);
    }
    /**
     * 
     * @param id 
     */
    deleteCategoria(id) {
        return this.http.get<JsonResponse<Categoria>>('/vvf/mag/categorie/delete', {
            params: {
                id
            }
        });
    }

    /**
     * 
     * @param categoria 
     */
    getArticoliCategorieByArticolo(idArticolo) {
        return this.http.get<JsonResponse<ArticoloCategoria[]>>('/vvf/mag/articoli/categorie/list', {
            params: {
                idArticolo
            }
        });
    }
    /**
     * 
     * @param id 
     */
    saveArticoloCategoria(artCat: ArticoloCategoria[]) {
        return this.http.post<JsonResponse<ArticoloCategoria>>('/vvf/mag/articoli/categorie/new',  artCat);
    }
    /**
     * 
     * @param idArticolo 
     */
    getArticoliDepositi(idArticolo) {
        return this.http.get<JsonResponse<ArticoloDeposito[]>>('/vvf/mag/articoli/depositi/list', {
            params: {
                idArticolo
            }
        });
    }
    /**
     * 
     * @param articoliDepositi 
     */
    saveArticoloDeposito(articoliDepositi: ArticoloDeposito[]) {
        return this.http.post<JsonResponse<ArticoloDeposito>>('/vvf/mag/articoli/depositi/new',  articoliDepositi);
    }

    listScadenzaArticoli() {
        return this.http.get<JsonResponse<ArticoliScadenzaList>>('/vvf/mag/articoli/scadenza');
    }
    
}
