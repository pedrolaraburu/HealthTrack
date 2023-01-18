import { Component, OnInit } from "@angular/core";
import { UserInterface } from "./models/user.interface";
import { UserService } from "./services/user.service";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    title = "HealthTrack";
	users: UserInterface[] = [];
	dummy: any = [];
	constructor(private usersService: UserService) {
		usersService.changeEmitted$.subscribe(element => {
			console.log(element);
			this.addUser(element);
        });
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
