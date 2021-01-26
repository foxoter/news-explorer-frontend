export default class Popup {
  constructor(selectors) {
    this.openButton = selectors.openButton;
    this.closeButton = selectors.closeButton;
    this.popupWindow = selectors.popupWindow;
    this.popupContent = selectors.popupContent;
    this.signInPopup = selectors.signInPopup;
    this.signUpPopup = selectors.signUpPopup;
    this.signInLink = selectors.signInLink;
    this.signUpLink = selectors.signUpLink;
    this.successMessage = selectors.successMessage;
    this.successToSignIn = selectors.successToSignIn;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    // this.setEventListeners();
  }

  open() {
    this.popupWindow.classList.add('popup__state-open');
    this.setContent(this.signInPopup);
  }

  close() {
    this.popupWindow.classList.remove('popup__state-open');
    this.clearContent();
  }

  setContent(content) {
    content.setAttribute('style', 'display: block');
  }

  clearContent() {
    const content = this.popupContent.querySelectorAll('div');
    content.forEach((item) => {
      item.setAttribute('style', 'display: none');
    });
  }

  // setEventListeners() {
  //   this.openButton.addEventListener('click', this.open);
  //   this.closeButton.addEventListener('click', this.close);
  //   this.signUpLink.addEventListener('click', () => {
  //     this.clearContent();
  //     this.setContent(this.signUpPopup);
  //   });
  //   this.signInLink.addEventListener('click', () => {
  //     this.clearContent();
  //     this.setContent(this.signInPopup);
  //   });
  //   this.successToSignIn.addEventListener('click', () => {
  //     this.clearContent();
  //     this.setContent(this.signInPopup);
  //   });
  // }
}
