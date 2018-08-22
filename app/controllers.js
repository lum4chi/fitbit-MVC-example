import * as fs from "fs";
import document from "document";

// My approach to define a "singleton" object.
export let NavManager = {
  history: [],
  showScreen: function(class_view, kwargs=null) {
    // Instanciate new view-controller
    let new_vc = new class_view(kwargs);
    let prev_vc = this.history.pop();
    // Arrange screens
    this._hideViewController(prev_vc);
    this._showViewController(new_vc)
  },
  backKeyPress: function(evt) {
    // Retrieve current view-controller
    let curr_vc = this.history.pop();
    let prev_vc = this.history.pop();
    // Arrange screens
    this._hideViewController(curr_vc, true);
    this._showViewController(prev_vc)
    // Prevent exiting app if there is a previous screen
    if (prev_vc) { evt.preventDefault(); }
  },
  _showViewController: function(vc) {
    if (vc) {
      // Show GUI
      let gui = document.getElementById(vc.name);
      gui.style.display = "inline";
      // Signal change to view-controller
      vc.onEnter();
      // Append in history
      this.history.push(vc);
    }
  },
  _hideViewController: function(vc, discard=false) {
    if (vc) {
      // Hide GUI
      let gui = document.getElementById(vc.name);
      gui.style.display = "none";
      // Signal change to view-controller
      vc.onExit();
      // Append in history if requested
      if (!discard) { this.history.push(vc); }
    }
  }
}
