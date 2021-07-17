'use strict';

class Tab {

  constructor() {
    this.navTabs = document.getElementById("navTabs")
    this.tabContent = document.getElementById("tabContent")
  }

  addTab(title) {
    const navTabLi = this._createNavTabLi("#" + title, title)
    const tabPane = this._createTabPaneDiv(title)

    this.navTabs.appendChild(navTabLi)
    this.tabContent.appendChild(tabPane)
  }

  _createNavTabLi(target, name) {
    // <li class="nav-item"> <a href="" class="nav-link" data-toggle="tab" data-target="#tabthree">Tab 3</a> </li>
    const li = document.createElement("li")
    li.classList.add("nav-item");

    const navLink = document.createElement("a")
    navLink.classList.add("nav-link");
    navLink.dataset.toggle = "tab"
    navLink.dataset.target = target;
    navLink.innerText = name

    li.appendChild(navLink);

    return li;
  }

  _createTabPaneDiv(name, content) {
  //   <div class="tab-pane fade" id="tabtwo" role="tabpanel">
  // </div>
    const tabPane = document.createElement("div");
    tabPane.classList.add("tab-pane", "fade")
    tabPane.id = name;
    tabPane.setAttribute("role", "tabpanel");
    tabPane.innerHTML = content;

    return tabPane;
  }
}

module.exports = Tab

