class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayRemainingCalories();
    this._displayCaloriesTotal();
  }

  // Public methods / API
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  // Private methods / API
  _displayCaloriesTotal() {
    const caloriesTotalEl = document.getElementById('calories-total');
    caloriesTotalEl.textContent = this._totalCalories;
  }
  _displayCaloriesLimit() {
    const caloriesLimitEl = document.getElementById('calories-limit');
    caloriesLimitEl.textContent = this._calorieLimit;
  }

  // display calories consumed
  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const caloriesConsumed = this._meals.reduce(
      (sum, meal) => sum + meal.calories,
      0
    );
    caloriesConsumedEl.textContent = caloriesConsumed;
  }

  // display calories burned
  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');
    const caloriesBurned = this._workouts.reduce(
      (sum, workout) => sum + workout.calories,
      0
    );
    caloriesBurnedEl.textContent = caloriesBurned;
  }

  // display remaining calories
  _displayRemainingCalories() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const caloriesRemaining = this._calorieLimit - this._totalCalories;

    caloriesRemainingEl.textContent = caloriesRemaining;
  }
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayRemainingCalories();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

const tracker = new CalorieTracker();

const workout1 = new Workout('pushup', 200);
tracker.addWorkout(workout1);
const workout2 = new Workout('pullup', 120);
tracker.addWorkout(workout2);

const meal1 = new Meal('Breakfast', 300);
tracker.addMeal(meal1);
const meal2 = new Meal('Lunch', 100);
tracker.addMeal(meal2);

console.log(tracker._totalCalories);
console.log(tracker._meals); // Output: 100
console.log(tracker._workouts); // Output: 100
