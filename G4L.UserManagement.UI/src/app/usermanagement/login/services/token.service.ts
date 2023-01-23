import { Injectable } from '@angular/core';
import { contants } from 'src/app/shared/global/global.contants';
import jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	jwtToken: string | null = null;
	decodedToken: any | undefined;

	constructor() { }

	getFromSessionStorage() {
		if (sessionStorage.getItem(contants.token))
			this.jwtToken = sessionStorage.getItem(contants.token);
	}

	//   decodeToken() {
	//     return 
	//   }

	getDecodeToken() {
		return this.jwtToken ? jwt_decode(this.jwtToken) : undefined;
	}

	getExpiryTime() {
		this.decodedToken = this.getDecodeToken();
		return this.decodedToken ? this.decodedToken.exp : null;
	}

	isTokenExpired(): boolean {
		const expiryTime: number = this.getExpiryTime();
		if (expiryTime) {
			return 1000 * expiryTime - new Date().getTime() < 5000;
		} else {
			return true;
		}
	}
}
