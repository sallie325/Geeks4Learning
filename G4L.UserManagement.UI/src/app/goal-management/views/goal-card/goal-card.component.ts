import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-goal-card',
	templateUrl: './goal-card.component.html',
	styleUrls: ['./goal-card.component.css']
})
export class GoalCardComponent {
	@Input()
	goalId!: number | undefined

	@Input()
	goalTitle!: string;

	@Input()
	goalDescription!: string;

	@Input()
	goalDuration!: string;

	@Input()
	goalState!: "backlog" | "started" | "paused" | "completed" | "archived"

	@Input()
	onViewGoalRef!: any

	constructor() { }

	grab(event: any) {
		const { target } = event
		target.style.cursor = 'grabbing'
	}

	release(event: any) {
		const { target } = event
		target.style.cursor = 'grab'
	}
}
