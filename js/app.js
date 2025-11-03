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
    this._displayProgressBar();
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
    const progressBarEl = document.getElementById('calorie-progress');
    const caloriesRemaining = this._calorieLimit - this._totalCalories;

    caloriesRemainingEl.textContent = caloriesRemaining;

    // change text color based on remaining calories
    if (caloriesRemaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger'
      );
      progressBarEl.classList.remove('bg-success');
      progressBarEl.classList.add('bg-danger');
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      progressBarEl.classList.remove('bg-danger');
      progressBarEl.classList.add('bg-success');
    }
  }
  // Display progress bar
  _displayProgressBar() {
    const progressBarEl = document.getElementById('calorie-progress');
    const progress = (this._totalCalories / this._calorieLimit) * 100;
    const width = Math.min(progress, 100);
    progressBarEl.style.width = `${width}%`;
  }
  // Render when the app state changes
  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayRemainingCalories();
    this._displayProgressBar();
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

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    // catch the input from meal form
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newMeal.bind(this));

    // catch the input from workout form
    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newWorkout.bind(this));
  }

  _newMeal(e) {
    e.preventDefault();
    const name = document.getElementById('meal-name');
    const calories = document.getElementById('meal-calories');

    if (name.value === '' || calories.value === '') {
      alert('Please fill in all fields');
      return;
    }
    const meal = new Meal(name.value, parseInt(calories.value));
    this._tracker.addMeal(meal);

    name.value = '';
    calories.value = '';

    // collaose the meal form after submission
    const mealCollapse = document.getElementById('collapse-meal');
    const bsMealCollapse = new bootstrap.Collapse(mealCollapse, {
      toggle: true,
    });
    bsMealCollapse.hide();
  }

  _newWorkout(e) {
    e.preventDefault();

    const name = document.getElementById('workout-name');
    const calories = document.getElementById('workout-calories');

    if (name.value === '' || calories.value === '') {
      alert('Please fill in all fields');
      return;
    }
    const workout = new Workout(name.value, parseInt(calories.value));
    this._tracker.addWorkout(workout);

    name.value = '';
    calories.value = '';

    // collapse the workout form after submission
    const workoutCollapse = document.getElementById('collapse-workout');
    const bsWorkoutCollapse = new bootstrap.Collapse(workoutCollapse, {
      toggle: true,
    });
    bsWorkoutCollapse.hide();
  }
}

const app = new App();
