/*
 * Entry point for the watch app
 */
import document from "document";
import {NavManager} from "controllers";
import {MainView} from "views";


// Gain control on back button
document.onkeypress = function(evt) {
  if (evt.key === "back") { NavManager.backKeyPress(evt); }
}

// Show first view
NavManager.showScreen(MainView);
