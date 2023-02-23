import { TokenService } from './../../../usermanagement/login/services/token.service';
import { Component, OnInit } from '@angular/core';
import { contants } from 'src/app/shared/global/global.contants';
import { Roles } from 'src/app/shared/global/roles';
import { IkmService } from '../../services/ikm.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-ikm-table',
  templateUrl: './ikm-table.component.html',
  styleUrls: ['./ikm-table.component.css']
})
export class IkmTableComponent implements OnInit {
  ikmResults: any;

  length = 0;
  pageSize = 0;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  ikmScores: any;

  constructor(private ikmService: IkmService, private tokenService: TokenService) { }

  ngOnInit(): void {
    const role = sessionStorage.getItem(contants.role);
    const decodedToken: any = this.tokenService.getDecodeToken();

    switch (role) {
      case Roles.Learner:
        this.getResultsById(decodedToken?.id);
        break;
      case Roles.Super_Admin:
      case Roles.Admin:
      case Roles.Trainer:
        this.getResults();
        break;
    }
  }

  getResultsById(userId: any) {
    this.ikmService.getIKMResults('2023-01-30', '2023-02-10', 'MARKED')
    .subscribe((data) => {
      console.log(data);
      this.ikmResults = data?.output;
      this.handlePageEvent({
        length : this.ikmResults?.length,
        pageIndex : 1,
        pageSize : this.pageSizeOptions[1],
        previousPageIndex : 0,
      });
    });
  }

  getResults() {
    this.ikmService.getIKMResults('2023-01-30', '2023-02-10', 'MARKED')
    .subscribe((data) => {
      console.log(data);
      this.ikmResults = data?.output;
      this.handlePageEvent({
        length : this.ikmResults?.length,
        pageIndex : 1,
        pageSize : this.pageSizeOptions[1],
        previousPageIndex : 0,
      });
    });
  }

  getSubjectIcon(subject: any): string {
    if (subject.tolowercase().include('javascript')) return 'fa-brands fa-square-js';
    if (subject.tolowercase().include('java')) return 'fa-brands fa-java';
    if (subject.tolowercase().include('c#')) return 'fa-brands fa-csharp';
    if (subject.tolowercase().include('oop')) return 'https://cdn4.iconfinder.com/data/icons/technology-83/1000/object_programming_development_oriented_developer_object-oriented_programming_software-512.png';
    if (subject.tolowercase().include('uml')) return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAMAAAC4XpwXAAAAZlBMVEX///8AAABSUlIVFRV6enr8/PzIyMjV1dVtbW0xMTH4+Ph3d3eysrKtra3c3NxAQEDt7e1hYWHj4+NbW1uMjIxHR0e9vb0eHh6ZmZnPz883NzcjIyOTk5OkpKSDg4NMTEwLCwsqKioqTNKtAAAFIklEQVRoge2baddrMBCAa1+KWlpKUf3/f/Jmoohs6JH23POaT8XIQxKzJT2dtkioa6vlGWxqelHiDWwQPd6T7m6Da5q7I9yBBhNzpSSgXe5Hr1Fz9nr1HKnf96NDx1sb9JH6eV+6v17d+g29TNzE+Rk97+fHH6UbP6Rbvu9bP6MPD/EX6XFu5/GfnfP/LT26s+7yfN9Aj23b/nDcHX78km2gv+UD+l0QpXyF3sONCy3V+Qt0G9h6Gfu0xL56uvVEN7TCy4rpJby5+LJi+hXpOz+jZ0hfclkxHX3qxkE/6H+L3v2QniLZj75zFtmi5mRPR0mE1K/70SFiqgJ7pQQvpJ5vaD6Nokhy2b8IQg+h3LYM1E1u53FfbhFD4rJYWfjiUOdsKlplGybJGjrqfYeR6IWmQ8Se39LrK+k88TTt8sFtB/2gH/SDftBXS4VcqSJ6GtSmeQ3E7ioOCk175GKFNLiabR0srtGw9Pw5Bgr8FaZg9Lk6XyG8jQ53IdCh6U5FuusHu8jivEiFgg2MnIJUqKTRBkUPhlaHJhpKn1GgXz9cUhDT+7aTPI3j1HY5+L7txAaF3OW03sCpzsUt5HiNShZmzug4iPPGzoxwSEl2fomnw9iZzo1W6KtAYwslHkdx2Dqjg25CLkHB2xXTCR8UyOU+C97OI07gniEVoDpxE65qkXToNX2uCa1PC2xQXKOKPJfZ4MDyXTZXgC8oXEH3b2wvpQaatuNn+0AK1DecwjAPBxbSLlJWQfjyBB1WPU36OlSVhsVIm6dgalPZCRSYRMrUxKujBL3hqcFErN+/7zyFkhibljfFbM53y6FzVz0hJ65aXLRu0ZwrmIg9BodjjgoVY11lWTVBRz8v7ADNU5kX28JzppCwLbBTlUfPuPRs1rjHXKceL2EVVtM5Pf9Cc7ryQKoOGX6mAchyDa8Xg5vC8p+JpsP0ZpxmDKPmxyA+mlQdM6lwwSDuxWW/yP6Tq+mTLN3WOEv3IWHJA57haAhLTiqPcpeYeoIeo05+UY8OtrUbzsWo6+lkHwzMeM6HD4QaPB/d5InCDNLSQtdTpfp6ZmDOrDUxGQWql1ueBeLRY8ajYo87zYXIoPs+nCukjMuFgSmEEdbMx+G2iAfFSzbkVOhPjH1r3ennvVIn8LHQyVDRBQ4HLu+Hz7H3nrusmUKA/f/cjmHz8HzPssCDI8kOHCqyem/uqZLkwrcejAJlRK23wsVN3hGibPsPHVU2M8vF+VCp1TvGf1j1XEG6/YaJqCNib1PCC0gjtxuudy5XYTLOhisrBnKziSjMHkXx0BvRnVG/7SwLhQqNjlp4ZeFS/UyQSVkLG4yWM6mlFmT0JfnLOexBP+gH/aCrpI87Qnr6dPgFuq2Pu2FuyMl2t/Ew27Dl9jO61WoSYRLrnem1DC7OVvahpxDQZPzt0ziW+Wjv+Fp6IAvRoF+2LL9upoey14NM8qN9+wedDyTjQmX0jn/lOkui1NCF2/PBuLiTDVVDb0Q34ozpPOLV0OFGtgg3PNeUAqqh43KDx02JcpwuqaXHeA3BzUtmB0lp4kxSKb2v+Eukn3qq6KeokONrpfST1Twk8Kelln7q90Hzx/3ZKyil8+Qbc14ouFaXDKbgy3QMzxTbOqG405j/gI7cDAH//qxr1Pv3tXLQf0WX/uPxqpoOC7Kajv/JAiljez5DHT8/wxlcN931f7CMXEe3A2Vp5JaqE1mw3nEfK08sl6S/qwcj3d3yx9GPJM86AT3Zkr//Aw3GRgd9Ed5qAAAAAElFTkSuQmCC';
    if (subject.tolowercase().include('devops')) return 'https://media.istockphoto.com/id/1136691184/vector/devops-icon-vector.jpg?s=612x612&w=0&k=20&c=b5gXUq7frnYfTJWmBKwELAe_bB_ZY40Wp9TlwOWlU_U=';
    if (subject.tolowercase().include('kubernates')) return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVwo-I_i-kIgWr750v8IK5-jPenC-LI58qN2epM9z9dw&s';
    if (subject.tolowercase().include('a+')) return 'https://play-lh.googleusercontent.com/AacsJHZpr4t9tP7WVF_vLoiCVWstlD2Zk1WF7frFzoqmYiCCUCHrOsdNw5n0slD36g=w240-h480-rw';
    if (subject.tolowercase().include('salesforce')) return 'https://cdn-icons-png.flaticon.com/512/5968/5968914.png';
    if (subject.tolowercase().include('agile')) return 'https://img.icons8.com/external-flatart-icons-flat-flatarticons/256/external-agile-web-design-and-development-flatart-icons-flat-flatarticons.png';
    if (subject.tolowercase().include('business analyst')) return 'https://cdn-icons-png.flaticon.com/512/3271/3271500.png';
    return '';
  }

  paginate(page_size: number, page_number: number) {
    return this.ikmResults.slice(page_number * page_size, page_number * page_size + page_size);
  }

  handlePageEvent(e: PageEvent) {
    this.length = e.length;
    this.pageSize += e.pageSize;
    this.pageIndex += e.pageIndex;
    this.ikmScores = this.paginate(e.pageSize, e.pageIndex);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
