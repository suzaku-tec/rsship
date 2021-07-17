'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Tab'.
class Tab {
  navTabs: any;
  tabContent: any;

  constructor() {
    this.navTabs = document.getElementById("navTabs")
    this.tabContent = document.getElementById("tabContent")
  }

  addTab(title: any) {
    const navTabLi = this._createNavTabLi("#" + title, title)
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    const tabPane = this._createTabPaneDiv(title)

    this.navTabs.appendChild(navTabLi)
    this.tabContent.appendChild(tabPane)
  }

  _createNavTabLi(target: any, name: any) {
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

  _createTabPaneDiv(name: any, content: any) {
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

