
//export default {
//    openTab,
//}

function openTab(evt, tabName) {
  hideTabs();
  showActiveTab(tabName, evt.currentTarget);
}

// Get all elements with class="tabcontent" and hide them
function hideTabs() {
  const tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
}

function showActiveTab(tabName, target) {

  // Get all elements with class="tab-links" and remove the class "active"
  const tabLinks = document.getElementsByClassName("tab-links");
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  target.className += " active";
}
