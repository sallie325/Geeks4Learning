import { Injectable } from '@angular/core';
import { contants } from 'src/app/shared/global/global.contants';
import jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	jwtToken!: string | null;
	decodedToken: any | undefined;

	constructor() { }

	get sessionToken() : string | null { return sessionStorage.getItem(contants.token) };

	getDecodeToken = () : any | undefined => this.sessionToken ? jwt_decode(this.sessionToken) : undefined;

	getExpiryTime() : number | undefined | null {
		this.decodedToken = this.getDecodeToken();
		return this.decodedToken?.exp;
	}

	isTokenExpired(): boolean {
		const expiryTime: number | undefined | null = this.getExpiryTime();

		if (!expiryTime) return true;
		return (1000 * expiryTime - new Date().getTime()) < 5000;
	}
}
