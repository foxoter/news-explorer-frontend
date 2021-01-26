export default class Header {
  constructor(selectors) {
    this.header = selectors.header;
    this.headerMenu = selectors.headerMenu;
    this.headerMenuButton = selectors.headerMenuButton;
    this.authLink = selectors.authLink || null;
    this.logoutLink = selectors.logoutLink;
    this.bookmarksLink = selectors.bookmarksLink;
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    if (!this.authLink) {
      this.headerMenu.classList.toggle('header__navigation_state-shown');
      this.headerMenuButton.classList.toggle('header__button_type-cross-black');
    } else {
      this.header.classList.toggle('header_background-on');
      this.headerMenu.classList.toggle('header__navigation_state-shown');
      this.headerMenuButton.classList.toggle('header__button_type-cross-white');
    }
  }

  render(userName) {
    const isLoggedIn = !!userName;
    if (isLoggedIn) {
      this.logoutLink.setAttribute('style', 'display: block');
      this.logoutLink.children[0].textContent = userName;
      if (this.authLink) {
        this.authLink.setAttribute('style', 'display: none');
      }
      this.bookmarksLink.setAttribute('style', 'display: flex');
    } else {
      this.logoutLink.setAttribute('style', 'display: none');
      this.logoutLink.children[0].textContent = '';
      this.bookmarksLink.setAttribute('style', 'display: none');
      if (this.authLink) {
        this.authLink.setAttribute('style', 'display: block');
      }
    }
  }
}
