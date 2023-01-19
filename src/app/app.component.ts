import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserInterface } from "./models/user.interface";
import { UserService } from "./services/user.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
	subscription: Subscription;
    title = "HealthTrack";
	users: UserInterface[] = [];
	dummy: any = [];
	constructor(private usersService: UserService, private router: Router ) {
		this.subscription = usersService.changeEmitted$.subscribe(element => {
			console.log(element);
			try {
				this.addUser(element);
			}
			catch {
				console.log('Deu ruim!')
			}
        });
    }
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
	ngOnInit(): void {
		console.log('Inicei');
		this.usersService.getUsers().subscribe(users => {
			console.log('res', users);
			this.users = users;
		})
	}

	addUser(item: UserInterface): void {
		this.usersService.addUsers(item).subscribe(newUser => {
			this.users.push(newUser);
		});
	}
}
