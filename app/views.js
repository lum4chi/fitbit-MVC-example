import document from "document";
import {NavManager} from "controllers";


// Abstract class
class View {
  constructor(name, kwargs=null) {
    this.name = name;
    this.kwargs = kwargs;
  }
  onEnter() {
    console.log(`entering ${this.name}`);
  }
  onExit() {
    console.log(`exiting ${this.name}`);
  }
}

// Actual Screen you want to implement
export class MainView extends View {
  constructor(kwargs=null) { super("main-view", kwargs); }
  
  onEnter() {
    super.onEnter(); 
    // Setup view
    let ExampleButton = document.getElementById("example-button");
    ExampleButton.text = "Hello...";
    ExampleButton.onclick = evt => {
      console.log("example-button tapped");
      // Show next view, passing a dict for optional arguments
      NavManager.showScreen(AnotherView, {arg: "World!"});
    }
  }
}

export class AnotherView extends View {
  constructor(kwargs=null) { super("another-view", kwargs); }
  
  onEnter() {
    super.onEnter();
    if (this.kwargs) { 
      // Setup view
      let ExampleText = document.getElementById("example-text");
      ExampleText.text = this.kwargs.arg;
    }
  }
}
